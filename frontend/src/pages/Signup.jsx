import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axiosInstance.post("/api/user/create-account", {
                fullName: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.data.error) {
                setError({ general: response.data.message });
                return;
            }

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError({ general: error.response.data.message });
            } else {
                setError({
                    general: "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-5">
                        Create Account
                    </h2>

                    {error.general && (
                        <p className="text-red-600 text-center mb-3">{error.general}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${error.name
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {error.name && (
                                <p className="text-red-500 text-sm mt-1">{error.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${error.email
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {error.email && (
                                <p className="text-red-500 text-sm mt-1">{error.email}</p>
                            )}
                        </div>

                 
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${error.password
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />

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

                            {error.password && (
                                <p className="text-red-500 text-sm mt-1">{error.password}</p>
                            )}
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${error.confirmPassword
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <span
                                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible size={22} />
                                ) : (
                                    <AiOutlineEye size={22} />
                                )}
                            </span>

                            {error.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-gray-600 text-sm mt-3">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 font-medium">
                                Login
                            </a>
                        </p>
                    </form>
                    
                </div>
            </div>
        </>
    );
};

export default Signup;
