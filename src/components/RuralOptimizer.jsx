import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Wifi, 
  Battery, 
  Cpu, 
  HardDrive, 
  Monitor,
  Smartphone,
  WifiOff,
  BatteryLow,
  AlertTriangle,
  CheckCircle,
  Zap,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

const RuralOptimizer = () => {
  const { t } = useTranslation();
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [optimizationSettings, setOptimizationSettings] = useState({
    lowDataMode: false,
    reducedAnimations: false,
    compressedImages: false,
    offlineMode: false,
    batterySaver: false,
    lowResolution: false,
    disableParticles: false,
    simpleUI: false
  });
  const [performanceScore, setPerformanceScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    detectDeviceCapabilities();
    loadOptimizationSettings();
  }, []);

  useEffect(() => {
    calculatePerformanceScore();
    generateRecommendations();
  }, [deviceInfo, optimizationSettings]);

  const detectDeviceCapabilities = () => {
    const info = {
      // Memory detection
      memory: navigator.deviceMemory || 'Unknown',
      
      // CPU cores
      cores: navigator.hardwareConcurrency || 'Unknown',
      
      // Connection type
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      } : null,
      
      // Screen resolution
      screen: {
        width: screen.width,
        height: screen.height,
        pixelRatio: window.devicePixelRatio
      },
      
      // User agent info
      userAgent: navigator.userAgent,
      
      // Battery API (if available)
      battery: null,
      
      // Device type detection
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isLowEnd: false
    };

    // Detect if it's a low-end device
    if (info.memory && info.memory <= 2) {
      info.isLowEnd = true;
    }
    
    if (info.cores && info.cores <= 2) {
      info.isLowEnd = true;
    }

    // Battery API
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        info.battery = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
        setDeviceInfo({ ...info, battery: info.battery });
      });
    } else {
      setDeviceInfo(info);
    }
  };

  const loadOptimizationSettings = () => {
    const saved = localStorage.getItem('ruralOptimizationSettings');
    if (saved) {
      setOptimizationSettings(JSON.parse(saved));
    }
  };

  const saveOptimizationSettings = (newSettings) => {
    setOptimizationSettings(newSettings);
    localStorage.setItem('ruralOptimizationSettings', JSON.stringify(newSettings));
    applyOptimizations(newSettings);
  };

  const applyOptimizations = (settings) => {
    // Apply CSS optimizations
    const root = document.documentElement;
    
    if (settings.reducedAnimations) {
      root.style.setProperty('--animation-duration', '0.1s');
      root.style.setProperty('--transition-duration', '0.1s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    if (settings.simpleUI) {
      document.body.classList.add('simple-ui');
    } else {
      document.body.classList.remove('simple-ui');
    }

    // Disable particles if needed
    const particles = document.getElementById('tsparticles');
    if (particles) {
      particles.style.display = settings.disableParticles ? 'none' : 'block';
    }
  };

  const calculatePerformanceScore = () => {
    if (!deviceInfo) return;

    let score = 100;
    
    // Memory penalty
    if (deviceInfo.memory && deviceInfo.memory <= 2) score -= 30;
    else if (deviceInfo.memory && deviceInfo.memory <= 4) score -= 15;
    
    // CPU penalty
    if (deviceInfo.cores && deviceInfo.cores <= 2) score -= 25;
    else if (deviceInfo.cores && deviceInfo.cores <= 4) score -= 10;
    
    // Connection penalty
    if (deviceInfo.connection) {
      if (deviceInfo.connection.effectiveType === 'slow-2g') score -= 40;
      else if (deviceInfo.connection.effectiveType === '2g') score -= 30;
      else if (deviceInfo.connection.effectiveType === '3g') score -= 15;
    }
    
    // Battery penalty
    if (deviceInfo.battery && deviceInfo.battery.level < 0.2) score -= 20;
    
    // Screen resolution penalty
    if (deviceInfo.screen.width < 768) score -= 10;
    
    setPerformanceScore(Math.max(0, score));
  };

  const generateRecommendations = () => {
    const recs = [];
    
    if (deviceInfo?.memory && deviceInfo.memory <= 2) {
      recs.push({
        type: 'warning',
        icon: Cpu,
        title: t('low_memory_detected'),
        description: t('low_memory_description'),
        action: () => enableLowMemoryMode()
      });
    }
    
    if (deviceInfo?.connection?.effectiveType === 'slow-2g' || deviceInfo?.connection?.effectiveType === '2g') {
      recs.push({
        type: 'warning',
        icon: WifiOff,
        title: t('slow_connection_detected'),
        description: t('slow_connection_description'),
        action: () => enableLowDataMode()
      });
    }
    
    if (deviceInfo?.battery && deviceInfo.battery.level < 0.2) {
      recs.push({
        type: 'warning',
        icon: BatteryLow,
        title: t('low_battery_detected'),
        description: t('low_battery_description'),
        action: () => enableBatterySaver()
      });
    }
    
    if (deviceInfo?.isLowEnd) {
      recs.push({
        type: 'info',
        icon: Smartphone,
        title: t('low_end_device_detected'),
        description: t('low_end_device_description'),
        action: () => enablePerformanceMode()
      });
    }
    
    setRecommendations(recs);
  };

  const enableLowMemoryMode = () => {
    saveOptimizationSettings({
      ...optimizationSettings,
      reducedAnimations: true,
      compressedImages: true,
      disableParticles: true,
      simpleUI: true
    });
  };

  const enableLowDataMode = () => {
    saveOptimizationSettings({
      ...optimizationSettings,
      lowDataMode: true,
      compressedImages: true,
      offlineMode: true
    });
  };

  const enableBatterySaver = () => {
    saveOptimizationSettings({
      ...optimizationSettings,
      batterySaver: true,
      reducedAnimations: true,
      disableParticles: true
    });
  };

  const enablePerformanceMode = () => {
    saveOptimizationSettings({
      ...optimizationSettings,
      reducedAnimations: true,
      compressedImages: true,
      disableParticles: true,
      simpleUI: true,
      lowResolution: true
    });
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPerformanceStatus = (score) => {
    if (score >= 80) return t('excellent');
    if (score >= 60) return t('good');
    if (score >= 40) return t('fair');
    return t('poor');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">{t('rural_optimization')}</h3>
      </div>

      {/* Performance Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">{t('performance_score')}</span>
          <span className={`text-2xl font-bold ${getPerformanceColor(performanceScore)}`}>
            {performanceScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              performanceScore >= 80 ? 'bg-green-500' :
              performanceScore >= 60 ? 'bg-yellow-500' :
              performanceScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${performanceScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {getPerformanceStatus(performanceScore)} - {t('optimized_for_rural_areas')}
        </p>
      </div>

      {/* Device Info */}
      {deviceInfo && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/30 p-3 rounded-lg text-center">
            <Cpu className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-sm text-gray-300">{t('memory')}</div>
            <div className="text-lg font-semibold text-white">
              {deviceInfo.memory ? `${deviceInfo.memory}GB` : 'Unknown'}
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-3 rounded-lg text-center">
            <Monitor className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-sm text-gray-300">{t('cores')}</div>
            <div className="text-lg font-semibold text-white">
              {deviceInfo.cores || 'Unknown'}
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-3 rounded-lg text-center">
            <Wifi className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-sm text-gray-300">{t('connection')}</div>
            <div className="text-lg font-semibold text-white">
              {deviceInfo.connection?.effectiveType || 'Unknown'}
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-3 rounded-lg text-center">
            <Battery className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <div className="text-sm text-gray-300">{t('battery')}</div>
            <div className="text-lg font-semibold text-white">
              {deviceInfo.battery ? `${Math.round(deviceInfo.battery.level * 100)}%` : 'Unknown'}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">{t('recommendations')}</h4>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.type === 'warning' ? 'border-red-400 bg-red-900/20' :
                  rec.type === 'info' ? 'border-blue-400 bg-blue-900/20' :
                  'border-green-400 bg-green-900/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <rec.icon className={`w-5 h-5 mt-0.5 ${
                    rec.type === 'warning' ? 'text-red-400' :
                    rec.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`} />
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{rec.title}</h5>
                    <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                    <button
                      onClick={rec.action}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t('apply_fix')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Settings */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">{t('optimization_settings')}</h4>
        <div className="space-y-3">
          {Object.entries(optimizationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                {key === 'lowDataMode' && <WifiOff className="w-5 h-5 text-blue-400" />}
                {key === 'reducedAnimations' && <Zap className="w-5 h-5 text-yellow-400" />}
                {key === 'compressedImages' && <Download className="w-5 h-5 text-green-400" />}
                {key === 'offlineMode' && <WifiOff className="w-5 h-5 text-purple-400" />}
                {key === 'batterySaver' && <BatteryLow className="w-5 h-5 text-orange-400" />}
                {key === 'lowResolution' && <Monitor className="w-5 h-5 text-red-400" />}
                {key === 'disableParticles' && <EyeOff className="w-5 h-5 text-gray-400" />}
                {key === 'simpleUI' && <Settings className="w-5 h-5 text-pink-400" />}
                
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
              </div>
              
              <button
                onClick={() => saveOptimizationSettings({
                  ...optimizationSettings,
                  [key]: !value
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-3">{t('quick_actions')}</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => saveOptimizationSettings({
              lowDataMode: true,
              reducedAnimations: true,
              compressedImages: true,
              offlineMode: true,
              batterySaver: false,
              lowResolution: false,
              disableParticles: false,
              simpleUI: false
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            {t('optimize_for_slow_connection')}
          </button>
          
          <button
            onClick={() => saveOptimizationSettings({
              lowDataMode: false,
              reducedAnimations: true,
              compressedImages: true,
              offlineMode: false,
              batterySaver: true,
              lowResolution: true,
              disableParticles: true,
              simpleUI: true
            })}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            {t('optimize_for_battery')}
          </button>
          
          <button
            onClick={() => saveOptimizationSettings({
              lowDataMode: false,
              reducedAnimations: false,
              compressedImages: false,
              offlineMode: false,
              batterySaver: false,
              lowResolution: false,
              disableParticles: false,
              simpleUI: false
            })}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            {t('reset_to_default')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuralOptimizer;
