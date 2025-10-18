import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, Send, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, Building, Briefcase, Target } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { createAppointment, getAppointments } from '../services/firebaseService';

const AppointmentBooking = () => {
  const location = useLocation();
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');

  // Detect user's timezone on component mount
  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(detectedTimezone);
    console.log('Detected user timezone:', detectedTimezone);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      business: '',
      industry: '',
      service_interests: '',
      appointment_date: '',
      appointment_time: '',
      message: ''
    }
  });

  // Pre-populate form based on URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const service = searchParams.get('service');
    const plan = searchParams.get('plan');
    
    if (service) {
      setValue('service_interests', service);
    }
    
    if (plan) {
      // Add plan info to the message field
      const currentMessage = watch('message') || '';
      const planMessage = `Interested in: ${plan.replace(/-/g, ' ')}`;
      setValue('message', currentMessage ? `${currentMessage}\n\n${planMessage}` : planMessage);
    }
  }, [location.search, setValue, watch]);

  // Generate fixed EST time slots (12 PM to 5 PM EST, 30-minute intervals)
  const generateESTTimeSlots = () => {
    const slots = [];
    // Fixed EST times from 12:00 PM to 4:30 PM (last slot before 5 PM)
    for (let hour = 12; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const estTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          estTime: estTime,
          estDisplay: formatTimeSlot(estTime) // Display format for EST
        });
      }
    }
    return slots;
  };

  // Convert EST time slots to user's local timezone
  const generateLocalTimeSlots = (date) => {
    if (!userTimezone || !date) return [];
    
    const estSlots = generateESTTimeSlots();
    
    return estSlots.map(slot => {
      try {
        // Create a proper EST date-time
        const estDateTimeString = `${date}T${slot.estTime}:00`;
        
        // Parse as if it's EST and convert to user's timezone
        const estDate = new Date(estDateTimeString);
        
        // Get the time in user's timezone by using toLocaleString with user's timezone
        const userTimeString = estDate.toLocaleString('en-US', {
          timeZone: userTimezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Also get it in EST for comparison
        const estTimeString = estDate.toLocaleString('en-US', {
          timeZone: 'America/New_York',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Since we created the date as if it's local time, we need to adjust
        // Create a new date that represents the EST time correctly
        const actualEstDate = new Date(`${date}T${slot.estTime}:00-05:00`); // EST is UTC-5
        
        const actualUserTimeString = actualEstDate.toLocaleString('en-US', {
          timeZone: userTimezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
        
        return {
          estTime: slot.estTime,          // Original EST time for backend
          localTime: actualUserTimeString, // Local time for display
          estDisplay: slot.estDisplay,    // EST display format
          localDisplay: formatTimeSlot(actualUserTimeString), // Local display format
          fullLocalDateTime: actualEstDate // Full datetime for sorting/comparison
        };
      } catch (error) {
        console.warn('Error converting timezone for slot:', slot.estTime, error);
        // Fallback to EST time if conversion fails
        return {
          estTime: slot.estTime,
          localTime: slot.estTime,
          estDisplay: slot.estDisplay,
          localDisplay: slot.estDisplay,
          fullLocalDateTime: new Date(`${date}T${slot.estTime}:00`)
        };
      }
    }).sort((a, b) => a.fullLocalDateTime - b.fullLocalDateTime); // Sort by local time
  };

  const [localTimeSlots, setLocalTimeSlots] = useState([]);

  // Update local time slots when date or timezone changes
  useEffect(() => {
    if (selectedDate && userTimezone) {
      // Check if the selected date is a weekday
      if (!isWeekday(selectedDate)) {
        setLocalTimeSlots([]);
        setAvailableTimeSlots([]);
        console.log('Weekend selected - no time slots available');
        return;
      }
      
      const slots = generateLocalTimeSlots(selectedDate);
      setLocalTimeSlots(slots);
      console.log('Generated local time slots for weekday:', slots);
    }
  }, [selectedDate, userTimezone]);

  // Check availability when date or local time slots change
  useEffect(() => {
    if (selectedDate && localTimeSlots.length > 0) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate, localTimeSlots]);

  const checkAvailability = async (date) => {
    if (!userTimezone || localTimeSlots.length === 0) {
      console.warn('Timezone not detected yet or slots not generated');
      return;
    }
    
    // Check if the date is a weekday
    if (!isWeekday(date)) {
      setAvailableTimeSlots([]);
      setBookedTimes([]);
      console.log('Weekend date - no availability');
      return;
    }
    
    setLoadingAvailability(true);
    try {
      console.log('🔍 Checking availability for weekday:', date);
      
      // Get all appointments from Firebase
      const result = await getAppointments();
      
      if (result.success) {
        // Filter appointments for the selected date
        const dateAppointments = result.data.filter(apt => 
          apt.appointment_date === date && apt.status !== 'cancelled'
        );
        
        // Extract booked EST times (appointments are stored with EST times)
        const bookedESTTimes = dateAppointments.map(apt => apt.appointment_time);
        
        // Filter available local time slots based on booked EST times
        const availableSlots = localTimeSlots.filter(slot => 
          !bookedESTTimes.includes(slot.estTime)
        );
        
        setBookedTimes(bookedESTTimes);
        setAvailableTimeSlots(availableSlots);
        
        console.log(`✅ Found ${bookedESTTimes.length} booked EST times for ${date}:`, bookedESTTimes);
        console.log(`✅ Available local slots:`, availableSlots.map(s => `${s.localDisplay} (EST: ${s.estDisplay})`));
      } else {
        console.error('❌ Failed to check availability:', result.error);
        setAvailableTimeSlots(localTimeSlots); // Fallback to all slots
      }
    } catch (error) {
      console.error('❌ Error checking availability:', error);
      setAvailableTimeSlots(localTimeSlots); // Fallback to all slots
    } finally {
      setLoadingAvailability(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      // Check if the selected date is a weekday
      if (!isWeekday(data.appointment_date)) {
        throw new Error('Appointments are only available Monday through Friday. Please select a weekday.');
      }

      // Find the selected time slot to get both EST and local time info
      const selectedSlot = localTimeSlots.find(slot => slot.estTime === data.appointment_time);
      
      // Prepare appointment data for Firebase
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.business || '',
        industry: data.industry || '',
        service_interests: data.service_interests || '',
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time, // This is EST time
        appointment_time_est: data.appointment_time, // Explicit EST time
        appointment_time_local: selectedSlot ? selectedSlot.localTime : data.appointment_time, // Local time
        appointment_time_local_display: selectedSlot ? selectedSlot.localDisplay : formatTimeSlot(data.appointment_time), // Local display
        appointment_time_est_display: selectedSlot ? selectedSlot.estDisplay : formatTimeSlot(data.appointment_time), // EST display
        message: data.message || '',
        user_timezone: userTimezone
      };
      
      console.log('📅 Creating appointment in Firebase:', appointmentData);
      
      const result = await createAppointment(appointmentData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Your appointment has been booked successfully! We\'ll send you a confirmation email shortly.');
        reset();
        setSelectedDate('');
        setAvailableTimeSlots([]);
        setBookedTimes([]);
        
        console.log('✅ Appointment created successfully:', result.data);
        
        // Reset status after 1 hour (3600000 milliseconds)
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 3600000);
      } else {
        throw new Error(result.error || 'Failed to create appointment');
      }
    } catch (error) {
      console.error('❌ Appointment booking error:', error);
      setSubmitStatus('error');
      
      // Properly extract error message
      let errorMessage = 'Sorry, there was an error booking your appointment. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitMessage(errorMessage);
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  // Check if a date is a weekday (Monday-Friday)
  const isWeekday = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday (1) through Friday (5)
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    
    // Always set the date first to show the weekend message
    setSelectedDate(date);
    setValue('appointment_date', date);
    setValue('appointment_time', ''); // Reset time when date changes
    
    // If it's a weekend, the time slots will be automatically cleared
    // by the useEffect that checks isWeekday
  };

  const isFormValid = () => {
    const formData = watch();
    return formData.name && 
           formData.email && 
           formData.phone &&
           formData.appointment_date &&
           formData.appointment_time &&
           !errors.email &&
           !errors.phone &&
           isWeekday(formData.appointment_date); // Ensure it's a weekday
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // 3 months from now
    return maxDate.toISOString().split('T')[0];
  };

  const formatTimeSlot = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
    return `${displayHour}:${minute} ${period}`;
  };

  const getSubmitButtonContent = () => {
    switch (submitStatus) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Booking...</span>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Booked!</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-5 h-5" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Send className="w-5 h-5" />
            <span>Book Appointment</span>
          </>
        );
    }
  };

  const getSubmitButtonClass = () => {
    const baseClass = "w-full flex items-center justify-center space-x-2 px-8 py-4 text-lg font-medium transition-all duration-400 rounded-none";
    
    switch (submitStatus) {
      case 'loading':
        return `${baseClass} bg-gray-500 text-white cursor-not-allowed`;
      case 'success':
        return `${baseClass} bg-green-500 text-white`;
      case 'error':
        return `${baseClass} bg-red-500 text-white hover:bg-red-600`;
      default:
        return `${baseClass} bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] border-none ${
          !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
        }`;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 relative">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-[#00FFD1]">Appointment</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Schedule a consultation with our lead generation experts. 
              Choose your preferred date and time, and we'll help you grow your business.
            </p>
          </div>
        </ScrollReveal>



        {/* Appointment Form */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.4}>
            <GlassBox 
              className="p-8 lg:p-12"
              blur={20}
              opacity={0.1}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Schedule Your Consultation</h2>
                <p className="text-white/60">
                  Fill out the form below to book your appointment. All fields marked with * are required.
                </p>
                {userTimezone && (
                  <p className="text-[#00FFD1] text-sm mt-2">
                    📍 Booking in your timezone: {userTimezone}
                  </p>
                )}
              </div>

              {/* Success Message - Replaces Form */}
              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <ScrollReveal delay={0.1}>
                    <div className="mb-8">
                      <CheckCircle className="w-20 h-20 text-[#00FFD1] mx-auto mb-6" />
                      <h2 className="text-4xl font-bold text-white mb-6">
                        Appointment <span className="text-[#00FFD1]">Booked!</span>
                      </h2>
                      <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
                        Your appointment has been booked successfully! We'll send you a confirmation email shortly.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Button
                        onClick={() => {
                          setSubmitStatus('idle');
                          setSubmitMessage('');
                        }}
                        className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 rounded-none font-medium transition-all duration-300 text-lg"
                      >
                        Book Another Appointment
                      </Button>
                      <div className="text-white/60 text-sm">
                        This message will automatically disappear in 1 hour
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ) : (
                <>
                  {/* Status Message (for errors only) */}
                  {submitMessage && submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-lg border bg-red-500/10 border-red-500/20 text-red-400">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{submitMessage}</span>
                      </div>
                    </div>
                  )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                      <User className="w-4 h-4" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      {...register('name', { 
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="john@company.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    type="tel"
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Business Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                      <Building className="w-4 h-4" />
                      <span>Business/Company</span>
                    </label>
                    <input
                      {...register('business')}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none"
                      placeholder="Your Company Name"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Industry</span>
                    </label>
                    <select
                      {...register('industry')}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300FFD1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1rem'
                      }}
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-gray-900 text-white">Select Industry</option>
                      <option value="real-estate" className="bg-gray-900 text-white">Real Estate</option>
                      <option value="hard-money" className="bg-gray-900 text-white">Hard Money Lending</option>
                      <option value="solar" className="bg-gray-900 text-white">Solar Energy</option>
                      <option value="government" className="bg-gray-900 text-white">Government Contracting</option>
                      <option value="healthcare" className="bg-gray-900 text-white">Healthcare</option>
                      <option value="technology" className="bg-gray-900 text-white">Technology</option>
                      <option value="finance" className="bg-gray-900 text-white">Finance</option>
                      <option value="other" className="bg-gray-900 text-white">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                    <Target className="w-4 h-4" />
                    <span>Service Interests</span>
                  </label>
                  <select
                    {...register('service_interests')}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300FFD1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1rem'
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-gray-900 text-white">Select Service</option>
                    <option value="telemarketing" className="bg-gray-900 text-white">Telemarketing</option>
                    <option value="government-contracting" className="bg-gray-900 text-white">Government Contracting</option>
                    <option value="social-media" className="bg-gray-900 text-white">Social Media Marketing</option>
                    <option value="lead-generation" className="bg-gray-900 text-white">Lead Generation Strategy</option>
                    <option value="consultation" className="bg-gray-900 text-white">General Consultation</option>
                    <option value="multiple" className="bg-gray-900 text-white">Multiple Services</option>
                  </select>
                </div>

                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-white/80 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Preferred Date *</span>
                    </label>
                    <input
                      {...register('appointment_date', { required: 'Please select a date' })}
                      type="date"
                      min={getMinDate()}
                      max={getMaxDate()}
                      onChange={handleDateChange}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none [color-scheme:dark]"
                      disabled={isSubmitting}
                    />
                    {errors.appointment_date && (
                      <p className="text-red-400 text-sm mt-1">{errors.appointment_date.message}</p>
                    )}
                    {selectedDate && !isWeekday(selectedDate) && (
                      <p className="text-red-400 text-sm mt-1">
                        ⚠️ Weekend selected - Please choose a weekday (Monday-Friday)
                      </p>
                    )}
                    <p className="text-[#00FFD1] text-xs mt-1">
                      📅 Appointments available Monday - Friday only
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-white/80 mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Preferred Time *</span>
                      </div>
                      <div className="text-xs text-[#00FFD1]">
                        Times shown in your local timezone
                      </div>
                    </label>
                    {loadingAvailability ? (
                      <div className="w-full bg-white/5 border border-white/20 text-white/40 px-4 py-3 rounded-none flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Checking availability...
                      </div>
                    ) : selectedDate && !isWeekday(selectedDate) ? (
                      <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-none flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Weekend selected - No appointments available
                      </div>
                    ) : (
                      <select
                        {...register('appointment_time', { required: 'Please select a time' })}
                        className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none appearance-none bg-no-repeat bg-right bg-[length:16px_16px] pr-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300FFD1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1rem'
                        }}
                        disabled={isSubmitting || !selectedDate}
                      >
                        <option value="" className="bg-gray-900 text-white">
                          {selectedDate ? "Select Time" : "First select a date"}
                        </option>
                        {availableTimeSlots.map((slot) => (
                          <option key={slot.estTime} value={slot.estTime} className="bg-gray-900 text-white" title={`EST: ${slot.estDisplay}`}>
                            {slot.localDisplay} (EST: {slot.estDisplay})
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.appointment_time && (
                      <p className="text-red-400 text-sm mt-1">{errors.appointment_time.message}</p>
                    )}
                    
                    {/* Show booked times info */}
                    {selectedDate && bookedTimes.length > 0 && (
                      <p className="text-white/50 text-xs mt-1">
                        Unavailable EST times: {bookedTimes.map(formatTimeSlot).join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all duration-300 rounded-none resize-vertical"
                    placeholder="Tell us more about your goals and what you'd like to discuss..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid() || submitStatus === 'success'}
                  className={getSubmitButtonClass()}
                >
                  {getSubmitButtonContent()}
                </Button>
              </form>
              </>
              )}
            </GlassBox>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;