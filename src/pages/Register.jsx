import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  User,
  Mail,
  IdCard,
  Building2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

// Temporary sample list of participating colleges — replace with API data later




function Register() {
  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    college: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [colleges, setColleges] = useState([]);
const [collegesLoading, setCollegesLoading] = useState(true);
const [collegeLoadError, setCollegeLoadError] = useState('');

useEffect(() => {
    const fetchColleges = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/colleges'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch colleges');
            }

            const data = await response.json();

            setColleges(data.colleges || []);
        } catch (error) {
            console.error('College fetch error:', error);
            setCollegeLoadError('Unable to load colleges. Please try again.');
        } finally {
            setCollegesLoading(false);
        }
    };

    fetchColleges();
}, []);

  // UI & validation states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationNotice, setValidationNotice] = useState('');

  // Generic change handler for text, select, and checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear the error for the specific field being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Client-side validation rules
  const validateForm = () => {
    const newErrors = {};
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedStudentId = formData.studentId.trim();

    if (!trimmedName) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!trimmedEmail) {
      newErrors.email = 'College email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@college.edu).';
    }

    if (!trimmedStudentId) {
      newErrors.studentId = 'Student ID or Roll Number is required.';
    }

    if (!formData.college) {
      newErrors.college = 'Please select your college from the list.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must agree to the Terms and Conditions to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission without fake account creation or localStorage storage
 const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationNotice('');

    if (!validateForm()) {
        return;
    }

    try {
        const response = await fetch(
            'http://localhost:5000/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName.trim(),
                    email: formData.email.trim(),
                    studentId: formData.studentId.trim(),
                    college: formData.college,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed.');
        }

        setValidationNotice(
            'Account created successfully! You can now log in.'
        );

        setFormData({
            fullName: '',
            email: '',
            studentId: '',
            college: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        });

    } catch (error) {
        setValidationNotice(error.message);
    }
};

  // Helper for consistent input border & focus ring classes
  const getInputClasses = (hasError, hasRightIcon = false) =>
    `block w-full pl-10 ${
      hasRightIcon ? 'pr-10' : 'pr-3.5'
    } py-2.5 text-sm text-[#111827] bg-white border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
        : 'border-gray-300 focus:ring-[#059669]/20 focus:border-[#059669]'
    }`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Return Link */}
      <div className="max-w-lg w-full mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Centered Registration Card */}
      <div className="max-w-lg w-full mx-auto my-auto py-6">
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
            Create Your Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
            Join your campus network to report and recover lost items.
          </p>
        </div>

        {/* White Card Container */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-sm border border-gray-200/80 rounded-2xl">
          {/* Neutral Validation Status Notice */}
          {validationNotice && (
            <div
              role="status"
              className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-[#047857]"
            >
              {validationNotice}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Aarav Sharma"
                  className={getInputClasses(Boolean(errors.fullName))}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* 2. College Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                College Email
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@college.edu"
                  className={getInputClasses(Boolean(errors.email))}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* 3. Student ID / Roll Number & 4. College Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Student ID / Roll Number */}
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  Student ID / Roll Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <IdCard className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. 2026CS104"
                    className={getInputClasses(Boolean(errors.studentId))}
                  />
                </div>
                {errors.studentId && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.studentId}</span>
                  </p>
                )}
              </div>

              {/* College Selection Dropdown */}
              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  Select College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={`${getInputClasses(Boolean(errors.college))} ${
                      !formData.college ? 'text-gray-400' : 'text-[#111827]'
                    }`}
                  >
                    <option value="">
    {collegesLoading ? 'Loading colleges...' : 'Choose a campus...'}
</option>

{colleges.map((college) => (
    <option
        key={college._id}
        value={college.name}
        className="text-[#111827]"
    >
        {college.name}
    </option>
))}
                  </select>
                </div>
                {errors.college && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.college}</span>
                  </p>
                )}
              </div>
            </div>
            {collegeLoadError && (
    <p className="text-xs text-red-600 -mt-2">
        {collegeLoadError}
    </p>
)}

{!collegesLoading && !collegeLoadError && colleges.length === 0 && (
    <p className="text-xs text-gray-500 -mt-2">
        No colleges are currently available.
    </p>
)}

            {/* 5. Password */}
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className={getInputClasses(Boolean(errors.password), true)}
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

            {/* 6. Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={getInputClasses(Boolean(errors.confirmPassword), true)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#4B5563] focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* 7. Terms and Conditions Checkbox */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] accent-[#059669]"
                />
                <span className="text-sm text-[#4B5563] leading-snug">
                  I agree to the{' '}
                  <span className="font-medium text-[#111827]">Terms and Conditions</span>{' '}
                  and campus community guidelines.
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.acceptTerms}</span>
                </p>
              )}
            </div>

            {/* 8. Create Account Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059669] cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Login Page Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-[#4B5563]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#059669] hover:text-[#047857] transition-colors"
              >
                Log in
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

export default Register;