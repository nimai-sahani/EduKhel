import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastOnline, setLastOnline] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setLastOnline(new Date());
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOffline, lastOnline };
};

export const useServiceWorker = () => {
  const [swRegistration, setSwRegistration] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          setSwRegistration(registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const updateServiceWorker = () => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  return { swRegistration, updateAvailable, updateServiceWorker };
};
