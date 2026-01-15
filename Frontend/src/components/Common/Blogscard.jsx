import blog1 from "../../assets/images/blog1.jpg";
import blog2 from "../../assets/images/blog2.jpg";
import blog3 from "../../assets/images/blog3.png";
import blog4 from "../../assets/images/blog4.webp";
import blog5 from "../../assets/images/blog5.jpg";
import Navbar from "../Layout/Navbar-light";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "SchemeConnect: One Platform for All Government Schemes",
    image: blog1,
    content:
      "SchemeConnect is a unified digital platform that brings all central and state government schemes under one roof. Citizens no longer need to search across multiple websites or offices.",
  },
  {
    id: 2,
    title: "How SchemeConnect Helps Citizens Discover Eligible Schemes",
    image: blog2,
    content:
      "Many citizens miss out on benefits simply because they are unaware of schemes they qualify for. SchemeConnect provides clear eligibility details and benefits.",
  },
  {
    id: 3,
    title: "Empowering Rural India Through SchemeConnect",
    image: blog3,
    content:
      "SchemeConnect empowers rural India with simple navigation, regional language support, and easy access to government schemes.",
  },
  {
    id: 4,
    title: "SchemeConnect and Women Empowerment",
    image: blog4,
    content:
      "SchemeConnect highlights women-centric schemes including education, healthcare, financial assistance, and self-employment initiatives.",
  },
  {
    id: 5,
    title: "Supporting Students and Youth via SchemeConnect",
    image: blog5,
    content:
      "Students and youth can explore scholarships, skill development programs, internships, and employment schemes using SchemeConnect.",
  },
  {
    id: 6,
    title: "How to Apply for Government Schemes on SchemeConnect",
    image: blog1,
    content:
      "Applying for government schemes is now hassle-free with SchemeConnect's step-by-step guidance, document checklists, and application tracking features.",
  },
];

const SchemeConnectBlogs = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-12 uppercase">
          SchemeConnect Blogs
        </h1>

        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 font-s">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden font-stretch-semi-condensed border-t-4 border-yellow-400 hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-contain bg-gray-100"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-700 mb-3">
                  {blog.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {isReadMore
                    ? blog.content
                    : `${blog.content.slice(0, 100)}...`}
                </p>

                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="mt-3 px-4 py-2 bg-yellow-400 pointer-cursor text-black-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
                >
                  {isReadMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SchemeConnectBlogs;
