import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/admin/Modal';

// Validation schema
const newsSchema = yup.object().shape({
  title: yup
    .string()
    .required('Judul harus diisi')
    .min(5, 'Judul minimal 5 karakter')
    .max(200, 'Judul maksimal 200 karakter'),
  excerpt: yup
    .string()
    .required('Ringkasan harus diisi')
    .min(20, 'Ringkasan minimal 20 karakter')
    .max(300, 'Ringkasan maksimal 300 karakter'),
  content: yup
    .string()
    .required('Konten harus diisi')
    .min(50, 'Konten minimal 50 karakter')
    .max(5000, 'Konten maksimal 5000 karakter'),
  category: yup
    .string()
    .required('Kategori harus dipilih')
    .oneOf(['Prestasi', 'Akademik', 'Kegiatan', 'Pengumuman', 'Fasilitas'], 'Kategori tidak valid'),
  author: yup
    .string()
    .required('Penulis harus diisi')
    .min(2, 'Nama penulis minimal 2 karakter')
    .max(100, 'Nama penulis maksimal 100 karakter'),
  status: yup
    .string()
    .required('Status harus dipilih')
    .oneOf(['draft', 'published', 'archived'], 'Status tidak valid')
});

const NewsManagement = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Prestasi Gemilang Siswa SMA Negeri 1 Jakarta di Olimpiade Matematika Nasional',
      excerpt: 'Tim olimpiade matematika sekolah berhasil meraih juara 1 tingkat nasional setelah melalui seleksi ketat dari berbagai daerah di Indonesia.',
      content: 'Tim olimpiade matematika SMA Negeri 1 Jakarta berhasil meraih prestasi gemilang dengan meraih juara 1 pada Olimpiade Matematika Nasional 2024. Prestasi ini diraih setelah melalui berbagai tahap seleksi yang ketat mulai dari tingkat sekolah, kabupaten, provinsi, hingga nasional.',
      category: 'Prestasi',
      author: 'Admin Sekolah',
      date: '2024-12-15',
      status: 'published',
      views: 245
    },
    {
      id: 2,
      title: 'Pelaksanaan Ujian Tengah Semester Ganjil Tahun Ajaran 2024/2025',
      excerpt: 'Ujian Tengah Semester akan dilaksanakan mulai tanggal 20-25 Januari 2025 dengan protokol kesehatan yang ketat.',
      content: 'Sekolah mengumumkan jadwal pelaksanaan Ujian Tengah Semester Ganjil untuk semua tingkat kelas. Ujian akan berlangsung selama 6 hari dengan sistem shift untuk menghindari kepadatan.',
      category: 'Akademik',
      author: 'Wakil Kepala Sekolah',
      date: '2024-12-10',
      status: 'published',
      views: 189
    },
    {
      id: 3,
      title: 'Festival Seni dan Budaya Sekolah 2024 Sukses Digelar',
      excerpt: 'Acara tahunan Festival Seni dan Budaya berhasil menampilkan berbagai kreativitas siswa dalam bidang seni, musik, dan tari tradisional.',
      content: 'Festival Seni dan Budaya SMA Negeri 1 Jakarta tahun 2024 telah sukses digelar dengan antusiasme tinggi dari seluruh siswa.',
      category: 'Kegiatan',
      author: 'Koordinator Ekstrakurikuler',
      date: '2024-12-05',
      status: 'draft',
      views: 0
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view', 'delete'
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    status: 'draft'
  });
  const [errors, setErrors] = useState({});

  const categories = ['Prestasi', 'Akademik', 'Kegiatan', 'Pengumuman', 'Fasilitas'];

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      status: 'draft'
    });
    setErrors({});
  };

  const openModal = (mode, newsItem = null) => {
    setModalMode(mode);
    setSelectedNews(newsItem);
    
    if (mode === 'edit' && newsItem) {
      setFormData({
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        content: newsItem.content,
        category: newsItem.category,
        author: newsItem.author,
        status: newsItem.status
      });
    } else if (mode === 'create') {
      resetForm();
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Judul harus diisi';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Ringkasan harus diisi';
    if (!formData.content.trim()) newErrors.content = 'Konten harus diisi';
    if (!formData.category) newErrors.category = 'Kategori harus dipilih';
    if (!formData.author.trim()) newErrors.author = 'Penulis harus diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (modalMode === 'create') {
      const newNews = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setNews(prev => [newNews, ...prev]);
    } else if (modalMode === 'edit') {
      setNews(prev => prev.map(item => 
        item.id === selectedNews.id 
          ? { ...item, ...formData }
          : item
      ));
    }
    
    closeModal();
  };

  const handleDelete = () => {
    setNews(prev => prev.filter(item => item.id !== selectedNews.id));
    closeModal();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    return statusConfig[status] || statusConfig.draft;
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
            <p className="text-gray-600 mt-2">Kelola semua berita dan artikel sekolah</p>
          </div>
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Berita
          </button>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
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
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {item.excerpt}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Oleh: {item.author}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                        {item.status === 'published' ? 'Published' :
                         item.status === 'draft' ? 'Draft' : 'Archived'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal('view', item)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Lihat"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openModal('edit', item)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openModal('delete', item)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen && (modalMode === 'create' || modalMode === 'edit')}
          onClose={closeModal}
          title={modalMode === 'create' ? 'Tambah Berita Baru' : 'Edit Berita'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan judul berita"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penulis *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.author ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nama penulis"
                />
                {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author}</p>}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ringkasan *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ringkasan singkat berita"
              />
              {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tulis konten berita lengkap di sini..."
              />
              {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {modalMode === 'create' ? 'Simpan' : 'Update'}
              </button>
            </div>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={isModalOpen && modalMode === 'view'}
          onClose={closeModal}
          title="Detail Berita"
          size="lg"
        >
          {selectedNews && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedNews.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>Kategori: {selectedNews.category}</span>
                  <span>Penulis: {selectedNews.author}</span>
                  <span>Tanggal: {new Date(selectedNews.date).toLocaleDateString('id-ID')}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedNews.status)}`}>
                    {selectedNews.status}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ringkasan:</h4>
                <p className="text-gray-700">{selectedNews.excerpt}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Konten:</h4>
                <div className="text-gray-700 whitespace-pre-wrap">{selectedNews.content}</div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={isModalOpen && modalMode === 'delete'}
          onClose={closeModal}
          title="Hapus Berita"
          size="sm"
        >
          {selectedNews && (
            <div>
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <p className="text-sm font-medium text-gray-900 text-center mt-2">
                  "{selectedNews.title}"
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Hapus
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default NewsManagement;
