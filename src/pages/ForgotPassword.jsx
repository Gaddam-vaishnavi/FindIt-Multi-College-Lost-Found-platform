import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, ArrowLeft } from 'lucide-react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
        const response = await fetch(
            'http://localhost:5000/api/auth/forgot-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed.');
        }

        setMessage(data.message);

    } catch (error) {
        setMessage(error.message);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

                <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-8">
                    <span className="bg-[#059669] text-white p-2 rounded-xl">
                        <Search className="w-5 h-5" />
                    </span>
                    FindIt
                </Link>

                <h1 className="text-2xl font-bold text-[#111827]">
                    Forgot Password?
                </h1>

                <p className="text-sm text-gray-500 mt-2 mb-6">
                    Enter your registered email address to reset your password.
                </p>
            {message && (
    <div
        role="status"
        className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700"
    >
        {message}
    </div>
)}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@college.edu"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                            />
                        </div>
                    </div>

                   <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-[#059669] hover:bg-[#047857] disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold"
>
    {isLoading ? 'Sending...' : 'Send Reset Link'}
</button>

                </form>

                <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 mt-6 text-sm text-[#059669] font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </Link>

            </div>
        </div>
    );
}

export default ForgotPassword;