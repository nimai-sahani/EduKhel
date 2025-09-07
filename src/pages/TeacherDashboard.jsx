import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  BarChart3, 
  PieChart, 
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  Calendar,
  UserCheck,
  UserX,
  Activity,
  Zap,
  Brain,
  Gamepad2
} from "lucide-react";

const TeacherDashboard = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [timeRange, setTimeRange] = useState("week");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - In real app, this would come from API
  const [students] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      class: "6A",
      subject: "Mathematics",
      level: 5,
      xp: 1250,
      badges: 8,
      streak: 12,
      lastActive: "2 hours ago",
      progress: 85,
      status: "active",
      assignments: 12,
      completed: 10,
      averageScore: 88,
      attendance: 95
    },
    {
      id: 2,
      name: "Arjun Singh",
      class: "6A",
      subject: "Science",
      level: 4,
      xp: 980,
      badges: 6,
      streak: 8,
      lastActive: "1 day ago",
      progress: 72,
      status: "active",
      assignments: 12,
      completed: 8,
      averageScore: 82,
      attendance: 90
    },
    {
      id: 3,
      name: "Sneha Patel",
      class: "7B",
      subject: "Mathematics",
      level: 6,
      xp: 1580,
      badges: 12,
      streak: 15,
      lastActive: "30 minutes ago",
      progress: 92,
      status: "active",
      assignments: 15,
      completed: 14,
      averageScore: 94,
      attendance: 98
    },
    {
      id: 4,
      name: "Rahul Kumar",
      class: "7B",
      subject: "Science",
      level: 3,
      xp: 750,
      badges: 4,
      streak: 3,
      lastActive: "3 days ago",
      progress: 58,
      status: "inactive",
      assignments: 15,
      completed: 6,
      averageScore: 65,
      attendance: 75
    },
    {
      id: 5,
      name: "Ananya Das",
      class: "8A",
      subject: "Mathematics",
      level: 7,
      xp: 2100,
      badges: 15,
      streak: 20,
      lastActive: "1 hour ago",
      progress: 96,
      status: "active",
      assignments: 18,
      completed: 17,
      averageScore: 96,
      attendance: 100
    }
  ]);

  const [analytics] = useState({
    totalStudents: 45,
    activeStudents: 38,
    averageProgress: 78,
    totalXP: 45600,
    completedAssignments: 234,
    pendingAssignments: 18,
    topPerformer: "Ananya Das",
    mostImproved: "Arjun Singh",
    classPerformance: {
      "6A": 82,
      "6B": 75,
      "7A": 88,
      "7B": 79,
      "8A": 91,
      "8B": 84
    },
    subjectPerformance: {
      "Mathematics": 85,
      "Science": 78,
      "English": 82,
      "History": 76,
      "Geography": 80
    }
  });

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesSubject = selectedSubject === "all" || student.subject === selectedSubject;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "text-green-500";
      case "inactive": return "text-red-500";
      case "at_risk": return "text-yellow-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "inactive": return <XCircle className="w-4 h-4" />;
      case "at_risk": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: "overview", label: t("overview"), icon: BarChart3 },
    { id: "students", label: t("students"), icon: Users },
    { id: "assignments", label: t("assignments"), icon: BookOpen },
    { id: "analytics", label: t("analytics"), icon: TrendingUp },
    { id: "reports", label: t("reports"), icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-20">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              {t("Teacher Dashboard")} 📊
            </h1>
            <p className="text-gray-300 mt-2">
              {t("welcome")} - Track student progress and performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <RefreshCw className="w-4 h-4" />
              {t("refresh")}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/30">
        <div className="flex space-x-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">{t("total_students")}</p>
                    <p className="text-3xl font-bold">{analytics.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">{t("active_students")}</p>
                    <p className="text-3xl font-bold">{analytics.activeStudents}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">{t("average_progress")}</p>
                    <p className="text-3xl font-bold">{analytics.averageProgress}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">{t("total_xp")}</p>
                    <p className="text-3xl font-bold">{analytics.totalXP.toLocaleString()}</p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-200" />
                </div>
              </motion.div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t("class_performance")}
                </h3>
                <div className="space-y-4">
                  {Object.entries(analytics.classPerformance).map(([className, score]) => (
                    <div key={className}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{className}</span>
                        <span className="text-sm text-gray-400">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  {t("subject_performance")}
                </h3>
                <div className="space-y-4">
                  {Object.entries(analytics.subjectPerformance).map(([subject, score]) => (
                    <div key={subject}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{subject}</span>
                        <span className="text-sm text-gray-400">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                {t("top_performers")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 p-4 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{analytics.topPerformer}</p>
                      <p className="text-sm text-gray-400">1st Place</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-600/20 to-gray-700/20 p-4 rounded-lg border border-gray-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{analytics.mostImproved}</p>
                      <p className="text-sm text-gray-400">Most Improved</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Perfect Attendance</p>
                      <p className="text-sm text-gray-400">5 students</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedTab === "students" && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={t("search_students")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t("all_classes")}</option>
                  <option value="6A">6A</option>
                  <option value="6B">6B</option>
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                </select>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t("all_subjects")}</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("student")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("class")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("level")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("progress")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("status")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("last_active")}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">{t("actions")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-400">{student.subject}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                            {student.class}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{student.level}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-4 h-4" />
                              <span className="text-sm">{student.badges}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${getStatusColor(student.status)}`}>
                            {getStatusIcon(student.status)}
                            <span className="text-sm capitalize">{student.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {student.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-green-400 hover:text-green-300 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "assignments" && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">{t("assignments")}</h3>
              <p className="text-gray-400">Assignment management features coming soon...</p>
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">{t("analytics")}</h3>
              <p className="text-gray-400">Advanced analytics features coming soon...</p>
            </div>
          </div>
        )}

        {selectedTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">{t("reports")}</h3>
              <p className="text-gray-400">Report generation features coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
