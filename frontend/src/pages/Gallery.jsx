import React, { useState, useEffect } from 'react';
import ImageSlider from '../components/ImageSlider';
import ImageModal from '../components/ImageModal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data untuk galeri
  const mockImages = [
    {
      id: 1,
      title: "Upacara Bendera Hari Senin",
      description: "Kegiatan rutin upacara bendera setiap hari Senin di halaman sekolah",
      url: "https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Upacara+Bendera",
      category: "Kegiatan Rutin",
      featured: true,
      date: "2024-12-15"
    },
    {
      id: 2,
      title: "Festival Seni dan Budaya 2024",
      description: "Penampilan tari tradisional dalam acara festival seni dan budaya tahunan",
      url: "https://via.placeholder.com/800x600/10B981/FFFFFF?text=Festival+Seni",
      category: "Kegiatan Khusus",
      featured: true,
      date: "2024-12-10"
    },
    {
      id: 3,
      title: "Olimpiade Matematika Nasional",
      description: "Tim olimpiade matematika sekolah saat mengikuti kompetisi tingkat nasional",
      url: "https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Olimpiade+Matematika",
      category: "Prestasi",
      featured: true,
      date: "2024-12-05"
    },
    {
      id: 4,
      title: "Laboratorium Komputer Baru",
      description: "Fasilitas laboratorium komputer yang baru direnovasi dengan perangkat modern",
      url: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Lab+Komputer",
      category: "Fasilitas",
      featured: false,
      date: "2024-11-28"
    },
    {
      id: 5,
      title: "Kegiatan Ekstrakurikuler Basket",
      description: "Latihan rutin tim basket sekolah di lapangan olahraga",
      url: "https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Ekstrakurikuler+Basket",
      category: "Ekstrakurikuler",
      featured: false,
      date: "2024-11-25"
    },
    {
      id: 6,
      title: "Perpustakaan Digital",
      description: "Suasana belajar siswa di perpustakaan dengan fasilitas digital terbaru",
      url: "https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Perpustakaan+Digital",
      category: "Fasilitas",
      featured: false,
      date: "2024-11-20"
    },
    {
      id: 7,
      title: "Kunjungan Industri",
      description: "Siswa kelas XII saat melakukan kunjungan industri ke perusahaan teknologi",
      url: "https://via.placeholder.com/600x400/84CC16/FFFFFF?text=Kunjungan+Industri",
      category: "Kegiatan Khusus",
      featured: false,
      date: "2024-11-15"
    },
    {
      id: 8,
      title: "Lomba Karya Tulis Ilmiah",
      description: "Presentasi siswa dalam lomba karya tulis ilmiah tingkat provinsi",
      url: "https://via.placeholder.com/600x400/F97316/FFFFFF?text=Karya+Tulis+Ilmiah",
      category: "Prestasi",
      featured: false,
      date: "2024-11-10"
    },
    {
      id: 9,
      title: "Kegiatan Pramuka",
      description: "Kegiatan perkemahan pramuka di alam terbuka",
      url: "https://via.placeholder.com/600x400/22C55E/FFFFFF?text=Kegiatan+Pramuka",
      category: "Ekstrakurikuler",
      featured: false,
      date: "2024-11-05"
    },
    {
      id: 10,
      title: "Ruang Kelas Modern",
      description: "Suasana pembelajaran di ruang kelas dengan fasilitas modern",
      url: "https://via.placeholder.com/600x400/A855F7/FFFFFF?text=Ruang+Kelas+Modern",
      category: "Fasilitas",
      featured: false,
      date: "2024-11-01"
    },
    {
      id: 11,
      title: "Pentas Seni Musik",
      description: "Penampilan band sekolah dalam acara pentas seni musik",
      url: "https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Pentas+Seni+Musik",
      category: "Kegiatan Khusus",
      featured: false,
      date: "2024-10-28"
    },
    {
      id: 12,
      title: "Kegiatan Bakti Sosial",
      description: "Siswa dan guru saat melakukan kegiatan bakti sosial di masyarakat",
      url: "https://via.placeholder.com/600x400/14B8A6/FFFFFF?text=Bakti+Sosial",
      category: "Kegiatan Khusus",
      featured: false,
      date: "2024-10-25"
    }
  ];

  const categories = ['all', 'Kegiatan Rutin', 'Kegiatan Khusus', 'Prestasi', 'Fasilitas', 'Ekstrakurikuler'];

  useEffect(() => {
    // Simulasi API call
    const fetchImages = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setImages(mockImages);
      setFilteredImages(mockImages);
      setLoading(false);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const featuredImages = images.filter(img => img.featured);

  const openModal = (image, index = 0) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const goToNextImage = () => {
    const nextIndex = currentImageIndex === filteredImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const goToPrevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Galeri Kegiatan
        </h1>
        <p className="text-xl text-gray-600">
          Dokumentasi kegiatan dan fasilitas SMA Negeri 1 Jakarta
        </p>
      </div>

      {/* Featured Images Slider */}
      {!loading && featuredImages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sorotan Kegiatan</h2>
          <ImageSlider 
            images={featuredImages} 
            onImageClick={(image, index) => openModal(image, index)}
          />
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Images Grid */}
      {!loading && (
        <>
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => openModal(image, index)}
                >
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-300 text-xs">
                        {image.category}
                      </p>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada gambar ditemukan</h3>
              <p className="text-gray-600">Coba pilih kategori yang berbeda</p>
            </div>
          )}
        </>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        image={selectedImage}
        images={filteredImages}
        currentIndex={currentImageIndex}
        onNext={goToNextImage}
        onPrev={goToPrevImage}
      />
    </div>
  );
};

export default Gallery;
