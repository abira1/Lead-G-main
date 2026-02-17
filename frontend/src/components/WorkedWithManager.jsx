import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, RefreshCw, Save, X, ExternalLink, Building } from 'lucide-react';
import { Button } from './ui/button';
import GlassBox from './GlassBox';
import { 
  getWorkedWithCompanies, 
  createWorkedWithCompany, 
  updateWorkedWithCompany, 
  deleteWorkedWithCompany,
  uploadLogoToImgBB 
} from '../services/firebaseService';

const WorkedWithManager = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCompany, setEditingCompany] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    website_url: '',
    logo_url: '',
    display_order: 0
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const getBackendUrl = () => {
    return process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
  };

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('🏢 Fetching companies from Firebase...');
      const result = await getWorkedWithCompanies();
      
      if (result.success) {
        setCompanies(result.data);
        console.log(`✅ Loaded ${result.data.length} companies`);
      } else {
        throw new Error(result.error || 'Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError(error.message || 'Failed to load companies');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WebP, SVG)');
      return;
    }

    setUploading(true);
    
    try {
      console.log('📤 Uploading worked with company logo to ImgBB...');
      const result = await uploadLogoToImgBB(file, 'worked-with', token);

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          logo_url: result.url
        }));
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

    if (!formData.company_name.trim()) {
      alert('Please enter a company name');
      return;
    }

    if (!formData.logo_url.trim()) {
      alert('Please upload a logo');
      return;
    }

    try {
      const backendUrl = getBackendUrl();
      const url = editingCompany 
        ? `${backendUrl}/api/worked-with/${editingCompany.id}`
        : `${backendUrl}/api/worked-with`;
      
      const method = editingCompany ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCompanies();
        resetForm();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save company');
      }
    } catch (error) {
      console.error('Error saving company:', error);
      alert('Failed to save company: ' + error.message);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      company_name: company.company_name,
      website_url: company.website_url || '',
      logo_url: company.logo_url,
      display_order: company.display_order || 0
    });
    setIsCreating(true);
  };

  const handleDelete = async (companyId) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/worked-with/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (response.ok) {
        await fetchCompanies();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Failed to delete company: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      website_url: '',
      logo_url: '',
      display_order: 0
    });
    setEditingCompany(null);
    setIsCreating(false);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Worked With Management</h2>
          <p className="text-white/70 mt-2">Manage company partnerships and logo showcase</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={fetchCompanies}
            disabled={loading}
            className="flex items-center space-x-2 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-4 py-2 rounded-none"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {isCreating && (
        <GlassBox className="p-6" blur={20} opacity={0.1}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingCompany ? 'Edit Company' : 'Add New Company'}
            </h3>
            <Button
              onClick={resetForm}
              className="flex items-center space-x-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-none border border-red-500/20"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                  placeholder="https://company.com"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Company Logo *
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none file:bg-[#00FFD1] file:text-black file:border-0 file:px-3 file:py-1 file:mr-3"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="flex items-center space-x-2 text-[#00FFD1]">
                      <Upload className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  {formData.logo_url && (
                    <div className="flex items-center space-x-3">
                      <img 
                        src={formData.logo_url.startsWith('http') ? formData.logo_url : `${getBackendUrl()}${formData.logo_url}`}
                        alt="Logo preview" 
                        className="w-16 h-16 object-contain bg-white/10 p-2 border border-white/20"
                      />
                      <span className="text-sm text-green-400">✓ Logo uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={uploading}
                className="flex items-center space-x-2 bg-[#00FFD1] text-black hover:bg-[#00d4b8] px-6 py-2 rounded-none"
              >
                <Save className="w-4 h-4" />
                <span>{editingCompany ? 'Update Company' : 'Add Company'}</span>
              </Button>
            </div>
          </form>
        </GlassBox>
      )}

      {/* Companies List */}
      <GlassBox className="p-6" blur={20} opacity={0.1}>
        <h3 className="text-xl font-semibold text-white mb-6">Companies ({companies.length})</h3>

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-[#00FFD1] mx-auto mb-4" />
            <p className="text-white/70">Loading companies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button 
              onClick={fetchCompanies}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-none"
            >
              Try Again
            </Button>
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-8">
            <Building className="w-8 h-8 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No companies found</p>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-[#00FFD1] text-black hover:bg-[#00d4b8] px-4 py-2 rounded-none"
            >
              Add First Company
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => {
              const logoUrl = company.logo_url.startsWith('http') 
                ? company.logo_url 
                : `${getBackendUrl()}${company.logo_url}`;

              return (
                <div
                  key={company.id}
                  className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300"
                >
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src={logoUrl}
                      alt={company.company_name}
                      className="w-24 h-24 object-contain bg-white/5 p-2 border border-white/10"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-white mb-1">{company.company_name}</h4>
                    {company.website_url && (
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-1 text-[#00FFD1] hover:text-[#00d4b8] text-sm transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Visit Website</span>
                      </a>
                    )}
                    <p className="text-xs text-white/50 mt-2">
                      Order: {company.display_order || 0} • {formatDateTime(company.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      onClick={() => handleEdit(company)}
                      className="flex items-center space-x-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1 text-sm rounded-none border border-blue-500/20"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleDelete(company.id)}
                      className="flex items-center space-x-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 text-sm rounded-none border border-red-500/20"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassBox>
    </div>
  );
};

export default WorkedWithManager;