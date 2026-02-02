import React, { useState, useEffect } from "react";
import { schemeAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { X, Plus, Edit, Trash2, LogOut } from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ministry: "",
    eligibility: "",
    benefits: "",
    documents: "",
    applicationProcess: "",
    website: "",
    helpline: "",
    status: "Active",
    applicationFormUrl: "",
    youtubeLink: "",
  });

  useEffect(() => {
    if (activeMenu === "Dashboard" || activeMenu === "Schemes") {
      loadSchemes();
    }
  }, [activeMenu]);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      const response = await schemeAPI.getAll();
      setSchemes(response.data);
    } catch (err) {
      console.error("Error loading schemes:", err);
      alert("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this scheme?")) return;

    try {
      await schemeAPI.delete(id);
      alert("Scheme deleted successfully");
      loadSchemes();
    } catch (err) {
      alert("Error deleting scheme");
      console.error(err);
    }
  };

  const openModal = (scheme = null) => {
    if (scheme) {
      setEditingScheme(scheme);
      setFormData({
        name: scheme.name,
        category: scheme.category,
        description: scheme.description,
        ministry: scheme.ministry || "",
        eligibility: Array.isArray(scheme.eligibility) ? scheme.eligibility.join(", ") : "",
        benefits: Array.isArray(scheme.benefits) ? scheme.benefits.join(", ") : "",
        documents: Array.isArray(scheme.documents) ? scheme.documents.join(", ") : "",
        applicationProcess: Array.isArray(scheme.applicationProcess) ? scheme.applicationProcess.join(", ") : "",
        website: scheme.website || "",
        helpline: scheme.helpline || "",
        status: scheme.status || "Active",
        applicationFormUrl: scheme.applicationFormUrl || "",
        youtubeLink: scheme.youtubeLink || "",
      });
    } else {
      setEditingScheme(null);
      setFormData({
        name: "",
        category: "",
        description: "",
        ministry: "",
        eligibility: "",
        benefits: "",
        documents: "",
        applicationProcess: "",
        website: "",
        helpline: "",
        status: "Active",
        applicationFormUrl: "",
        youtubeLink: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        eligibility: formData.eligibility.split(",").map((s) => s.trim()),
        benefits: formData.benefits.split(",").map((s) => s.trim()),
        documents: formData.documents.split(",").map((s) => s.trim()),
        applicationProcess: formData.applicationProcess.split(",").map((s) => s.trim()),
      };

      if (editingScheme) {
        await schemeAPI.update(editingScheme._id, payload);
        alert("Scheme updated successfully");
      } else {
        await schemeAPI.create(payload);
        alert("Scheme created successfully");
      }

      setShowModal(false);
      setEditingScheme(null);
      loadSchemes();
    } catch (err) {
      alert("Error saving scheme: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white flex flex-col">
        <h1 className="text-2xl font-bold text-center py-6 border-b border-green-600">
          Admin Panel
        </h1>
        <nav className="flex-1 mt-4">
          {["Dashboard", "Schemes", "Users", "Settings"].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`w-full text-left px-6 py-3 hover:bg-green-600 transition ${
                activeMenu === menu ? "bg-green-600 font-semibold" : ""
              }`}
            >
              {menu}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">{activeMenu}</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition rounded flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {loading && <p className="text-center py-10">Loading...</p>}

        {/* Dashboard */}
        {activeMenu === "Dashboard" && (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-2xl font-bold text-green-700">{schemes.length}</h3>
                <p className="text-gray-600">Total Schemes</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {schemes.slice(0, 6).map((scheme) => (
                <div key={scheme._id} className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-400">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{scheme.name}</h3>
                  <p className="text-gray-700 mb-4">Status: {scheme.status}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(scheme)}
                      className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(scheme._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schemes */}
        {activeMenu === "Schemes" && (
          <div>
            <button
              onClick={() => openModal()}
              className="mb-4 px-4 py-2 bg-yellow-400 text-green-900 rounded hover:bg-yellow-500 flex items-center gap-2"
            >
              <Plus size={20} /> Add New Scheme
            </button>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Scheme Name</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme) => (
                    <tr key={scheme._id} className="border-b">
                      <td className="px-6 py-3">{scheme.name}</td>
                      <td className="px-6 py-3">{scheme.category}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            scheme.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {scheme.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => openModal(scheme)}
                          className="p-2 bg-green-700 text-white rounded hover:bg-green-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(scheme._id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Menus */}
        {activeMenu === "Users" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}

        {activeMenu === "Settings" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingScheme ? "Edit Scheme" : "Add New Scheme"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Scheme Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Housing">Housing</option>
                <option value="Employment">Employment</option>
                <option value="Health">Health</option>
                <option value="Women">Women</option>
                <option value="Education">Education</option>
              </select>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                rows="3"
                required
              />

              <input
                type="text"
                placeholder="Ministry"
                value={formData.ministry}
                onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />

              <textarea
                placeholder="Eligibility (comma separated)"
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                rows="2"
              />

              <textarea
                placeholder="Benefits (comma separated)"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                rows="2"
              />

              <textarea
                placeholder="Documents Required (comma separated)"
                value={formData.documents}
                onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                rows="2"
              />

              <input
                type="url"
                placeholder="Website URL"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />

              <input
                type="url"
                placeholder="Application Form URL"
                value={formData.applicationFormUrl}
                onChange={(e) => setFormData({ ...formData, applicationFormUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="url"
                placeholder="YouTube Link"
                value={formData.youtubeLink}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Helpline"
                value={formData.helpline}
                onChange={(e) => setFormData({ ...formData, helpline: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />

              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Scheme"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;