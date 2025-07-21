import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button, Card, Input, Textarea, Select, Modal } from '../../components/ui';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/AnimatedComponents';

// Validation schema
const gallerySchema = yup.object().shape({
  title: yup
    .string()
    .required('Judul harus diisi')
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  description: yup
    .string()
    .required('Deskripsi harus diisi')
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  category: yup
    .string()
    .required('Kategori harus dipilih')
    .oneOf(['Kegiatan Rutin', 'Kegiatan Khusus', 'Prestasi', 'Fasilitas', 'Ekstrakurikuler'], 'Kategori tidak valid'),
  uploadedBy: yup
    .string()
    .required('Nama uploader harus diisi')
    .min(2, 'Nama uploader minimal 2 karakter')
    .max(50, 'Nama uploader maksimal 50 karakter'),
  featured: yup.boolean()
});

const GalleryManagement = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Upacara Bendera Hari Senin",
      description: "Kegiatan rutin upacara bendera setiap hari Senin di halaman sekolah",
      url: "https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Upacara+Bendera",
      category: "Kegiatan Rutin",
      featured: true,
      date: "2024-12-15",
      uploadedBy: "Admin Sekolah"
    },
    {
      id: 2,
      title: "Festival Seni dan Budaya 2024",
      description: "Penampilan tari tradisional dalam acara festival seni dan budaya tahunan",
      url: "https://via.placeholder.com/800x600/10B981/FFFFFF?text=Festival+Seni",
      category: "Kegiatan Khusus",
      featured: true,
      date: "2024-12-10",
      uploadedBy: "Koordinator Seni"
    },
    {
      id: 3,
      title: "Olimpiade Matematika Nasional",
      description: "Tim olimpiade matematika sekolah saat mengikuti kompetisi tingkat nasional",
      url: "https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Olimpiade+Matematika",
      category: "Prestasi",
      featured: false,
      date: "2024-12-05",
      uploadedBy: "Guru Matematika"
    },
    {
      id: 4,
      title: "Laboratorium Komputer Baru",
      description: "Fasilitas laboratorium komputer yang baru direnovasi dengan perangkat modern",
      url: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Lab+Komputer",
      category: "Fasilitas",
      featured: false,
      date: "2024-11-28",
      uploadedBy: "Admin Sekolah"
    },
    {
      id: 5,
      title: "Kegiatan Ekstrakurikuler Basket",
      description: "Latihan rutin tim basket sekolah di lapangan olahraga",
      url: "https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Ekstrakurikuler+Basket",
      category: "Ekstrakurikuler",
      featured: false,
      date: "2024-11-25",
      uploadedBy: "Pelatih Basket"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fileError, setFileError] = useState('');

  // React Hook Form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors: formErrors, isSubmitting },
    reset,
    setValue,
    
  } = useForm({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      uploadedBy: '',
      featured: false
    }
  });

  const categories = ['Kegiatan Rutin', 'Kegiatan Khusus', 'Prestasi', 'Fasilitas', 'Ekstrakurikuler'];

  const resetForm = () => {
    reset({
      title: '',
      description: '',
      category: '',
      uploadedBy: '',
      featured: false
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setFileError('');
  };

  const openModal = (mode, image = null) => {
    setModalMode(mode);
    setSelectedImage(image);

    if (mode === 'edit' && image) {
      setValue('title', image.title);
      setValue('description', image.description);
      setValue('category', image.category);
      setValue('uploadedBy', image.uploadedBy);
      setValue('featured', image.featured);
      setPreviewUrl(image.url); // Set preview untuk edit
      setSelectedFile(null);
    } else if (mode === 'create') {
      resetForm();
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    resetForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Tipe file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP');
        return;
      }

      // Validasi ukuran file (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setFileError('Ukuran file terlalu besar. Maksimal 5MB');
        return;
      }

      setSelectedFile(file);
      setFileError(''); // Clear error

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler with react-hook-form
  const handleFormSubmit = async (data) => {
    // Validasi file
    if (modalMode === 'create' && !selectedFile) {
      setFileError('File gambar harus dipilih');
      return;
    }

    if (modalMode === 'edit' && !selectedFile && !previewUrl) {
      setFileError('File gambar harus dipilih');
      return;
    }

    // Simulasi upload file - dalam implementasi nyata, upload ke server/cloud storage
    let imageUrl = selectedImage?.url || ''; // Keep existing URL for edit if no new file

    if (selectedFile) {
      // Simulasi upload file - buat URL dari file yang dipilih
      imageUrl = previewUrl; // Gunakan preview URL sebagai simulasi

      // Dalam implementasi nyata, Anda akan upload file ke server:
      // const formDataUpload = new FormData();
      // formDataUpload.append('image', selectedFile);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formDataUpload
      // });
      // const result = await response.json();
      // imageUrl = result.url;
    }

    if (modalMode === 'create') {
      const newImage = {
        id: Date.now(),
        ...data,
        url: imageUrl,
        date: new Date().toISOString().split('T')[0]
      };
      setImages(prev => [newImage, ...prev]);
    } else if (modalMode === 'edit') {
      setImages(prev => prev.map(item =>
        item.id === selectedImage.id
          ? { ...item, ...data, url: imageUrl }
          : item
      ));
    }

    closeModal();
  };

  const handleDelete = () => {
    setImages(prev => prev.filter(item => item.id !== selectedImage.id));
    closeModal();
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <FadeIn direction="down" className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Galeri</h1>
            <p className="text-gray-600 mt-2">Kelola semua gambar dan foto kegiatan sekolah</p>
          </div>
          <Button
            onClick={() => openModal('create')}
            variant="primary"
            size="lg"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Upload Gambar
          </Button>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={0.2} className="mb-6">
          <StaggerContainer className="flex flex-wrap gap-2">
            <StaggerItem>
              <Button
                onClick={() => setSelectedCategory('all')}
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                size="sm"
              >
                Semua ({images.length})
              </Button>
            </StaggerItem>
            {categories.map((category) => {
              const count = images.filter(img => img.category === category).length;
              return (
                <StaggerItem key={category}>
                  <Button
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                  >
                    {category} ({count})
                  </Button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </FadeIn>

        {/* Gallery Table */}
        <FadeIn delay={0.4} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredImages.map((image, index) => (
                  <motion.tr
                    key={image.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <HoverScale className="flex-shrink-0 h-16 w-16">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </HoverScale>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {image.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {image.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {image.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {image.featured ? (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {image.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(image.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-1">
                        <Button
                          onClick={() => openModal('view', image)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          }
                        />
                        <Button
                          onClick={() => openModal('edit', image)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-900 hover:bg-green-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          }
                        />
                        <Button
                          onClick={() => openModal('delete', image)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          }
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada gambar</h3>
            <p className="text-gray-600">Belum ada gambar dalam kategori ini</p>
          </div>
        )}

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen && (modalMode === 'create' || modalMode === 'edit')}
          onClose={closeModal}
          title={modalMode === 'create' ? 'Upload Gambar Baru' : 'Edit Gambar'}
          size="lg"
        >
          <form onSubmit={onSubmit(handleFormSubmit)} className="space-y-6">
            <Input
              label="Judul"
              placeholder="Masukkan judul gambar"
              required
              error={formErrors.title?.message}
              {...register('title')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Gambar *
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fileError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fileError && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {fileError}
                  </p>
                )}

                {/* Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview:</label>
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl('');
                          setSelectedFile(null);
                          if (modalMode === 'edit') {
                            setPreviewUrl(selectedImage?.url || '');
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  Format yang didukung: JPG, PNG, GIF, WebP. Maksimal 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Kategori"
                placeholder="Pilih Kategori"
                options={categories}
                required
                error={formErrors.category?.message}
                {...register('category')}
              />

              <Input
                label="Uploaded By"
                placeholder="Nama uploader"
                required
                error={formErrors.uploadedBy?.message}
                {...register('uploadedBy')}
              />
            </div>

            <Textarea
              label="Deskripsi"
              placeholder="Deskripsi gambar"
              rows={4}
              required
              error={formErrors.description?.message}
              {...register('description')}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Jadikan gambar featured
              </label>
            </div>

            <Modal.Footer>
              <Button
                type="button"
                onClick={closeModal}
                variant="outline"
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {modalMode === 'create' ? 'Upload' : 'Update'}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={isModalOpen && modalMode === 'view'}
          onClose={closeModal}
          title="Detail Gambar"
          size="lg"
        >
          {selectedImage && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full h-auto rounded-lg mx-auto"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedImage.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>Kategori: {selectedImage.category}</span>
                  <span>Upload: {selectedImage.uploadedBy}</span>
                  <span>Tanggal: {new Date(selectedImage.date).toLocaleDateString('id-ID')}</span>
                  {selectedImage.featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">Featured</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Deskripsi:</h4>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
              
              <Modal.Footer>
                <Button
                  onClick={closeModal}
                  variant="secondary"
                >
                  Tutup
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={isModalOpen && modalMode === 'delete'}
          onClose={closeModal}
          title="Hapus Gambar"
          size="sm"
        >
          {selectedImage && (
            <div>
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Apakah Anda yakin ingin menghapus gambar ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <p className="text-sm font-medium text-gray-900 text-center mt-2">
                  "{selectedImage.title}"
                </p>
              </div>
              
              <Modal.Footer>
                <Button
                  onClick={closeModal}
                  variant="outline"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                >
                  Hapus
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
