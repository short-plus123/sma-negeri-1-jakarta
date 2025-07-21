import { useState, useEffect } from 'react';

const defaultSettings = {
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
};

export const useSchoolSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('schoolSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({ ...defaultSettings, ...parsedSettings });
        }
      } catch (error) {
        console.error('Error loading school settings:', error);
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      if (event.detail) {
        setSettings({ ...defaultSettings, ...event.detail });
      }
    };

    window.addEventListener('schoolSettingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('schoolSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('schoolSettings', JSON.stringify(updatedSettings));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('schoolSettingsUpdated', { 
      detail: updatedSettings 
    }));
  };

  return {
    settings,
    loading,
    updateSettings
  };
};

export default useSchoolSettings;
