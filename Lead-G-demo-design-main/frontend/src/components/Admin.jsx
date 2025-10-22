import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, Building, User, Filter, RefreshCw, CheckCircle, XCircle, AlertCircle, Eye, LogOut, FileText, Download, Plus, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import AdminLogin from './AdminLogin';
import TestimonialManager from './TestimonialManager';
import WorkedWithManager from './WorkedWithManager';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { isAuthenticated, loading, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [statusFilter, isAuthenticated]);

  const getBackendUrl = () => {
    // Try different sources for backend URL
    const envUrl = process.env.REACT_APP_BACKEND_URL;
    
    if (envUrl) {
      return envUrl;
    }
    
    // Fallback based on current domain
    const currentHost = window.location.host;
    
    if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
      return 'http://localhost:8001';
    } else if (currentHost.includes('preview.emergentagent.com')) {
      return 'https://scroll-reset-plus.preview.emergentagent.com';
    } else {
      // Production fallback
      return 'https://scroll-reset-plus.preview.emergentagent.com';
    }
  };

  const fetchAppointments = async () => {
    setLoadingData(true);
    setError('');
    
    try {
      const backendUrl = getBackendUrl();
      const url = statusFilter 
        ? `${backendUrl}/api/appointments?status_filter=${statusFilter}` 
        : `${backendUrl}/api/appointments`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });
      const data = await response.json();
      
      if (response.ok) {
        setAppointments(data);
      } else {
        throw new Error(data.detail || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.message || 'Failed to load appointments');
      setAppointments([]);
    } finally {
      setLoadingData(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    setUpdatingStatus(appointmentId);
    
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(
        `${backendUrl}/api/appointments/${appointmentId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          mode: 'cors',
          credentials: 'omit',
          body: JSON.stringify({ status: newStatus }),
        }
      );
      
      if (response.ok) {
        // Update the appointment in the local state
        setAppointments(prevAppointments =>
          prevAppointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
          )
        );
        
        // Update selected appointment if it's the one being updated
        if (selectedAppointment && selectedAppointment.id === appointmentId) {
          setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status: ' + error.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const exportToPDF = async () => {
    setExportingPDF(true);
    
    try {
      const backendUrl = getBackendUrl();
      const url = statusFilter 
        ? `${backendUrl}/api/admin/export/pdf?status_filter=${statusFilter}`
        : `${backendUrl}/api/admin/export/pdf`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
        mode: 'cors',
        credentials: 'omit',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `appointments_report_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        throw new Error('Failed to export PDF');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF: ' + error.message);
    } finally {
      setExportingPDF(false);
    }
  };

  const exportToExcel = async () => {
    setExportingExcel(true);
    
    try {
      const backendUrl = getBackendUrl();
      const url = statusFilter 
        ? `${backendUrl}/api/admin/export/excel?status_filter=${statusFilter}`
        : `${backendUrl}/api/admin/export/excel`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        mode: 'cors',
        credentials: 'omit',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `appointments_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        throw new Error('Failed to export Excel');
      }
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Failed to export Excel: ' + error.message);
    } finally {
      setExportingExcel(false);
    }
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-[#00FFD1] mx-auto mb-4" />
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
    return `${displayHour}:${minute} ${period}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAppointmentCounts = () => {
    const counts = {
      total: appointments.length,
      pending: appointments.filter(apt => apt.status === 'pending').length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      completed: appointments.filter(apt => apt.status === 'completed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
    };
    return counts;
  };

  const counts = getAppointmentCounts();

  return (
    <div className="min-h-screen bg-black">
      {/* Modern Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00FFD1] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img 
                  src="/lead-g-logo.png" 
                  alt="Lead G Logo" 
                  className="w-10 h-10 relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white group-hover:text-[#00FFD1] transition-colors duration-300">
                  Lead G
                </h1>
                <p className="text-[10px] text-[#00FFD1] font-medium tracking-wider uppercase">Admin Panel</p>
              </div>
            </div>

            {/* Center Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === 'appointments'
                    ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black shadow-lg shadow-[#00FFD1]/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Appointments</span>
                {counts.pending > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === 'appointments' ? 'bg-black/20 text-black' : 'bg-[#00FFD1]/20 text-[#00FFD1]'
                  }`}>
                    {counts.pending}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === 'testimonials'
                    ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black shadow-lg shadow-[#00FFD1]/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Testimonials</span>
              </button>
              <button
                onClick={() => setActiveTab('worked-with')}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === 'worked-with'
                    ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black shadow-lg shadow-[#00FFD1]/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="font-medium">Worked With</span>
              </button>
            </div>

            {/* Right Section - User & Actions */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden lg:flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFD1] to-[#00d4b8] flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-[10px] text-white/50">Online</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden pb-4 grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                activeTab === 'appointments'
                  ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black'
                  : 'bg-white/5 text-white/70 border border-white/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium text-xs">Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                activeTab === 'testimonials'
                  ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black'
                  : 'bg-white/5 text-white/70 border border-white/10'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium text-xs">Testimonials</span>
            </button>
            <button
              onClick={() => setActiveTab('worked-with')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                activeTab === 'worked-with'
                  ? 'bg-gradient-to-r from-[#00FFD1] to-[#00d4b8] text-black'
                  : 'bg-white/5 text-white/70 border border-white/10'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="font-medium text-xs">Worked With</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content with Top Padding for Fixed Navbar */}
      <div className="pt-28 md:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <ScrollReveal delay={0.3}>
            <TestimonialManager token={token} />
          </ScrollReveal>
        )}

        {/* Worked With Tab */}
        {activeTab === 'worked-with' && (
          <ScrollReveal delay={0.3}>
            <WorkedWithManager token={token} />
          </ScrollReveal>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <>
            {/* Stats Cards */}
            <ScrollReveal delay={0.3}>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <GlassBox className="p-4 text-center" blur={16} opacity={0.1}>
              <div className="text-2xl font-bold text-[#00FFD1]">{counts.total}</div>
              <div className="text-sm text-white/70">Total</div>
            </GlassBox>
            <GlassBox className="p-4 text-center" blur={16} opacity={0.1}>
              <div className="text-2xl font-bold text-yellow-400">{counts.pending}</div>
              <div className="text-sm text-white/70">Pending</div>
            </GlassBox>
            <GlassBox className="p-4 text-center" blur={16} opacity={0.1}>
              <div className="text-2xl font-bold text-green-400">{counts.confirmed}</div>
              <div className="text-sm text-white/70">Confirmed</div>
            </GlassBox>
            <GlassBox className="p-4 text-center" blur={16} opacity={0.1}>
              <div className="text-2xl font-bold text-blue-400">{counts.completed}</div>
              <div className="text-sm text-white/70">Completed</div>
            </GlassBox>
            <GlassBox className="p-4 text-center" blur={16} opacity={0.1}>
              <div className="text-2xl font-bold text-red-400">{counts.cancelled}</div>
              <div className="text-sm text-white/70">Cancelled</div>
            </GlassBox>
          </div>
        </ScrollReveal>

        {/* Controls */}
        <ScrollReveal delay={0.4}>
          <GlassBox className="p-6 mb-8" blur={16} opacity={0.1}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-white/70" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/5 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={exportToPDF}
                  disabled={exportingPDF}
                  className="flex items-center space-x-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-none border border-red-500/20"
                >
                  {exportingPDF ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span>Export PDF</span>
                </Button>
                
                <Button
                  onClick={exportToExcel}
                  disabled={exportingExcel}
                  className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-none border border-blue-500/20"
                >
                  {exportingExcel ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Export Excel</span>
                </Button>
                
                <Button
                  onClick={fetchAppointments}
                  disabled={loadingData}
                  className="flex items-center space-x-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-4 py-2 rounded-none"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </Button>
              </div>
            </div>
          </GlassBox>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.5}>
              <GlassBox className="p-6" blur={20} opacity={0.1}>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Appointments {statusFilter && `(${statusFilter})`}
                </h2>

                {loadingData ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 animate-spin text-[#00FFD1] mx-auto mb-4" />
                    <p className="text-white/70">Loading appointments...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400">{error}</p>
                    <Button 
                      onClick={fetchAppointments}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-none"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-8 h-8 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70">No appointments found</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                          selectedAppointment?.id === appointment.id 
                            ? 'border-[#00FFD1] bg-white/5' 
                            : 'border-white/10'
                        }`}
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-[#00FFD1]" />
                            <span className="font-medium text-white">{appointment.name}</span>
                          </div>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(appointment.appointment_date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(appointment.appointment_time)}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 mt-2 text-sm text-white/50">
                          <Mail className="w-3 h-3" />
                          <span>{appointment.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassBox>
            </ScrollReveal>
          </div>

          {/* Appointment Details */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.6}>
              <GlassBox className="p-6 sticky top-24" blur={20} opacity={0.1}>
                <h2 className="text-xl font-bold text-white mb-6">
                  {selectedAppointment ? 'Appointment Details' : 'Select an Appointment'}
                </h2>

                {selectedAppointment ? (
                  <div className="space-y-4">
                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Status</label>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded border flex-1 ${getStatusColor(selectedAppointment.status)}`}>
                          {getStatusIcon(selectedAppointment.status)}
                          <span className="capitalize">{selectedAppointment.status}</span>
                        </div>
                      </div>
                      
                      {/* Status Update Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                          <Button
                            key={status}
                            onClick={() => updateAppointmentStatus(selectedAppointment.id, status)}
                            disabled={updatingStatus === selectedAppointment.id || selectedAppointment.status === status}
                            className={`text-xs py-1 px-2 rounded-none ${
                              selectedAppointment.status === status
                                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                : 'bg-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            {updatingStatus === selectedAppointment.id ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <span className="capitalize">{status}</span>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Contact Information</label>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-white/70">
                          <User className="w-3 h-3" />
                          <span>{selectedAppointment.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                          <Mail className="w-3 h-3" />
                          <span>{selectedAppointment.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                          <Phone className="w-3 h-3" />
                          <span>{selectedAppointment.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Info */}
                    {(selectedAppointment.business || selectedAppointment.industry) && (
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Business Information</label>
                        <div className="space-y-2 text-sm">
                          {selectedAppointment.business && (
                            <div className="flex items-center space-x-2 text-white/70">
                              <Building className="w-3 h-3" />
                              <span>{selectedAppointment.business}</span>
                            </div>
                          )}
                          {selectedAppointment.industry && (
                            <div className="text-white/70">
                              Industry: {selectedAppointment.industry}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Service Interests */}
                    {selectedAppointment.service_interests && (
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Service Interests</label>
                        <div className="text-sm text-white/70">
                          {selectedAppointment.service_interests}
                        </div>
                      </div>
                    )}

                    {/* Appointment Details */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Appointment</label>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-white/70">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(selectedAppointment.appointment_date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(selectedAppointment.appointment_time)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    {selectedAppointment.message && (
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                        <div className="text-sm text-white/70 bg-white/5 p-3 rounded border border-white/10">
                          {selectedAppointment.message}
                        </div>
                      </div>
                    )}

                    {/* Created At */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Booked At</label>
                      <div className="text-sm text-white/50">
                        {formatDateTime(selectedAppointment.created_at)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="w-8 h-8 text-white/30 mx-auto mb-4" />
                    <p className="text-white/50">
                      Click on an appointment from the list to view details and manage status.
                    </p>
                  </div>
                )}
              </GlassBox>
            </ScrollReveal>
          </div>
        </div>
        </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Admin;