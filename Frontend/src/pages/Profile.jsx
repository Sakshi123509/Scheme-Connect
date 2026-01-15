import Navbar from "../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileData, setprofileData] = useState({
    age: "",
    gender: "",
    category: "",
    income: "",
    occupation: "",
    state: "",
    location: "",
  });
  const handleChange = (e) => {
    setFormData({ ...profileData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile Saved Successfully");
    } catch (err) {
      alert("Error saving profile");
      console.log(err);
    }
  };

  if (!user) return <p>Loading......</p>;

  console.log(profileData);
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
        <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center uppercase">
          Create Your Profile
        </h1>

        {/* Grid for inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={user.name || ""}
              readOnly
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email || ""}
              readOnly
              className={inputClass}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your Age"
              value={profileData.age}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Gender
            </label>

            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={profileData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={profileData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={profileData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              value={profileData.category}
              className={inputClass + " mt-1"}
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="Minority">Minority</option>
            </select>
          </div>

          {/* Income */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Income (₹)
            </label>
            <input
              type="number"
              placeholder="Enter your income"
              value={profileData.income}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              placeholder="Enter your occupation"
              value={profileData.occupation}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* State */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              name="state"
              value={profileData.state}
              onChange={handleChange}
              className={inputClass + " mt-1"}
              defaultValue=""
            >
              <option value="" disabled>
                Select State
              </option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter your city / town"
              value={profileData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-amber-700 text-white py-3 rounded-md font-semibold hover:bg-amber-600 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
