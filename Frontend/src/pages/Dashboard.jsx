import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  Bookmark,
  FileText,
  Clock,
  Edit,
  Trash2,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Target,
  Award,
  Bell
} from "lucide-react";
import { authAPI, profileAPI, applicationAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);

  // ✅ FIXED: Real stats calculated from actual data
  const [stats, setStats] = useState({
    savedSchemes: 0,
    appliedSchemes: 0,
    approvedSchemes: 0,
    underReview: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ FIXED: Fetch real data from backend
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch user data
      const userRes = await authAPI.getProfile();
      setUser(userRes.data);

      // Fetch profile data
      try {
        const profileRes = await profileAPI.get();
        const profileData = profileRes.data.profile || profileRes.data;
        
        if (!profileData) {
          // ✅ FIXED: Redirect to profile creation if no profile exists
          setError("Please complete your profile first");
          setTimeout(() => navigate("/profile"), 2000);
          return;
        }
        
        setProfile(profileData);
      } catch (err) {
        console.error("Profile error:", err);
        setError("Please complete your profile first");
        setTimeout(() => navigate("/profile"), 2000);
        return;
      }

      // Fetch applications data
      try {
        const appsRes = await applicationAPI.getMyApplications();
        const appsData = appsRes.data.applications || [];
        setApplications(appsData);

        // ✅ FIXED: Calculate real stats
        setStats({
          savedSchemes: 0, // TODO: Implement saved schemes in backend
          appliedSchemes: appsData.length,
          approvedSchemes: appsData.filter(app => app.status === "Approved").length,
          underReview: appsData.filter(app => app.status === "Pending").length
        });
      } catch (err) {
        console.error("Applications error:", err);
        setApplications([]);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const handleRemoveSaved = (schemeId) => {
    // TODO: Implement remove from saved
    alert(`Scheme ${schemeId} removed from saved`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={16} className="text-green-600" />;
      case "Pending":
        return <Clock size={16} className="text-yellow-600" />;
      case "Rejected":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "Approved":
        return 100;
      case "Rejected":
        return 100;
      case "Pending":
        return 50;
      default:
        return 25;
    }
  };

  // ✅ FIXED: Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  // ✅ FIXED: Error state with redirect message
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 max-w-md text-center">
            <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-amber-900 mb-2">{error}</h2>
            <p className="text-amber-700 mb-4">Redirecting to profile page...</p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
            >
              Go to Profile
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-amber-600 via-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Award size={200} />
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-amber-50 text-lg">
                Here's your scheme activity overview
              </p>
            </div>
          </div>

          {/* Stats Cards - ✅ FIXED: Real data */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <Bookmark className="text-blue-500" size={28} />
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Saved Schemes</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.savedSchemes}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <FileText className="text-purple-500" size={28} />
                <BarChart3 className="text-purple-400" size={20} />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Applied</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.appliedSchemes}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="text-green-500" size={28} />
                <Target className="text-green-400" size={20} />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Approved</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.approvedSchemes}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <Clock className="text-yellow-500" size={28} />
                <AlertCircle className="text-yellow-400" size={20} />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Under Review</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.underReview}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Tabs */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tabs Navigation */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    {["overview", "applied"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-8 font-medium capitalize transition ${
                          activeTab === tab
                            ? "border-b-2 border-amber-600 text-amber-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab === "overview" && "Profile Overview"}
                        {tab === "applied" && `Applications (${applications.length})`}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  
                  {/* Profile Overview Tab - ✅ FIXED: Real data */}
                  {activeTab === "overview" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
                        <button
                          onClick={handleEditProfile}
                          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
                        >
                          <Edit size={18} />
                          Edit Profile
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                            <User className="text-blue-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Full Name</p>
                              <p className="font-semibold text-gray-900">{user?.name || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                            <Mail className="text-green-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-semibold text-gray-900 text-sm">{user?.email || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                            <Calendar className="text-purple-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Age</p>
                              <p className="font-semibold text-gray-900">{profile?.age || "N/A"} years</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                            <User className="text-pink-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Gender</p>
                              <p className="font-semibold text-gray-900">{profile?.gender || "N/A"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                            <FileText className="text-yellow-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Category</p>
                              <p className="font-semibold text-gray-900">{profile?.category || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                            <IndianRupee className="text-red-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Annual Income</p>
                              <p className="font-semibold text-gray-900">₹{profile?.income?.toLocaleString() || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                            <Briefcase className="text-indigo-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Occupation</p>
                              <p className="font-semibold text-gray-900">{profile?.occupation || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                            <MapPin className="text-teal-600" size={24} />
                            <div>
                              <p className="text-sm text-gray-600">Location</p>
                              <p className="font-semibold text-gray-900">
                                {profile?.location || "N/A"}, {profile?.state || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Applications Tab - ✅ FIXED: Real data */}
                  {activeTab === "applied" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>
                      {applications.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="mx-auto text-gray-300 mb-4" size={64} />
                          <p className="text-gray-500 text-lg mb-4">No applications yet</p>
                          <button
                            onClick={() => navigate("/schemes")}
                            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
                          >
                            Apply for Schemes
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {applications.map((application) => (
                            <div
                              key={application._id}
                              className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition"
                            >
                              <div className="flex items-start gap-4 mb-4">
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                                        {application.scheme?.name || "Scheme Name"}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        Application ID: <span className="font-mono">{application._id}</span>
                                      </p>
                                    </div>
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                                        application.status
                                      )}`}
                                    >
                                      {getStatusIcon(application.status)}
                                      {application.status}
                                    </span>
                                  </div>
                                  <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={16} />
                                      Applied on {new Date(application.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  {/* Progress Bar */}
                                  <div className="mb-2">
                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                      <span>Application Progress</span>
                                      <span>{getProgressPercentage(application.status)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className={`h-2 rounded-full transition-all ${
                                          application.status === "Approved" ? "bg-green-500" :
                                          application.status === "Rejected" ? "bg-red-500" :
                                          "bg-yellow-500"
                                        }`}
                                        style={{ width: `${getProgressPercentage(application.status)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => navigate(`/schemes/${application.scheme?._id}`)}
                                className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                              >
                                View Scheme Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="text-amber-600" size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="text-blue-600" size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">
                          Applied for {app.scheme?.name || "scheme"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-amber-50 to-green-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/schemes")}
                    className="w-full bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm"
                  >
                    Browse Schemes
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;