import React from 'react';
import { useSchoolSettings } from '../hooks/useSchoolSettings';
import { Link } from 'react-router-dom';

const Home = () => {
  const { settings, loading } = useSchoolSettings();
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Text Content - Left Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {loading ? 'Loading...' : `Selamat Datang di ${settings.schoolName}`}
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 font-semibold mb-4">
              {loading ? 'Loading...' : settings.schoolMotto}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {loading ? 'Loading...' : settings.schoolDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/students" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 text-center">
                Mulai Sekarang
              </Link>
              <Link to="/about" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition duration-300 text-center">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* Image/Illustration - Right Side */}
          <div className="bg-blue-50 p-8 lg:p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border-4 border-blue-200">
                {!loading && settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={`Logo ${settings.schoolShortName}`}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <svg
                  className="w-16 h-16 lg:w-20 lg:h-20 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ display: !loading && settings.logoUrl ? 'none' : 'block' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {loading ? 'Loading...' : settings.schoolShortName}
              </h3>
              <p className="text-gray-600">Transformasi digital untuk pendidikan yang lebih baik</p>
            </div>
          </div>
        </div>
      </div>


      {/* Principal's Message Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {loading ? 'Loading...' : settings.principalName}
              </h3>
              <p className="text-blue-100">Kepala Sekolah</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sambutan Kepala Sekolah</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Selamat datang di sistem informasi sekolah kami. Dengan bangga kami persembahkan
              platform digital yang memudahkan seluruh civitas akademika dalam mengakses informasi
              dan mengelola data sekolah.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Melalui sistem ini, kami berkomitmen untuk memberikan pelayanan terbaik dalam
              bidang pendidikan dengan memanfaatkan teknologi modern yang efisien dan user-friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                Lihat Profil Lengkap
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition duration-300">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* School Profile Section */}
      <div className="bg-blue-600 rounded-lg shadow-md p-8 mb-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Profil Sekolah</h2>
            <p className="text-lg mb-4 opacity-90">
              SMA Negeri 1 Jakarta adalah institusi pendidikan yang telah berdiri sejak tahun 2010
              dan telah menghasilkan ribuan alumni yang sukses di berbagai bidang.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Akreditasi A
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Fasilitas Lengkap
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tenaga Pengajar Berkualitas
              </li>
            </ul>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Selengkapnya
            </button>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gedung Modern</h3>
              <p className="opacity-90">Fasilitas pembelajaran yang nyaman dan modern</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Statistik Sekolah</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
            <div className="text-gray-600">Total Siswa</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89</div>
            <div className="text-gray-600">Guru</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
            <div className="text-gray-600">Kelas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
            <div className="text-gray-600">Tahun Berdiri</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
