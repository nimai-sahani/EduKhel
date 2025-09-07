// Gamification Service for Badges, Levels, and Achievements
class GamificationService {
  constructor() {
    this.badges = this.initializeBadges();
    this.achievements = this.initializeAchievements();
    this.levels = this.initializeLevels();
  }

  initializeBadges() {
    return {
      // Learning Badges
      'first_quiz': {
        id: 'first_quiz',
        name: 'First Steps',
        description: 'Complete your first quiz',
        icon: '🎯',
        color: '#FFD700',
        xp: 50,
        category: 'learning'
      },
      'quiz_master': {
        id: 'quiz_master',
        name: 'Quiz Master',
        description: 'Complete 10 quizzes',
        icon: '🧠',
        color: '#FF6B6B',
        xp: 200,
        category: 'learning'
      },
      'perfect_score': {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Get 100% on any quiz',
        icon: '⭐',
        color: '#4ECDC4',
        xp: 100,
        category: 'learning'
      },
      'streak_7': {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        color: '#FF9F43',
        xp: 150,
        category: 'consistency'
      },
      'streak_30': {
        id: 'streak_30',
        name: 'Month Master',
        description: 'Maintain a 30-day learning streak',
        icon: '💎',
        color: '#A55EEA',
        xp: 500,
        category: 'consistency'
      },
      'speed_demon': {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete a quiz in under 2 minutes',
        icon: '⚡',
        color: '#26DE81',
        xp: 75,
        category: 'skill'
      },
      'math_wizard': {
        id: 'math_wizard',
        name: 'Math Wizard',
        description: 'Complete 20 math quizzes',
        icon: '🔢',
        color: '#4834D4',
        xp: 300,
        category: 'subject'
      },
      'science_explorer': {
        id: 'science_explorer',
        name: 'Science Explorer',
        description: 'Complete 20 science quizzes',
        icon: '🔬',
        color: '#00D2D3',
        xp: 300,
        category: 'subject'
      },
      'early_bird': {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Complete a quiz before 8 AM',
        icon: '🐦',
        color: '#FFA502',
        xp: 25,
        category: 'time'
      },
      'night_owl': {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Complete a quiz after 10 PM',
        icon: '🦉',
        color: '#2C2C54',
        xp: 25,
        category: 'time'
      },
      'comeback_kid': {
        id: 'comeback_kid',
        name: 'Comeback Kid',
        description: 'Return after 7 days of inactivity',
        icon: '🔄',
        color: '#FF6348',
        xp: 100,
        category: 'motivation'
      },
      'helpful_hand': {
        id: 'helpful_hand',
        name: 'Helpful Hand',
        description: 'Help 5 classmates with their studies',
        icon: '🤝',
        color: '#2ED573',
        xp: 200,
        category: 'social'
      },
      'perfectionist': {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Get 100% on 5 different quizzes',
        icon: '💯',
        color: '#FFD700',
        xp: 400,
        category: 'excellence'
      },
      'explorer': {
        id: 'explorer',
        name: 'Explorer',
        description: 'Try all available subjects',
        icon: '🗺️',
        color: '#3742FA',
        xp: 250,
        category: 'exploration'
      },
      'dedicated_learner': {
        id: 'dedicated_learner',
        name: 'Dedicated Learner',
        description: 'Study for 100 hours total',
        icon: '📚',
        color: '#2F3542',
        xp: 1000,
        category: 'dedication'
      }
    };
  }

  initializeAchievements() {
    return {
      'bronze_learner': {
        id: 'bronze_learner',
        name: 'Bronze Learner',
        description: 'Earn 500 XP',
        icon: '🥉',
        color: '#CD7F32',
        xp: 0,
        requirement: { type: 'xp', value: 500 },
        category: 'milestone'
      },
      'silver_learner': {
        id: 'silver_learner',
        name: 'Silver Learner',
        description: 'Earn 1500 XP',
        icon: '🥈',
        color: '#C0C0C0',
        xp: 0,
        requirement: { type: 'xp', value: 1500 },
        category: 'milestone'
      },
      'gold_learner': {
        id: 'gold_learner',
        name: 'Gold Learner',
        description: 'Earn 3000 XP',
        icon: '🥇',
        color: '#FFD700',
        xp: 0,
        requirement: { type: 'xp', value: 3000 },
        category: 'milestone'
      },
      'platinum_learner': {
        id: 'platinum_learner',
        name: 'Platinum Learner',
        description: 'Earn 5000 XP',
        icon: '💎',
        color: '#E5E4E2',
        xp: 0,
        requirement: { type: 'xp', value: 5000 },
        category: 'milestone'
      },
      'diamond_learner': {
        id: 'diamond_learner',
        name: 'Diamond Learner',
        description: 'Earn 10000 XP',
        icon: '💠',
        color: '#B9F2FF',
        xp: 0,
        requirement: { type: 'xp', value: 10000 },
        category: 'milestone'
      }
    };
  }

  initializeLevels() {
    return [
      { level: 1, xpRequired: 0, name: 'Beginner', color: '#95A5A6' },
      { level: 2, xpRequired: 100, name: 'Novice', color: '#3498DB' },
      { level: 3, xpRequired: 250, name: 'Apprentice', color: '#2ECC71' },
      { level: 4, xpRequired: 500, name: 'Student', color: '#F39C12' },
      { level: 5, xpRequired: 750, name: 'Learner', color: '#E67E22' },
      { level: 6, xpRequired: 1000, name: 'Scholar', color: '#E74C3C' },
      { level: 7, xpRequired: 1500, name: 'Expert', color: '#9B59B6' },
      { level: 8, xpRequired: 2000, name: 'Master', color: '#1ABC9C' },
      { level: 9, xpRequired: 3000, name: 'Grandmaster', color: '#F1C40F' },
      { level: 10, xpRequired: 5000, name: 'Legend', color: '#E91E63' },
      { level: 11, xpRequired: 7500, name: 'Mythic', color: '#673AB7' },
      { level: 12, xpRequired: 10000, name: 'Transcendent', color: '#FF5722' },
      { level: 13, xpRequired: 15000, name: 'Celestial', color: '#00BCD4' },
      { level: 14, xpRequired: 20000, name: 'Divine', color: '#4CAF50' },
      { level: 15, xpRequired: 30000, name: 'Omnipotent', color: '#FF9800' }
    ];
  }

