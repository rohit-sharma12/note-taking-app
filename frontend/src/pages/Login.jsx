import Navbar from "../components/Navbar/Navbar"
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        console.log("Login Successful:", { email, password });
    };
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${errors.email
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${errors.password
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Eye Icon */}
                            <span
                                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={22} />
                                ) : (
                                    <AiOutlineEye size={22} />
                                )}
                            </span>

                            {/* Validation Error */}
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>

                        {/* Signup Link */}
                        <p className="text-center text-gray-600">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Create account
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
