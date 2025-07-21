import { useState, useEffect } from 'react';

// Custom hook untuk fetch news data
export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API endpoint - nanti bisa diganti dengan real API
  const API_BASE_URL = 'http://localhost:3001/api'; // Contoh backend URL

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulasi API call - nanti bisa diganti dengan fetch real API
      // const response = await fetch(`${API_BASE_URL}/news`);
      // const data = await response.json();

      // Mock data untuk simulasi
      const mockData = [
        {
          id: 1,
          title: "Prestasi Gemilang Siswa SMA Negeri 1 Jakarta di Olimpiade Matematika Nasional",
          excerpt: "Tim olimpiade matematika sekolah berhasil meraih juara 1 tingkat nasional setelah melalui seleksi ketat dari berbagai daerah di Indonesia.",
          content: "Tim olimpiade matematika SMA Negeri 1 Jakarta berhasil meraih prestasi gemilang dengan meraih juara 1 pada Olimpiade Matematika Nasional 2024. Prestasi ini diraih setelah melalui berbagai tahap seleksi yang ketat mulai dari tingkat sekolah, kabupaten, provinsi, hingga nasional. Tim yang terdiri dari 3 siswa terbaik ini telah mempersiapkan diri selama berbulan-bulan dengan bimbingan intensif dari guru pembimbing. Kepala sekolah menyampaikan rasa bangga dan apresiasi tinggi atas pencapaian luar biasa ini.",
          category: "Prestasi",
          author: "Admin Sekolah",
          date: "2024-12-15T10:00:00Z",
          image: null,
          views: 245,
          featured: true
        },
        {
          id: 2,
          title: "Pelaksanaan Ujian Tengah Semester Ganjil Tahun Ajaran 2024/2025",
          excerpt: "Ujian Tengah Semester akan dilaksanakan mulai tanggal 20-25 Januari 2025 dengan protokol kesehatan yang ketat.",
          content: "Sekolah mengumumkan jadwal pelaksanaan Ujian Tengah Semester Ganjil untuk semua tingkat kelas. Ujian akan berlangsung selama 6 hari dengan sistem shift untuk menghindari kepadatan. Semua siswa diwajibkan hadir tepat waktu dan membawa perlengkapan ujian yang diperlukan.",
          category: "Akademik",
          author: "Wakil Kepala Sekolah",
          date: "2024-12-10T08:30:00Z",
          image: null,
          views: 189,
          featured: false
        },
        {
          id: 3,
          title: "Festival Seni dan Budaya Sekolah 2024 Sukses Digelar",
          excerpt: "Acara tahunan Festival Seni dan Budaya berhasil menampilkan berbagai kreativitas siswa dalam bidang seni, musik, dan tari tradisional.",
          content: "Festival Seni dan Budaya SMA Negeri 1 Jakarta tahun 2024 telah sukses digelar dengan antusiasme tinggi dari seluruh siswa. Acara ini menampilkan berbagai pertunjukan mulai dari tari tradisional, musik modern, drama, hingga pameran karya seni rupa siswa.",
          category: "Kegiatan",
          author: "Koordinator Ekstrakurikuler",
          date: "2024-12-05T14:00:00Z",
          image: null,
          views: 312,
          featured: true
        },
        {
          id: 4,
          title: "Program Beasiswa Prestasi untuk Siswa Berprestasi Tahun 2025",
          excerpt: "Sekolah membuka program beasiswa prestasi untuk siswa yang memiliki prestasi akademik dan non-akademik outstanding.",
          content: "Dalam rangka mendukung siswa berprestasi, SMA Negeri 1 Jakarta membuka program beasiswa prestasi untuk tahun ajaran 2025. Program ini ditujukan untuk siswa yang memiliki prestasi akademik maupun non-akademik yang luar biasa.",
          category: "Pengumuman",
          author: "Kepala Sekolah",
          date: "2024-12-01T09:00:00Z",
          image: null,
          views: 156,
          featured: false
        },
        {
          id: 5,
          title: "Kunjungan Industri ke Perusahaan Teknologi Terkemuka",
          excerpt: "Siswa kelas XII IPA berkesempatan mengunjungi perusahaan teknologi untuk melihat langsung penerapan ilmu di dunia kerja.",
          content: "Sebagai bagian dari program pembelajaran kontekstual, siswa kelas XII IPA melakukan kunjungan industri ke beberapa perusahaan teknologi terkemuka di Jakarta. Kegiatan ini bertujuan memberikan gambaran nyata tentang penerapan ilmu pengetahuan di dunia kerja.",
          category: "Kegiatan",
          author: "Guru Pembimbing",
          date: "2024-11-28T11:30:00Z",
          image: null,
          views: 203,
          featured: false
        },
        {
          id: 6,
          title: "Peningkatan Fasilitas Laboratorium Komputer dengan Teknologi Terbaru",
          excerpt: "Sekolah melakukan upgrade fasilitas laboratorium komputer dengan perangkat terbaru untuk mendukung pembelajaran digital.",
          content: "Dalam upaya meningkatkan kualitas pembelajaran, SMA Negeri 1 Jakarta telah melakukan upgrade fasilitas laboratorium komputer dengan perangkat terbaru. Investasi ini diharapkan dapat mendukung pembelajaran digital yang semakin penting di era modern.",
          category: "Fasilitas",
          author: "Kepala Lab Komputer",
          date: "2024-11-25T13:15:00Z",
          image: null,
          views: 178,
          featured: false
        }
      ];

      // Simulasi delay network
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNews(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Function untuk fetch single news by ID
  const fetchNewsById = async (id) => {
    try {
      setLoading(true);
      // const response = await fetch(`${API_BASE_URL}/news/${id}`);
      // const data = await response.json();
      
      // Mock implementation
      const newsItem = news.find(item => item.id === parseInt(id));
      return newsItem;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function untuk fetch news by category
  const fetchNewsByCategory = async (category) => {
    try {
      setLoading(true);
      // const response = await fetch(`${API_BASE_URL}/news?category=${category}`);
      // const data = await response.json();
      
      // Mock implementation
      const filteredNews = news.filter(item => 
        category === 'all' || item.category.toLowerCase() === category.toLowerCase()
      );
      return filteredNews;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    fetchNews,
    fetchNewsById,
    fetchNewsByCategory,
    refetch: fetchNews
  };
};
