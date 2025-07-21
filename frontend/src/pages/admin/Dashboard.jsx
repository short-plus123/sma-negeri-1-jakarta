import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card } from '../../components/ui';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/AnimatedComponents';
import WelcomeModal from '../../components/admin/WelcomeModal';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ role: 'Admin', name: 'Administrator' });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if user just logged in and show welcome modal
  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    const authData = localStorage.getItem('adminAuth');

    if (justLoggedIn && authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        setUserInfo({
          role: parsedAuth.role || 'Admin',
          name: parsedAuth.username || 'Administrator'
        });
        setShowWelcomeModal(true);
        // Remove the flag so modal doesn't show again on refresh
        sessionStorage.removeItem('justLoggedIn');
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
  }, []);
  // Mock data untuk statistik
  const stats = [
    {
      title: 'Total Berita',
      value: '24',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Galeri',
      value: '156',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Total Pengunjung',
      value: '1,234',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: 'bg-purple-500',
      change: '+25%'
    },
    {
      title: 'Pesan Kontak',
      value: '18',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const recentNews = [
    {
      id: 1,
      title: 'Prestasi Gemilang Siswa di Olimpiade Matematika',
      date: '2024-12-15',
      status: 'Published',
      views: 245
    },
    {
      id: 2,
      title: 'Pelaksanaan Ujian Tengah Semester',
      date: '2024-12-10',
      status: 'Published',
      views: 189
    },
    {
      id: 3,
      title: 'Festival Seni dan Budaya 2024',
      date: '2024-12-05',
      status: 'Draft',
      views: 0
    }
  ];

  const recentActivities = [
    {
      action: 'Berita baru ditambahkan',
      item: 'Prestasi Gemilang Siswa di Olimpiade Matematika',
      time: '2 jam yang lalu',
      type: 'create'
    },
    {
      action: 'Galeri diperbarui',
      item: 'Festival Seni dan Budaya',
      time: '5 jam yang lalu',
      type: 'update'
    },
    {
      action: 'Pesan kontak baru',
      item: 'Dari: john.doe@email.com',
      time: '1 hari yang lalu',
      type: 'message'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <FadeIn direction="down" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Selamat datang di panel admin SMA Negeri 1 Jakarta</p>
        </FadeIn>

        {/* Stats Cards */}
        <StaggerContainer
          className={`grid gap-6 mb-8 ${
            windowWidth >= 900
              ? 'grid-cols-4'
              : windowWidth >= 640
                ? 'grid-cols-2'
                : 'grid-cols-1'
          }`}
        >
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card padding="md" hover className="h-full">
                  <div className={`flex items-center ${
                    windowWidth >= 900 ? 'justify-between' : 'justify-start'
                  } h-full`}>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className={`font-bold text-gray-900 mt-2 ${
                        windowWidth >= 900 ? 'text-3xl' : 'text-2xl'
                      }`}>{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} dari bulan lalu</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-white flex-shrink-0 ${
                      windowWidth >= 900 ? 'ml-4' : 'ml-6'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className={`grid gap-8 ${
          windowWidth >= 900 ? 'grid-cols-2' : 'grid-cols-1'
        }`}>
          {/* Recent News */}
          <FadeIn delay={0.6}>
            <Card className="h-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Berita Terbaru</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div key={news.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{news.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{news.date}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          news.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {news.status}
                        </span>
                        <span>{news.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Lihat semua berita →
                </button>
              </div>
            </div>
            </Card>
          </FadeIn>

          {/* Recent Activities */}
          <FadeIn delay={0.8}>
            <Card className="h-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'create' ? 'bg-green-100' :
                      activity.type === 'update' ? 'bg-blue-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'create' && (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                      {activity.type === 'update' && (
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                      {activity.type === 'message' && (
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          </FadeIn>
        </div>

        {/* Quick Actions */}
        <FadeIn delay={1.0} className="mt-8">
          <Card padding="lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-300">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium text-blue-900">Tambah Berita Baru</span>
              </button>
              <button className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition duration-300">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-green-900">Upload Galeri</span>
              </button>
              <button className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition duration-300">
                <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium text-purple-900">Lihat Statistik</span>
              </button>
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userRole={userInfo.role}
        userName={userInfo.name}
      />
    </AdminLayout>
  );
};

export default Dashboard;
