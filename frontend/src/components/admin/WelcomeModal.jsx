import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const WelcomeModal = ({ isOpen, onClose, userRole = 'Admin', userName = 'Administrator' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Handle fade in/out animation and auto close
  useEffect(() => {
    if (isOpen) {
      // Fade in
      setIsVisible(true);
      setCountdown(5);

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for fade out animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const getRoleDisplayName = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Administrator';
      case 'superadmin':
        return 'Super Administrator';
      case 'moderator':
        return 'Moderator';
      default:
        return 'Administrator';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${
              isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
          />

          {/* Modal */}
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Success Icon */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Selamat Datang!
              </h3>

              {/* Welcome Message */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Login berhasil sebagai
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {getRoleDisplayName(userRole)}
                </p>
                {userName && userName !== 'Administrator' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Halo, {userName}
                  </p>
                )}
              </div>

              {/* Success Message */}
              <p className="text-sm text-gray-600 text-center mb-6">
                Anda berhasil masuk ke sistem administrasi. Selamat bekerja!
              </p>

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Mulai Bekerja
                </button>
              </div>

              {/* Auto close indicator with countdown */}
              <div className="mt-4 text-center">
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                  <div
                    className="bg-green-600 h-1 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">
                  Modal akan tertutup otomatis dalam <span className="font-semibold text-gray-600">{countdown}</span> detik
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Klik di mana saja untuk menutup
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
