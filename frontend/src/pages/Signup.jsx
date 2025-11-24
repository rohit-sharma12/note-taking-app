import Navbar from "../components/Navbar/Navbar"
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    // Handle Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validation
    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            alert("Signup Successful!");
        }
    };

    return (

        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-5">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* NAME */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${errors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${errors.email
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-500"
                                    }`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${errors.password
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

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`w-full p-3 pr-12 border rounded-lg outline-none focus:ring-2 ${errors.confirmPassword
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

                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
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
    )
}

export default Signup
