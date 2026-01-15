import React, { useState } from "react";

// Dummy cards data
const dummySchemes = [
  { id: 1, name: "Education Scheme", status: "Active" },
  { id: 2, name: "Health Scheme", status: "Inactive" },
  { id: 3, name: "Women Empowerment", status: "Active" },
];

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold text-center py-6 border-b border-green-700">
          Admin Panel
        </h1>
        <nav className="flex-1 mt-4">
          {["Dashboard", "Schemes", "Blogs", "Users", "Settings"].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`w-full text-left px-6 py-3 hover:bg-green-700 transition ${
                activeMenu === menu ? "bg-green-700 font-semibold" : ""
              }`}
            >
              {menu}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-900">{activeMenu}</h2>
          <div>
            <button className="px-4 py-2 bg-yellow-400 text-green-900 rounded hover:bg-yellow-500 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Content area */}
        {activeMenu === "Dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            {dummySchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-400"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {scheme.name}
                </h3>
                <p className="text-gray-700 mb-4">Status: {scheme.status}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMenu === "Schemes" && (
          <div>
            <button className="mb-4 px-4 py-2 bg-yellow-400 text-green-900 rounded hover:bg-yellow-500 transition">
              + Add New Scheme
            </button>
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Scheme Name</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummySchemes.map((scheme) => (
                  <tr key={scheme.id} className="border-b">
                    <td className="px-6 py-3">{scheme.id}</td>
                    <td className="px-6 py-3">{scheme.name}</td>
                    <td className="px-6 py-3">{scheme.status}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-600 transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other menus like Blogs, Users can be added similarly */}
      </div>
    </div>
  );
};

export default AdminPanel;
