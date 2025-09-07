import { motion, AnimatePresence } from 'framer-motion';
import { useOffline, useServiceWorker } from '../hooks/useOffline';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, Download, RefreshCw, CheckCircle } from 'lucide-react';

const OfflineIndicator = () => {
  const { t } = useTranslation();
  const { isOffline, lastOnline } = useOffline();
  const { updateAvailable, updateServiceWorker } = useServiceWorker();

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-3 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <WifiOff className="w-5 h-5" />
              <span className="font-semibold">{t("no_internet")}</span>
              <span className="text-red-200 ml-2">
                {t("last_synced")}: {lastOnline.toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Banner */}
      <AnimatePresence>
        {updateAvailable && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-3"
          >
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="font-semibold">{t("update_available")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={updateServiceWorker}
                  className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t("install_update")}
                </button>
                <button
                  onClick={() => setUpdateAvailable(false)}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Mode Indicator */}
      {isOffline && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-600 rounded-xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-white font-semibold text-sm">{t("offline_mode")}</p>
                <p className="text-gray-300 text-xs">{t("sync_when_online")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default OfflineIndicator;
