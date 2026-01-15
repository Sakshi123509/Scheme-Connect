import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Layout/Navbar-light";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data - Replace with API calls
  const [stats] = useState({
    savedSchemes: 8,
    appliedSchemes: 5,
    approvedSchemes: 2,
    underReview: 3
  });

  const [savedSchemes] = useState([
    {
      id: 1,
      name: "Pradhan Mantri Awas Yojana",
      category: "Housing",
      deadline: "31st March 2025",
      savedDate: "15 Dec 2024",
      status: "Active",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100"
    },
    {
      id: 2,
      name: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      deadline: "Year Round",
      savedDate: "10 Dec 2024",
      status: "Active",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100"
    },
    {
      id: 3,
      name: "Sukanya Samriddhi Yojana",
      category: "Child Welfare",
      deadline: "Ongoing",
      savedDate: "5 Dec 2024",
      status: "Active",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100"
    }
  ]);

  const [appliedSchemes] = useState([
    {
      id: 1,
      name: "Ayushman Bharat PM-JAY",
      category: "Healthcare",
      appliedDate: "20 Nov 2024",
      status: "Under Review",
      applicationId: "AB2024123456",
      progress: 60,
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=100"
    },
    {
      id: 2,
      name: "Sukanya Samriddhi Yojana",
      category: "Child Welfare",
      appliedDate: "5 Dec 2024",
      status: "Approved",
      applicationId: "SSY2024789012",
      progress: 100,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100"
    },
    {
      id: 3,
      name: "Stand Up India Scheme",
      category: "Employment",
      appliedDate: "28 Nov 2024",
      status: "Under Review",
      applicationId: "SUI2024456789",
      progress: 40,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100"
    },
    {
      id: 4,
      name: "PM Mudra Yojana",
      category: "Finance",
      appliedDate: "15 Nov 2024",
      status: "Rejected",
      applicationId: "PMM2024321654",
      progress: 100,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100"
    }
  ]);

  const [recentActivity] = useState([
    { action: "Applied for Ayushman Bharat", time: "2 days ago", icon: FileText },
    { action: "Profile updated", time: "5 days ago", icon: User },
    { action: "Saved PM Kisan scheme", time: "1 week ago", icon: Bookmark },
    { action: "Application approved for SSY", time: "2 weeks ago", icon: CheckCircle }
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user info
        const userRes = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        // Fetch profile data
        try {
          const profileRes = await axios.get("http://localhost:3000/api/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(profileRes.data);
        } catch (err) {
          console.log("Profile not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const handleRemoveSaved = (schemeId) => {
    alert(`Scheme ${schemeId} removed from saved`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Under Review":
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
      case "Under Review":
        return <Clock size={16} className="text-yellow-600" />;
      case "Rejected":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 mt-8">
        {/* Welcome Section with gradient */}
        <div className="bg-linear-to-r from-amber-600 via-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
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

        {/* Stats Cards */}
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
                  {["overview", "saved", "applied"].map((tab) => (
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
                      {tab === "saved" && `Saved (${savedSchemes.length})`}
                      {tab === "applied" && `Applications (${appliedSchemes.length})`}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                
                {/* Profile Overview Tab */}
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
                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
                          <User className="text-blue-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-semibold text-gray-900">{user?.name || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-green-100 rounded-lg">
                          <Mail className="text-green-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900 text-sm">{user?.email || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg">
                          <Calendar className="text-purple-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Age</p>
                            <p className="font-semibold text-gray-900">{profile?.age || "N/A"} years</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-pink-50 to-pink-100 rounded-lg">
                          <User className="text-pink-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Gender</p>
                            <p className="font-semibold text-gray-900">{profile?.gender || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-yellow-50 to-yellow-100 rounded-lg">
                          <FileText className="text-yellow-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Category</p>
                            <p className="font-semibold text-gray-900">{profile?.category || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-red-50 to-red-100 rounded-lg">
                          <IndianRupee className="text-red-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Annual Income</p>
                            <p className="font-semibold text-gray-900">₹{profile?.income || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-indigo-50 to-indigo-100 rounded-lg">
                          <Briefcase className="text-indigo-600" size={24} />
                          <div>
                            <p className="text-sm text-gray-600">Occupation</p>
                            <p className="font-semibold text-gray-900">{profile?.occupation || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-teal-50 to-teal-100 rounded-lg">
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

                {/* Saved Schemes Tab */}
                {activeTab === "saved" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Schemes</h2>
                    {savedSchemes.length === 0 ? (
                      <div className="text-center py-12">
                        <Bookmark className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-gray-500 text-lg mb-4">No saved schemes yet</p>
                        <button
                          onClick={() => navigate("/schemes")}
                          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
                        >
                          Browse Schemes
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedSchemes.map((scheme) => (
                          <div
                            key={scheme.id}
                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition group"
                          >
                            <img 
                              src={scheme.image} 
                              alt={scheme.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-amber-600 transition">
                                {scheme.name}
                              </h3>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <FileText size={16} />
                                  {scheme.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={16} />
                                  Deadline: {scheme.deadline}
                                </span>
                                <span className="text-gray-400">
                                  Saved on {scheme.savedDate}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/schemes/${scheme.id}`)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleRemoveSaved(scheme.id)}
                                className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Applied Schemes Tab */}
                {activeTab === "applied" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>
                    {appliedSchemes.length === 0 ? (
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
                        {appliedSchemes.map((scheme) => (
                          <div
                            key={scheme.id}
                            className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <img 
                                src={scheme.image} 
                                alt={scheme.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                                      {scheme.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      Application ID: <span className="font-mono">{scheme.applicationId}</span>
                                    </p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                                      scheme.status
                                    )}`}
                                  >
                                    {getStatusIcon(scheme.status)}
                                    {scheme.status}
                                  </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                  <span className="flex items-center gap-1">
                                    <FileText size={16} />
                                    {scheme.category}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    Applied on {scheme.appliedDate}
                                  </span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Application Progress</span>
                                    <span>{scheme.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all ${
                                        scheme.status === "Approved" ? "bg-green-500" :
                                        scheme.status === "Rejected" ? "bg-red-500" :
                                        "bg-yellow-500"
                                      }`}
                                      style={{ width: `${scheme.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(`/schemes/${scheme.id}`)}
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
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <activity.icon className="text-blue-600" size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-amber-50 to-green-50 rounded-xl p-6">
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
  );
};

export default Dashboard;