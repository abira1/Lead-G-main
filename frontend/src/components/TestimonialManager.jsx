import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Upload, Link as LinkIcon, X, Save } from 'lucide-react';
import { Button } from './ui/button';
import GlassBox from './GlassBox';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  uploadLogoToImgBB 
} from '../services/firebaseService';

const TestimonialManager = ({ token }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    logo_url: '',
    testimonial: '',
    author: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('💬 Fetching testimonials for admin...');
      const result = await getTestimonials();
      
      if (result.success) {
        setTestimonials(result.data);
        console.log(`✅ Loaded ${result.data.length} testimonials`);
      } else {
        throw new Error(result.error || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('❌ Error fetching testimonials:', error);
      setError(error.message);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      console.log('📤 Uploading testimonial logo to ImgBB...');
      const result = await uploadLogoToImgBB(file, 'testimonial', token);

      if (result.success) {
        setFormData(prev => ({ ...prev, logo_url: result.url }));
        console.log('✅ Logo uploaded successfully to ImgBB:', result.url);
        alert('Logo uploaded successfully!');
      } else {
        throw new Error(result.error || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('❌ Error uploading logo:', error);
      alert('Failed to upload logo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.client_name || !formData.company || !formData.testimonial_text) {
      alert('Please fill in all required fields (Client Name, Company, Testimonial)');
      return;
    }

    try {
      console.log('💾 Saving testimonial to Firebase...');
      
      let result;
      if (editingId) {
        result = await updateTestimonial(editingId, formData);
      } else {
        result = await createTestimonial(formData);
      }

      if (result.success) {
        alert(editingId ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        console.log('✅ Testimonial saved successfully');
        resetForm();
        fetchTestimonials();
      } else {
        throw new Error(result.error || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error('❌ Error saving testimonial:', error);
      alert('Failed to save testimonial: ' + error.message);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      client_name: testimonial.client_name || '',
      company: testimonial.company || '',
      position: testimonial.position || '',
      testimonial_text: testimonial.testimonial_text || '',
      rating: testimonial.rating || 5,
      image_url: testimonial.image_url || '',
      is_featured: testimonial.is_featured || false,
      display_order: testimonial.display_order || 0
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      console.log('🗑️ Deleting testimonial from Firebase...');
      const result = await deleteTestimonial(id);

      if (result.success) {
        alert('Testimonial deleted successfully!');
        console.log('✅ Testimonial deleted successfully');
        fetchTestimonials();
      } else {
        throw new Error(result.error || 'Failed to delete testimonial');
      }
    } catch (error) {
      console.error('❌ Error deleting testimonial:', error);
      alert('Failed to delete testimonial: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      company: '',
      position: '',
      testimonial_text: '',
      rating: 5,
      image_url: '',
      is_featured: false,
      display_order: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Testimonials Management
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={fetchTestimonials}
            disabled={loading}
            className="flex items-center space-x-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-4 py-2 rounded-none"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-none border border-green-500/20"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? 'Cancel' : 'Add New'}</span>
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <GlassBox className="p-6" blur={16} opacity={0.1}>
          <h3 className="text-xl font-bold text-white mb-4">
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Logo Upload/URL */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Company Logo *
              </label>
              <div className="space-y-2">
                {/* File Upload */}
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-none border border-blue-500/20">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload Logo'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-white/50 text-sm">or</span>
                </div>

                {/* URL Input */}
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                    placeholder="Or paste logo URL"
                    required
                  />
                </div>

                {/* Logo Preview */}
                {formData.logo_url && (
                  <div className="mt-2">
                    <p className="text-xs text-white/50 mb-1">Preview:</p>
                    <img
                      src={formData.logo_url}
                      alt="Logo preview"
                      className="h-20 w-20 object-contain border border-white/20 p-2 bg-white/5"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.company_name || 'Company')}&size=128&background=00FFD1&color=000`;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Testimonial Text */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Testimonial *
              </label>
              <textarea
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none h-32 resize-none"
                placeholder="Enter testimonial text"
                maxLength={500}
                required
              />
              <p className="text-xs text-white/50 mt-1">
                {formData.testimonial.length}/500 characters
              </p>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                placeholder="Enter author name (e.g., John Smith - CEO)"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-2">
              <Button
                type="submit"
                className="flex items-center space-x-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-6 py-2 rounded-none"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Create'} Testimonial</span>
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                className="flex items-center space-x-2 bg-white/5 text-white hover:bg-white/10 px-6 py-2 rounded-none"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </GlassBox>
      )}

      {/* Testimonials List */}
      <GlassBox className="p-6" blur={16} opacity={0.1}>
        <h3 className="text-xl font-bold text-white mb-4">
          All Testimonials ({testimonials.length})
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-[#00FFD1] mx-auto mb-4" />
            <p className="text-white/70">Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/70">No testimonials yet. Add your first testimonial!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Logo */}
                  <img
                    src={testimonial.logo_url}
                    alt={`${testimonial.company_name} logo`}
                    className="h-16 w-16 object-contain border border-white/20 p-2 bg-white/5 flex-shrink-0"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.company_name)}&size=128&background=00FFD1&color=000`;
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {testimonial.company_name}
                    </h4>
                    <p className="text-sm text-white/70 italic mb-2">
                      "{testimonial.testimonial}"
                    </p>
                    <p className="text-xs text-[#00FFD1]">
                      - {testimonial.author}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 flex-shrink-0">
                    <Button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-none"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassBox>
    </div>
  );
};

export default TestimonialManager;
