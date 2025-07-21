import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button, Card, Input, Textarea, Select, Modal } from '../../components/ui';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '../../components/ui/AnimatedComponents';

// Validation schema
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nama harus diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  phone: yup
    .string()
    .required('Nomor WhatsApp harus diisi')
    .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Format nomor WhatsApp tidak valid'),
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email harus diisi'),
  subject: yup
    .string()
    .required('Subjek harus diisi')
    .min(5, 'Subjek minimal 5 karakter')
    .max(200, 'Subjek maksimal 200 karakter'),
  message: yup
    .string()
    .required('Pesan harus diisi')
    .min(10, 'Pesan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
  category: yup
    .string()
    .required('Kategori harus dipilih')
    .oneOf(['Pendaftaran', 'Akademik', 'Administrasi', 'Fasilitas', 'Ekstrakurikuler', 'Lainnya'], 'Kategori tidak valid'),
  priority: yup
    .string()
    .required('Prioritas harus dipilih')
    .oneOf(['Rendah', 'Sedang', 'Tinggi', 'Urgent'], 'Prioritas tidak valid')
});

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Ahmad Rizki',
      phone: '081234567890',
      email: 'ahmad.rizki@email.com',
      subject: 'Informasi Pendaftaran Siswa Baru',
      message: 'Saya ingin menanyakan tentang syarat dan jadwal pendaftaran siswa baru untuk tahun ajaran 2024/2025.',
      category: 'Pendaftaran',
      priority: 'Tinggi',
      status: 'Pending',
      date: '2024-01-15',
      time: '10:30'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      phone: '082345678901',
      email: 'siti.nurhaliza@email.com',
      subject: 'Konsultasi Nilai Rapor',
      message: 'Mohon bantuan untuk konsultasi mengenai nilai rapor anak saya yang mengalami penurunan di semester ini.',
      category: 'Akademik',
      priority: 'Sedang',
      status: 'Responded',
      date: '2024-01-14',
      time: '14:15'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      phone: '083456789012',
      email: 'budi.santoso@email.com',
      subject: 'Pembayaran SPP',
      message: 'Saya ingin menanyakan tentang cara pembayaran SPP online dan jadwal pembayaran untuk bulan ini.',
      category: 'Administrasi',
      priority: 'Rendah',
      status: 'Resolved',
      date: '2024-01-13',
      time: '09:45'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['Pendaftaran', 'Akademik', 'Administrasi', 'Fasilitas', 'Ekstrakurikuler', 'Lainnya'];
  const priorities = ['Rendah', 'Sedang', 'Tinggi', 'Urgent'];
  const statuses = ['Pending', 'Responded', 'Resolved'];

  // React Hook Form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors: formErrors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      category: '',
      priority: ''
    }
  });

  const resetForm = () => {
    reset({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      category: '',
      priority: ''
    });
  };

  const openModal = (mode, contact = null) => {
    setModalMode(mode);
    setSelectedContact(contact);
    
    if (mode === 'edit' && contact) {
      setValue('name', contact.name);
      setValue('phone', contact.phone);
      setValue('email', contact.email);
      setValue('subject', contact.subject);
      setValue('message', contact.message);
      setValue('category', contact.category);
      setValue('priority', contact.priority);
    } else if (mode === 'create') {
      resetForm();
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    resetForm();
  };

  // Form submit handler
  const handleFormSubmit = async (data) => {
    if (modalMode === 'create') {
      const newContact = {
        id: Date.now(),
        ...data,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setContacts(prev => [newContact, ...prev]);
    } else if (modalMode === 'edit') {
      setContacts(prev => prev.map(item => 
        item.id === selectedContact.id 
          ? { ...item, ...data }
          : item
      ));
    }
    
    closeModal();
  };

  const handleDelete = () => {
    setContacts(prev => prev.filter(item => item.id !== selectedContact.id));
    closeModal();
  };

  const handleSendWhatsApp = (contact) => {
    const phoneNumber = contact.phone.replace(/^0/, '62'); // Convert to international format
    const message = `Halo ${contact.name},

Terima kasih telah menghubungi SMA Negeri 1 Jakarta.

*Subjek:* ${contact.subject}
*Kategori:* ${contact.category}
*Prioritas:* ${contact.priority}

Kami telah menerima pesan Anda:
"${contact.message}"

Tim kami akan segera merespons pertanyaan Anda. Jika ada yang mendesak, silakan hubungi langsung ke nomor sekolah.

Terima kasih,
Admin SMA Negeri 1 Jakarta`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const updateStatus = (contactId, newStatus) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, status: newStatus }
        : contact
    ));
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Responded': 'bg-blue-100 text-blue-800',
      'Resolved': 'bg-green-100 text-green-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'Rendah': 'bg-gray-100 text-gray-800',
      'Sedang': 'bg-blue-100 text-blue-800',
      'Tinggi': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return badges[priority] || 'bg-gray-100 text-gray-800';
  };

  const filteredContacts = selectedStatus === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === selectedStatus);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <FadeIn direction="down" className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Kontak WhatsApp</h1>
            <p className="text-gray-600 mt-2">Kelola pesan kontak siswa dan kirim balasan via WhatsApp</p>
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
            Tambah Kontak
          </Button>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={0.2} className="mb-6">
          <StaggerContainer className="flex flex-wrap gap-2">
            <StaggerItem>
              <Button
                onClick={() => setSelectedStatus('all')}
                variant={selectedStatus === 'all' ? 'primary' : 'outline'}
                size="sm"
              >
                Semua ({contacts.length})
              </Button>
            </StaggerItem>
            {statuses.map((status) => {
              const count = contacts.filter(contact => contact.status === status).length;
              return (
                <StaggerItem key={status}>
                  <Button
                    onClick={() => setSelectedStatus(status)}
                    variant={selectedStatus === status ? 'primary' : 'outline'}
                    size="sm"
                  >
                    {status} ({count})
                  </Button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </FadeIn>

        {/* Contact Table */}
        <FadeIn delay={0.4} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjek & Pesan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioritas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {filteredContacts.map((contact, index) => (
                  <motion.tr 
                    key={contact.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          📱 {contact.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          ✉️ {contact.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {contact.message}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {contact.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusBadge(contact.status)}`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{new Date(contact.date).toLocaleDateString('id-ID')}</div>
                      <div className="text-xs text-gray-500">{contact.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-1">
                        <Button
                          onClick={() => handleSendWhatsApp(contact)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-900 hover:bg-green-50"
                          icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                            </svg>
                          }
                          title="Kirim WhatsApp"
                        />
                        <Button
                          onClick={() => openModal('view', contact)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          }
                          title="Lihat Detail"
                        />
                        <Button
                          onClick={() => openModal('edit', contact)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-900 hover:bg-green-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          }
                          title="Edit"
                        />
                        <Button
                          onClick={() => openModal('delete', contact)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          }
                          title="Hapus"
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalMode === 'create' ? 'Tambah Kontak Baru' :
            modalMode === 'edit' ? 'Edit Kontak' :
            modalMode === 'view' ? 'Detail Kontak' : 'Hapus Kontak'
          }
          size={modalMode === 'view' ? 'lg' : 'md'}
        >
          {modalMode === 'delete' ? (
            <div>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus kontak dari <strong>{selectedContact?.name}</strong>?
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <Modal.Footer>
                <Button onClick={closeModal} variant="outline">
                  Batal
                </Button>
                <Button onClick={handleDelete} variant="danger">
                  Hapus
                </Button>
              </Modal.Footer>
            </div>
          ) : modalMode === 'view' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama:</label>
                  <p className="text-gray-900">{selectedContact?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp:</label>
                  <p className="text-gray-900">{selectedContact?.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <p className="text-gray-900">{selectedContact?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori:</label>
                  <p className="text-gray-900">{selectedContact?.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prioritas:</label>
                  <p className="text-gray-900">{selectedContact?.priority}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status:</label>
                  <p className="text-gray-900">{selectedContact?.status}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subjek:</label>
                <p className="text-gray-900">{selectedContact?.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pesan:</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact?.message}</p>
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  onClick={() => handleSendWhatsApp(selectedContact)}
                  variant="success"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                    </svg>
                  }
                >
                  Kirim WhatsApp
                </Button>
                <Button onClick={closeModal} variant="secondary">
                  Tutup
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  required
                  error={formErrors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Nomor WhatsApp"
                  placeholder="081234567890"
                  required
                  error={formErrors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                required
                error={formErrors.email?.message}
                {...register('email')}
              />

              <Input
                label="Subjek"
                placeholder="Masukkan subjek pesan"
                required
                error={formErrors.subject?.message}
                {...register('subject')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Kategori"
                  placeholder="Pilih Kategori"
                  options={categories}
                  required
                  error={formErrors.category?.message}
                  {...register('category')}
                />

                <Select
                  label="Prioritas"
                  placeholder="Pilih Prioritas"
                  options={priorities}
                  required
                  error={formErrors.priority?.message}
                  {...register('priority')}
                />
              </div>

              <Textarea
                label="Pesan"
                placeholder="Tulis pesan Anda di sini..."
                rows={4}
                required
                error={formErrors.message?.message}
                {...register('message')}
              />

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
                  {modalMode === 'create' ? 'Tambah Kontak' : 'Update Kontak'}
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ContactManagement;
