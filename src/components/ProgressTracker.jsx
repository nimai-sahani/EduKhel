import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  TrendingUp, 
  Award,
  X,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import gamificationService from '../services/gamificationService';

const ProgressTracker = ({ userId, userStats, onStatsUpdate }) => {
  const { t } = useTranslation();
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [newBadges, setNewBadges] = useState([]);
  const [newAchievements, setNewAchievements] = useState([]);
  const [levelInfo, setLevelInfo] = useState(null);

  useEffect(() => {
    if (userStats) {
      const level = gamificationService.calculateLevel(userStats.totalXP || 0);
      setLevelInfo(level);
    }
  }, [userStats]);

  const handleActivity = (activity) => {
    if (!userStats) return;

    // Calculate XP for the activity
    const xpEarned = gamificationService.calculateXP(activity);
    
    // Update user stats
    const updatedStats = {
      ...userStats,
      totalXP: (userStats.totalXP || 0) + xpEarned,
      totalQuizzes: (userStats.totalQuizzes || 0) + (activity.type === 'quiz_completed' ? 1 : 0),
      perfectScores: (userStats.perfectScores || 0) + (activity.score === 100 ? 1 : 0),
      currentStreak: activity.type === 'daily_login' ? (userStats.currentStreak || 0) + 1 : userStats.currentStreak || 0,
      lastActive: new Date().toISOString()
    };

    // Check for new badges
    const earnedBadges = gamificationService.checkBadgeEligibility(updatedStats, activity);
    if (earnedBadges.length > 0) {
      updatedStats.badges = [...(userStats.badges || []), ...earnedBadges.map(b => b.id)];
      setNewBadges(earnedBadges);
      setShowBadgeNotification(true);
    }

    // Check for new achievements
    const earnedAchievements = gamificationService.checkAchievementEligibility(updatedStats);
    if (earnedAchievements.length > 0) {
      updatedStats.achievements = [...(userStats.achievements || []), ...earnedAchievements.map(a => a.id)];
      setNewAchievements(earnedAchievements);
      setShowAchievementNotification(true);
    }

    // Update level info
    const newLevelInfo = gamificationService.calculateLevel(updatedStats.totalXP);
    setLevelInfo(newLevelInfo);

    // Notify parent component
    if (onStatsUpdate) {
      onStatsUpdate(updatedStats);
    }
  };

  const getBadgeCategories = () => {
    const categories = ['learning', 'consistency', 'skill', 'subject', 'time', 'motivation', 'social', 'excellence', 'exploration', 'dedication'];
    return categories.map(category => ({
      name: category,
      badges: gamificationService.getBadgesByCategory(category),
      earned: userStats?.badges ? gamificationService.getBadgesByCategory(category).filter(badge => 
        userStats.badges.includes(badge.id)
      ) : []
    }));
  };

  if (!userStats || !levelInfo) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-2 bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{t("level")} {levelInfo.current.level}</h3>
            <p className="text-purple-200">{levelInfo.current.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{userStats.totalXP || 0} XP</div>
            <div className="text-purple-200 text-sm">
              {levelInfo.next ? `${levelInfo.xpToNext} XP to next level` : 'Max level reached!'}
            </div>
          </div>
        </div>
        
        {levelInfo.next && (
          <div className="w-full bg-purple-800/30 rounded-full h-3 mb-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progressToNext}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        )}
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 text-center"
        >
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{userStats.badges?.length || 0}</div>
          <div className="text-gray-400 text-sm">{t("badges")}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 text-center"
        >
          <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{userStats.achievements?.length || 0}</div>
          <div className="text-gray-400 text-sm">{t("achievements")}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 text-center"
        >
          <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{userStats.totalQuizzes || 0}</div>
          <div className="text-gray-400 text-sm">{t("quizzes_completed")}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 text-center"
        >
          <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{userStats.currentStreak || 0}</div>
          <div className="text-gray-400 text-sm">{t("day_streak")}</div>
        </motion.div>
      </div>

      {/* Badges Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          {t("badges_collection")}
        </h3>
        
        <div className="space-y-4">
          {getBadgeCategories().map((category, index) => (
            <div key={category.name}>
              <h4 className="text-sm font-semibold text-gray-300 mb-2 capitalize">
                {category.name.replace('_', ' ')} ({category.earned.length}/{category.badges.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.badges.map((badge) => {
                  const isEarned = category.earned.some(earned => earned.id === badge.id);
                  return (
                    <motion.div
                      key={badge.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isEarned 
                          ? 'border-yellow-400 bg-yellow-400/10' 
                          : 'border-gray-600 bg-gray-700/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className={`text-xs font-medium ${isEarned ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {badge.name}
                      </div>
                      {isEarned && (
                        <CheckCircle className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badge Notification */}
      <AnimatePresence>
        {showBadgeNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-bold text-white">{t("new_badges_earned")}!</h4>
                <div className="text-sm text-yellow-100">
                  {newBadges.map(badge => badge.name).join(', ')}
                </div>
              </div>
              <button
                onClick={() => setShowBadgeNotification(false)}
                className="text-white hover:text-yellow-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievementNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-bold text-white">{t("achievement_unlocked")}!</h4>
                <div className="text-sm text-purple-100">
                  {newAchievements.map(achievement => achievement.name).join(', ')}
                </div>
              </div>
              <button
                onClick={() => setShowAchievementNotification(false)}
                className="text-white hover:text-purple-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressTracker;
