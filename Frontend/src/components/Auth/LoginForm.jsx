import React from "react";
import Navbar from "../Layout/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg "
        style={{ backgroundImage: "url('/src/assets/images/bg.jpg') " }} // change image if needed
      >
        <div className="w-[780px] h-[450px] bg-white rounded-xl shadow-4xl flex overflow-hidden">
          <div
            className="w-1/2 bg-cover bg-center relative m-1 border-white"
            style={{
              backgroundImage: "url('/src/assets/images/loginimg.jpg')",
            }}
          ></div>

          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>

            <input
              type="email"
              placeholder="Email"
              className="border border-black p-3 rounded-md w-full mb-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="border border-black p-3 rounded-md w-full mb-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 outline-none"
            />

            <p className="text-right text-amber-600 text-sm mb-4 cursor-pointer hover:underline">
              Forgot password?
            </p>

            {/* Login Button */}
            <button
              className="
            bg-amber-700 
            text-white 
            w-full 
            py-3 
            rounded-md 
            font-semibold 
            transition-all 
            duration-300 
            hover:bg-amber-600 
            hover:scale-[1.02] 
            hover:shadow-lg
          "
            >
              Log In
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <span className="text-amber-700 font-semibold cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
