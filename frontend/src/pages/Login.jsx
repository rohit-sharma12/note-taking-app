import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

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

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axiosInstance.post("/api/user/login", {
                email,
                password,
            });

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }

        } catch (error) {
            if (error.response?.data?.message) {
                setError({ general: error.response.data.message });
            } else {
                setError({ general: "Something went wrong. Please try again." });
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Login
                    </h2>

                    {error.general && (
                        <p className="mb-3 text-center text-red-600 font-medium">
                            {error.general}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${error.email
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError((prev) => ({ ...prev, email: "" }));
                                }}
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
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${error.password
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError((prev) => ({ ...prev, password: "" }));
                                }}
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>

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
    );
};

export default Login;
