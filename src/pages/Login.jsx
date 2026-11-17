import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

function Login() {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  // Validate empty fields and email format
  const validateForm = () => {
    const newErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@college.edu).';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (!validateForm()) {
      return;
    }

    // Frontend-only placeholder (no fake login redirect or backend call)
    setStatusMessage(
      'Form validated successfully. Backend authentication will be connected in a future step.'
    );
  };

  // Clear field-specific error as the user types
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Return Link */}
      <div className="max-w-md w-full mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Centered Auth Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* FindIt Brand Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[#111827] mb-6"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#059669] text-white shadow-sm">
              <Search className="w-5 h-5" aria-hidden="true" />
            </span>
            <span>FindIt</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
            Log in to reconnect with what matters.
          </p>
        </div>

        {/* White Card Container */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-sm border border-gray-200/80 rounded-2xl">
          {/* Validation Info Banner (only shown after passing client validation) */}
          {statusMessage && (
            <div
              role="status"
              className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-[#047857]"
            >
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                College or Personal Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@college.edu"
                  className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#111827] bg-white border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#059669]/20 focus:border-[#059669]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={`block w-full pl-10 pr-10 py-2.5 text-sm text-[#111827] bg-white border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#059669]/20 focus:border-[#059669]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#4B5563] focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] accent-[#059669]"
                />
                <span className="text-sm text-[#4B5563]">Remember me</span>
              </label>

              <span
                title="Password reset coming soon"
                className="text-sm font-medium text-[#4B5563]/70 cursor-not-allowed select-none"
              >
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059669] cursor-pointer"
            >
              Log In
            </button>
          </form>

          {/* Divider & Registration Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-[#4B5563]">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#059669] hover:text-[#047857] transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Copyright */}
      <p className="text-center text-xs text-[#4B5563]">
        &copy; 2026 FindIt. Campus Lost &amp; Found Network.
      </p>
    </div>
  );
}

export default Login;