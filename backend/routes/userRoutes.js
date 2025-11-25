const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* ===========================
    REGISTER USER
=========================== */
router.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) return res.status(400).json({ error: true, message: "Full Name is required" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "36000m" }
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});


/* ===========================
    LOGIN USER
=========================== */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "36000m" }
    );

    const userWithoutPassword = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    return res.json({
        error: false,
        user: userWithoutPassword,
        accessToken,
        message: "Login Successful",
    });

});

module.exports = router;
