import { useState } from 'react';
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login clicked:', email, password);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50">
      {/* Login Form */}
      <div className="flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Login to SchemeSathi</h2>
            <p className="text-gray-600 mt-2">Access your personalized schemes</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-orange-600 hover:underline font-medium">
              Sign up
            </a>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <a href="#" className="text-sm text-orange-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;