  // Calculate user's current level based on XP
  calculateLevel(totalXP) {
    const levels = this.levels;
    let currentLevel = levels[0];
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalXP >= levels[i].xpRequired) {
        currentLevel = levels[i];
        break;
      }
    }
    
    const nextLevel = levels.find(level => level.level === currentLevel.level + 1);
    const xpToNext = nextLevel ? nextLevel.xpRequired - totalXP : 0;
    const progressToNext = nextLevel ? ((totalXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100 : 100;
    
    return {
      current: currentLevel,
      next: nextLevel,
      xpToNext,
      progressToNext: Math.min(progressToNext, 100)
    };
  }

  // Check if user earns any badges
  checkBadgeEligibility(userStats, newActivity) {
    const earnedBadges = [];
    
    // Check each badge
    Object.values(this.badges).forEach(badge => {
      if (this.isBadgeEarned(badge, userStats, newActivity)) {
        earnedBadges.push(badge);
      }
    });
    
    return earnedBadges;
  }

  isBadgeEarned(badge, userStats, newActivity) {
    // Check if user already has this badge
    if (userStats.badges && userStats.badges.includes(badge.id)) {
      return false;
    }
    
    switch (badge.id) {
      case 'first_quiz':
        return newActivity.type === 'quiz_completed' && userStats.totalQuizzes === 1;
      
      case 'quiz_master':
        return newActivity.type === 'quiz_completed' && userStats.totalQuizzes >= 10;
      
      case 'perfect_score':
        return newActivity.type === 'quiz_completed' && newActivity.score === 100;
      
      case 'streak_7':
        return userStats.currentStreak >= 7;
      
      case 'streak_30':
        return userStats.currentStreak >= 30;
      
      case 'speed_demon':
        return newActivity.type === 'quiz_completed' && newActivity.timeTaken < 120; // 2 minutes
      
      case 'math_wizard':
        return userStats.subjectQuizzes && userStats.subjectQuizzes.Mathematics >= 20;
      
      case 'science_explorer':
        return userStats.subjectQuizzes && userStats.subjectQuizzes.Science >= 20;
      
      case 'early_bird':
        return newActivity.type === 'quiz_completed' && new Date().getHours() < 8;
      
      case 'night_owl':
        return newActivity.type === 'quiz_completed' && new Date().getHours() >= 22;
      
      case 'comeback_kid':
        return userStats.lastActive && this.getDaysDifference(userStats.lastActive, new Date()) >= 7;
      
      case 'perfectionist':
        return userStats.perfectScores >= 5;
      
      case 'explorer':
        return userStats.subjectsTried && Object.keys(userStats.subjectsTried).length >= 5;
      
      case 'dedicated_learner':
        return userStats.totalStudyTime >= 360000; // 100 hours in minutes
      
      default:
        return false;
    }
  }

  // Check if user earns any achievements
  checkAchievementEligibility(userStats) {
    const earnedAchievements = [];
    
    Object.values(this.achievements).forEach(achievement => {
      if (this.isAchievementEarned(achievement, userStats)) {
        earnedAchievements.push(achievement);
      }
    });
    
    return earnedAchievements;
  }

  isAchievementEarned(achievement, userStats) {
    // Check if user already has this achievement
    if (userStats.achievements && userStats.achievements.includes(achievement.id)) {
      return false;
    }
    
    switch (achievement.requirement.type) {
      case 'xp':
        return userStats.totalXP >= achievement.requirement.value;
      
      default:
        return false;
    }
  }

  // Calculate XP for different activities
  calculateXP(activity) {
    let baseXP = 0;
    
    switch (activity.type) {
      case 'quiz_completed':
        baseXP = 10; // Base XP for completing quiz
        baseXP += Math.floor(activity.score / 10); // Bonus for score
        if (activity.score === 100) baseXP += 20; // Perfect score bonus
        if (activity.timeTaken < 300) baseXP += 10; // Speed bonus
        break;
      
      case 'lesson_completed':
        baseXP = 15;
        break;
      
      case 'daily_login':
        baseXP = 5;
        break;
      
      case 'streak_milestone':
        baseXP = activity.streak * 2;
        break;
      
      default:
        baseXP = 5;
    }
    
    return baseXP;
  }

  // Get days difference between two dates
  getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date2 - date1) / oneDay));
  }

  // Get all badges by category
  getBadgesByCategory(category) {
    return Object.values(this.badges).filter(badge => badge.category === category);
  }

  // Get all achievements
  getAllAchievements() {
    return Object.values(this.achievements);
  }

  // Get all levels
  getAllLevels() {
    return this.levels;
  }

  // Get badge by ID
  getBadgeById(badgeId) {
    return this.badges[badgeId];
  }

  // Get achievement by ID
  getAchievementById(achievementId) {
    return this.achievements[achievementId];
  }

  // Get level by number
  getLevelByNumber(levelNumber) {
    return this.levels.find(level => level.level === levelNumber);
  }
}

// Create singleton instance
const gamificationService = new GamificationService();

export default gamificationService;
