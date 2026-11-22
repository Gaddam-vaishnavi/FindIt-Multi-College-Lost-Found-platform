import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  PackageCheck,
  Tag,
  FileText,
  Calendar,
  Building2,
  MapPin,
  Sparkles,
  ImagePlus,
  X,
  AlertCircle,
} from 'lucide-react';

// Category options matching ReportLostItem.jsx
const ITEM_CATEGORIES = [
  'Electronics',
  'Books & Stationery',
  'ID Cards',
  'Accessories',
  'Clothing',
  'Personal Items',
  'Other',
];

// Temporary sample campus list matching ReportLostItem.jsx — replace with API data later
const SAMPLE_COLLEGES = [
  { id: 'bvrit-narsapur', name: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)' },
  { id: 'sample-1', name: 'Northwood Institute of Technology (Sample)' },
  { id: 'sample-2', name: 'Greenfield State University (Sample)' },
  { id: 'sample-3', name: 'St. Xavier College of Arts & Science (Sample)' },
  { id: 'sample-4', name: 'Riverside Engineering College (Sample)' },
  { id: 'sample-5', name: 'Metro City Polytechnic Campus (Sample)' },
  { id: 'other', name: 'Other / College Not Listed' },
];

// Helper to get today's local date in YYYY-MM-DD format for date validation
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function ReportFoundItem() {
  const todayStr = getTodayDateString();
  const fileInputRef = useRef(null);

  // Controlled form state
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    dateFound: '',
    college: '',
    customCollege: '',
    location: '',
    identifyingDetails: '',
  });

  // Local image upload & preview state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // Validation & UI feedback state
  const [errors, setErrors] = useState({});
  const [validationNotice, setValidationNotice] = useState('');

  // Revoke object URL on image change or unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Handle text, select, and textarea changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'college' && value !== 'other' ? { customCollege: '' } : {}),
    }));

    if (errors[name] || (name === 'college' && errors.customCollege)) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
        ...(name === 'college' ? { customCollege: '' } : {}),
      }));
    }
  };

  // Handle local image selection and generate preview URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        image: 'Please select a valid image file (PNG, JPG, or WEBP).',
      }));
      return;
    }

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreviewUrl(previewUrl);

    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  // Remove selected image and reset file input
  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setSelectedImage(null);
    setImagePreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate required fields, reject future dates, and validate custom college when "other" is selected
  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Item description is required.';
    }

    if (!formData.dateFound) {
      newErrors.dateFound = 'Date found is required.';
    } else if (formData.dateFound > todayStr) {
      newErrors.dateFound = 'Date found cannot be in the future.';
    }

    if (!formData.college) {
      newErrors.college = 'Please select your college or campus.';
    } else if (formData.college === 'other' && !formData.customCollege.trim()) {
      newErrors.customCollege = 'Please enter your college or campus name.';
    }

 if (!formData.location.trim()) {
      newErrors.location = 'Please specify where on campus the item was found.';
    }

    if (!selectedImage) {
      newErrors.image = 'Please upload a photo of the found item.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (frontend validation preview only — no fake save)
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationNotice('');

    if (!validateForm()) {
      return;
    }

    setValidationNotice(
      'Form validation passed. This is a frontend preview — found item submission will connect to the backend API in a later step.'
    );
  };

  // Shared input styling helper matching ReportLostItem.jsx
  const getFieldClasses = (hasError, withLeftIcon = true) =>
    `block w-full ${withLeftIcon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 text-sm text-[#111827] bg-white border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
        : 'border-gray-300 focus:ring-[#059669]/20 focus:border-[#059669]'
    }`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#111827]"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#059669] text-white shadow-sm">
              <Search className="w-4 h-4" aria-hidden="true" />
            </span>
            <span>FindIt</span>
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
            Report a Found Item
          </h1>
         
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
          {/* Neutral Frontend Validation Notice */}
          {validationNotice && (
            <div
              role="status"
              className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-[#047857]"
            >
              {validationNotice}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Row 1: Item Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 1. Item Name */}
              <div>
                <label
                  htmlFor="itemName"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  Item Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <PackageCheck className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="itemName"
                    name="itemName"
                    type="text"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g. Black Casio Scientific Calculator"
                    aria-invalid={Boolean(errors.itemName)}
                    className={getFieldClasses(Boolean(errors.itemName))}
                  />
                </div>
                {errors.itemName && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.itemName}</span>
                  </p>
                )}
              </div>

              {/* 2. Category Dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.category)}
                    className={`${getFieldClasses(Boolean(errors.category))} ${
                      !formData.category ? 'text-gray-400' : 'text-[#111827]'
                    }`}
                  >
                    <option value="">Select a category...</option>
                    {ITEM_CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="text-[#111827]"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 3. Item Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Item Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3.5 pointer-events-none">
                  <FileText className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe color, brand, condition, or where it is currently kept for safekeeping..."
                  aria-invalid={Boolean(errors.description)}
                  className={getFieldClasses(Boolean(errors.description))}
                />
              </div>
              {errors.description && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Row 2: Date Found & College/Campus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 4. Date Found */}
              <div>
                <label
                  htmlFor="dateFound"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  Date Found <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="dateFound"
                    name="dateFound"
                    type="date"
                    max={todayStr}
                    value={formData.dateFound}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.dateFound)}
                    className={getFieldClasses(Boolean(errors.dateFound))}
                  />
                </div>
                {errors.dateFound && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.dateFound}</span>
                  </p>
                )}
              </div>

              {/* 5. College / Campus Selection */}
              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-[#111827] mb-1.5"
                >
                  College / Campus <span className="text-red-500">*</span>
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
                    aria-invalid={Boolean(errors.college)}
                    className={`${getFieldClasses(Boolean(errors.college))} ${
                      !formData.college ? 'text-gray-400' : 'text-[#111827]'
                    }`}
                  >
                    <option value="">Select campus...</option>
                    {SAMPLE_COLLEGES.map((campus) => (
                      <option
                        key={campus.id}
                        value={campus.id}
                        className="text-[#111827]"
                      >
                        {campus.name}
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

                {/* Conditional Custom College Name Input */}
                {formData.college === 'other' && (
                  <div className="mt-3">
                    <label
                      htmlFor="customCollege"
                      className="block text-xs font-medium text-[#111827] mb-1.5"
                    >
                      Enter Your College Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="customCollege"
                        name="customCollege"
                        type="text"
                        value={formData.customCollege}
                        onChange={handleChange}
                        placeholder="e.g. VNR Vignana Jyothi Institute of Engineering"
                        aria-invalid={Boolean(errors.customCollege)}
                        className={getFieldClasses(Boolean(errors.customCollege))}
                      />
                    </div>
                    {errors.customCollege && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.customCollege}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 6. Specific Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Specific Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Library Reading Room, Main Canteen, Classroom 105, Sports Ground"
                  aria-invalid={Boolean(errors.location)}
                  className={getFieldClasses(Boolean(errors.location))}
                />
              </div>
              {errors.location && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            {/* 7. Additional Identifying Details (Optional) */}
            <div>
              <label
                htmlFor="identifyingDetails"
                className="block text-sm font-medium text-[#111827] mb-1.5"
              >
                Additional Identifying Details{' '}
                <span className="text-xs font-normal text-[#4B5563]">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Sparkles className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="identifyingDetails"
                  name="identifyingDetails"
                  type="text"
                  value={formData.identifyingDetails}
                  onChange={handleChange}
                  placeholder="e.g. Handed over to security desk, unique sticker, or specific cover color"
                  className={getFieldClasses(false)}
                />
              </div>
            </div>

            {/* 8. Upload Item Image (Optional with Local Preview) */}
            {/* 8. Upload Item Image (Required with Local Preview) */}
            <div>
              <label
                htmlFor="itemImage"
                className="block text-sm font-medium text-[#111827] mb-1"
              >
                Item Photo <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-[#4B5563] mb-2">
                Upload a clear photograph of the found item. Photo is required.
              </p>

              {!imagePreviewUrl ? (
                <label
                  htmlFor="itemImage"
                  className={`mt-1 flex flex-col items-center justify-center px-6 py-7 border-2 border-dashed rounded-xl bg-[#F9FAFB] transition-colors cursor-pointer ${
                    errors.image
                      ? 'border-red-500 hover:border-red-600 bg-red-50/20'
                      : 'border-gray-300 hover:bg-emerald-50/40 hover:border-[#059669]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#059669] flex items-center justify-center mb-2.5">
                    <ImagePlus className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-[#111827]">
                    Click to select a photo of the found item
                  </span>
                  <span className="text-xs text-[#4B5563] mt-1">
                    PNG, JPG, or WEBP (local browser preview only)
                  </span>
                </label>
              ) : (
                <div className="mt-1 relative rounded-xl border border-gray-200 bg-[#F9FAFB] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={imagePreviewUrl}
                    alt="Selected found item preview"
                    className="w-full sm:w-32 h-32 object-cover rounded-lg border border-gray-200 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">
                      {selectedImage?.name}
                    </p>
                    <p className="text-xs text-[#4B5563] mt-0.5">
                      {selectedImage
                        ? `${(selectedImage.size / 1024).toFixed(1)} KB • Local preview`
                        : 'Local image preview'}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label
                        htmlFor="itemImage"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#047857] bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                        Change Photo
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove Image
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                id="itemImage"
                name="itemImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                aria-invalid={Boolean(errors.image)}
                className="sr-only"
              />

              {errors.image && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.image}</span>
                </p>
              )}
            </div>


            {/* Form Footer Actions: Cancel & Submit */}
            <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-semibold text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Submit Found Item Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportFoundItem;