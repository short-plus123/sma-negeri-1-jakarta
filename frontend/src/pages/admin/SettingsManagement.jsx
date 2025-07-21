import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button, Card, Input, Textarea, Modal } from '../../components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/ui/AnimatedComponents';

// Validation schema
const settingsSchema = yup.object().shape({
  schoolName: yup
    .string()
    .required('Nama sekolah harus diisi')
    .min(5, 'Nama sekolah minimal 5 karakter')
    .max(100, 'Nama sekolah maksimal 100 karakter'),
  schoolShortName: yup
    .string()
    .required('Nama singkat sekolah harus diisi')
    .min(3, 'Nama singkat minimal 3 karakter')
    .max(20, 'Nama singkat maksimal 20 karakter'),
  schoolAddress: yup
    .string()
    .required('Alamat sekolah harus diisi')
    .min(10, 'Alamat minimal 10 karakter')
    .max(200, 'Alamat maksimal 200 karakter'),
  schoolPhone: yup
    .string()
    .required('Nomor telepon harus diisi')
    .matches(/^(\+62|62|0)[0-9]{8,13}$/, 'Format nomor telepon tidak valid'),
  schoolEmail: yup
    .string()
    .email('Format email tidak valid')
    .required('Email sekolah harus diisi'),
  schoolWebsite: yup
    .string()
    .url('Format website tidak valid')
    .required('Website sekolah harus diisi'),
  principalName: yup
    .string()
    .required('Nama kepala sekolah harus diisi')
    .min(3, 'Nama kepala sekolah minimal 3 karakter')
    .max(100, 'Nama kepala sekolah maksimal 100 karakter'),
  schoolMotto: yup
    .string()
    .required('Motto sekolah harus diisi')
    .min(5, 'Motto minimal 5 karakter')
    .max(200, 'Motto maksimal 200 karakter'),
  schoolDescription: yup
    .string()
    .required('Deskripsi sekolah harus diisi')
    .min(20, 'Deskripsi minimal 20 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter')
});

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    schoolName: 'SMA Negeri 1 Jakarta',
    schoolShortName: 'SMAN 1 Jakarta',
    schoolAddress: 'Jl. Pendidikan No. 123, Menteng, Jakarta Pusat, DKI Jakarta 10310',
    schoolPhone: '021-12345678',
    schoolEmail: 'info@sman1jakarta.sch.id',
    schoolWebsite: 'https://www.sman1jakarta.sch.id',
    principalName: 'Dr. Ahmad Suryadi, M.Pd',
    schoolMotto: 'Unggul dalam Prestasi, Berkarakter, dan Berwawasan Global',
    schoolDescription: 'SMA Negeri 1 Jakarta adalah sekolah menengah atas negeri yang berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan mengembangkan potensi akademik dan karakter siswa.',
    logoUrl: '/images/logo-school.png'
  });

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors: formErrors, isSubmitting },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: settings
  });

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('schoolSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      reset(parsedSettings);
    }
  }, [reset]);

  const handleFormSubmit = async (data) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...data,
        logoUrl: settings.logoUrl
      };
      
      setSettings(updatedSettings);
      localStorage.setItem('schoolSettings', JSON.stringify(updatedSettings));
      
      // Trigger custom event to update other components
      window.dispatchEvent(new CustomEvent('schoolSettingsUpdated', { 
        detail: updatedSettings 
      }));
      
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan pengaturan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        alert('Tipe file tidak didukung. Gunakan JPG, PNG, atau SVG');
        return;
      }

      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Ukuran file terlalu besar. Maksimal 2MB');
        return;
      }

      setSelectedLogo(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setIsLogoModalOpen(true);
    }
  };

  const handleLogoSave = async () => {
    if (selectedLogo && logoPreview) {
      setIsSaving(true);
      try {
        // Simulate upload - in real app, upload to server/cloud storage
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedSettings = {
          ...settings,
          logoUrl: logoPreview // In real app, this would be the uploaded file URL
        };
        
        setSettings(updatedSettings);
        localStorage.setItem('schoolSettings', JSON.stringify(updatedSettings));
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('schoolSettingsUpdated', { 
          detail: updatedSettings 
        }));
        
        setIsLogoModalOpen(false);
        setSelectedLogo(null);
        setLogoPreview(null);
        
        alert('Logo berhasil diperbarui!');
      } catch (error) {
        alert('Terjadi kesalahan saat mengupload logo');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleLogoReset = () => {
    const defaultLogo = '/images/logo-school.png';
    const updatedSettings = {
      ...settings,
      logoUrl: defaultLogo
    };
    
    setSettings(updatedSettings);
    localStorage.setItem('schoolSettings', JSON.stringify(updatedSettings));
    
    window.dispatchEvent(new CustomEvent('schoolSettingsUpdated', { 
      detail: updatedSettings 
    }));
    
    alert('Logo berhasil direset ke default!');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <FadeIn direction="down" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sekolah</h1>
          <p className="text-gray-600 mt-2">Kelola informasi dan pengaturan umum sekolah</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Settings */}
          <FadeIn delay={0.2} className="lg:col-span-1">
            <Card padding="lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Logo Sekolah</h2>
              
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src={settings.logoUrl}
                    alt="Logo Sekolah"
                    className="w-32 h-32 mx-auto object-contain bg-gray-50 rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA5NkM4MC41Njg1IDk2IDk0IDgyLjU2ODUgOTQgNjZDOTQgNDkuNDMxNSA4MC41Njg1IDM2IDY0IDM2QzQ3LjQzMTUgMzYgMzQgNDkuNDMxNSAzNCA2NkMzNCA4Mi41Njg1IDQ3LjQzMTUgOTYgNjQgOTZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="cursor-pointer"
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      }
                    >
                      Upload Logo Baru
                    </Button>
                  </label>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogoReset}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    }
                  >
                    Reset ke Default
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Format: JPG, PNG, SVG<br />
                  Ukuran maksimal: 2MB<br />
                  Rekomendasi: 512x512px
                </p>
              </div>
            </Card>
          </FadeIn>

          {/* School Information Form */}
          <FadeIn delay={0.4} className="lg:col-span-2">
            <Card padding="lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Sekolah</h2>
              
              <form onSubmit={onSubmit(handleFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nama Sekolah Lengkap"
                    placeholder="SMA Negeri 1 Jakarta"
                    required
                    error={formErrors.schoolName?.message}
                    {...register('schoolName')}
                  />

                  <Input
                    label="Nama Singkat"
                    placeholder="SMAN 1 Jakarta"
                    required
                    error={formErrors.schoolShortName?.message}
                    {...register('schoolShortName')}
                  />
                </div>

                <Textarea
                  label="Alamat Sekolah"
                  placeholder="Jl. Pendidikan No. 123, Menteng, Jakarta Pusat"
                  rows={3}
                  required
                  error={formErrors.schoolAddress?.message}
                  {...register('schoolAddress')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nomor Telepon"
                    placeholder="021-12345678"
                    required
                    error={formErrors.schoolPhone?.message}
                    {...register('schoolPhone')}
                  />

                  <Input
                    label="Email Sekolah"
                    type="email"
                    placeholder="info@sekolah.sch.id"
                    required
                    error={formErrors.schoolEmail?.message}
                    {...register('schoolEmail')}
                  />
                </div>

                <Input
                  label="Website Sekolah"
                  type="url"
                  placeholder="https://www.sekolah.sch.id"
                  required
                  error={formErrors.schoolWebsite?.message}
                  {...register('schoolWebsite')}
                />

                <Input
                  label="Nama Kepala Sekolah"
                  placeholder="Dr. Ahmad Suryadi, M.Pd"
                  required
                  error={formErrors.principalName?.message}
                  {...register('principalName')}
                />

                <Input
                  label="Motto Sekolah"
                  placeholder="Unggul dalam Prestasi, Berkarakter, dan Berwawasan Global"
                  required
                  error={formErrors.schoolMotto?.message}
                  {...register('schoolMotto')}
                />

                <Textarea
                  label="Deskripsi Sekolah"
                  placeholder="Deskripsi singkat tentang sekolah..."
                  rows={4}
                  required
                  error={formErrors.schoolDescription?.message}
                  {...register('schoolDescription')}
                />

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting || isSaving}
                    disabled={isSubmitting || isSaving}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    }
                  >
                    Simpan Pengaturan
                  </Button>
                </div>
              </form>
            </Card>
          </FadeIn>
        </div>

        {/* Logo Upload Modal */}
        <Modal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
          title="Upload Logo Baru"
          size="md"
        >
          <div className="text-center">
            {logoPreview && (
              <div className="mb-6">
                <img
                  src={logoPreview}
                  alt="Preview Logo"
                  className="w-48 h-48 mx-auto object-contain bg-gray-50 rounded-lg border-2 border-gray-200"
                />
              </div>
            )}
            
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menggunakan logo ini?
            </p>
            
            <Modal.Footer>
              <Button
                onClick={() => setIsLogoModalOpen(false)}
                variant="outline"
                disabled={isSaving}
              >
                Batal
              </Button>
              <Button
                onClick={handleLogoSave}
                variant="primary"
                loading={isSaving}
                disabled={isSaving}
              >
                Simpan Logo
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement;
