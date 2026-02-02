import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { schemeAPI } from "../services/api";
import pmayimg from "../assets/images/PMAY.png";
import mudra from "../assets/images/mudra.jpg";
import beti from "../assets/images/beti.jpg";
import skill from "../assets/images/skill.webp";
import sukanya from "../assets/images/sukanya.jpg";
import kisan from "../assets/images/kisan.jpg";

import {
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Users,
  FileText,
  ArrowLeft,
  Gift,
  CheckCircle2,
} from "lucide-react";

// Map keys (strings from your DB) to the imported variables
const imageMap = {
  "Pradhan Mantri Awas Yojana": pmayimg,
  "Mudra Yojana": mudra,
  "Beti Bachao Beti Padhao": beti,
  "Skill India": skill,
  "Kisan Samman Nidhi": kisan,
  "Sukanya Samriddhi": sukanya,
  Education: skill,
  Women: beti,
};


const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadScheme();
  }, [id]);

  const loadScheme = async () => {
    try {
      setLoading(true);
      const res = await schemeAPI.getById(id);

      // backend response handle
      const schemeData = res.data.scheme || res.data;

      setScheme(schemeData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load scheme details");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply");
      navigate("/login");
      return;
    }

    navigate(`/apply/${scheme._id}`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const getSchemeImage = () => {
    console.log("Scheme name:", scheme?.name);
    console.log("Scheme category:", scheme?.category);

    if (!scheme) return pmayimg;

    // name se match
    if (imageMap[scheme.name]) {
      return imageMap[scheme.name];
    }

    // category se match
    if (imageMap[scheme.category]) {
      return imageMap[scheme.category];
    }

    // fallback
    return pmayimg;
  };

  const handleShare = async () => {
    if (!scheme) return;

    if (navigator.share) {
      await navigator.share({
        title: scheme.name,
        text: scheme.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || "Scheme not found"}</p>
          <button
            onClick={() => navigate("/schemes")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/schemes")}
            className="flex items-center text-yellow-600 hover:text-green-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Schemes
          </button>
        </div>
      </div>

  {/* Hero */}
<div className="relative h-[420px] flex items-center justify-center text-white overflow-hidden">

  {/* Background Image */}
  <img
    src={getSchemeImage()}
    alt="scheme"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-4xl px-6">
    <span className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm mb-4">
      {scheme.status}
    </span>

    <h1 className="text-4xl md:text-5xl font-bold mt-3">
      {scheme.name.split(" ").slice(0, 4).join(" ")}
      <span className="text-yellow-400">
        {" "}
        {scheme.name.split(" ").slice(4).join(" ")}
      </span>
    </h1>

    <p className="text-gray-200 mt-4 text-lg">{scheme.ministry}</p>

    <div className="flex justify-center gap-8 mt-6 text-sm md:text-base">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5" />
        {scheme.beneficiaries || "N/A"}
      </div>
      <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
        <Clock className="w-5 h-5" />
        {scheme.deadline || "Ongoing"}
      </div>
    </div>

    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={handleSave}
        className="p-3 rounded-full bg-white hover:bg-amber-50 transition"
      >
        <Bookmark
          className={`w-6 h-6 ${
            isSaved ? "text-amber-600 fill-amber-600" : "text-gray-600"
          }`}
        />
      </button>

      <button
        onClick={handleShare}
        className="p-3 bg-white text-blue-600 rounded-full hover:bg-amber-50 transition"
      >
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  </div>
</div>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Main Content */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <nav className="flex gap-4 border-b mb-6 overflow-x-auto">
            {[
              "overview",
              "eligibility",
              "benefits",
              "documents",
              "process",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-amber-600 text-amber-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About the Scheme
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {scheme.description}
                </p>
              </div>
            )}

            {activeTab === "eligibility" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Eligibility Criteria
                </h2>
                <ul className="space-y-3">
                  {scheme.eligibility && scheme.eligibility.length > 0 ? (
                    scheme.eligibility.map((e, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start text-gray-700"
                      >
                        <CheckCircle
                          className="text-green-600 mt-1 shrink-0"
                          size={20}
                        />
                        <span>{e}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No eligibility criteria available
                    </p>
                  )}
                </ul>
              </div>
            )}

            {activeTab === "benefits" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="text-green-600" size={28} />
                  Scheme Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheme.benefits && scheme.benefits.length > 0 ? (
                    scheme.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-green-50 p-4 rounded-lg hover:bg-green-100 transition"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-green-600 mt-1 shrink-0"
                        />
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No benefits information available
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Required Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.documents && scheme.documents.length > 0 ? (
                    scheme.documents.map((d, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <FileText
                          className="text-blue-600 shrink-0"
                          size={20}
                        />
                        <span className="text-gray-700">{d}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No document requirements listed
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "process" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Application Process
                </h2>
                <ol className="space-y-4">
                  {scheme.applicationProcess &&
                  scheme.applicationProcess.length > 0 ? (
                    scheme.applicationProcess.map((p, i) => (
                      <li key={i} className="flex gap-3 text-gray-700">
                        <span className="shrink-0 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <span className="pt-1">{p}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Application process details coming soon
                    </p>
                  )}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Right - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded shadow sticky top-24">
            <button
              onClick={handleApply}
              className="w-full bg-amber-600 hover:bg-amber-700 transition text-white py-3 rounded-lg font-semibold shadow-md mb-6"
            >
              Apply Now →
            </button>

            <div className="space-y-4 text-sm">
              {scheme.website && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Official Website
                  </h3>
                  <a
                    href={scheme.website}
                    className="text-blue-600 hover:underline wrap-break-word"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {scheme.website}
                  </a>
                </div>
              )}

              {scheme.helpline && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Helpline</h3>
                  <p className="text-gray-700">{scheme.helpline}</p>
                </div>
              )}

              {scheme.deadline && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Deadline</h3>
                  <p className="text-red-500">{scheme.deadline}</p>
                </div>
              )}

              {scheme.budget && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Budget</h3>
                  <p className="text-green-700 font-semibold">
                    {scheme.budget}
                  </p>
                </div>
              )}

              {scheme.beneficiaries && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Beneficiaries
                  </h3>
                  <p className="text-gray-700">{scheme.beneficiaries}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Category</h3>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  {scheme.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
