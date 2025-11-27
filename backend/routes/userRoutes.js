const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../utilities");

const router = express.Router();

router.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || fullName.trim().length < 3) {
            return res.status(400).json({ error: true, message: "Full Name must be at least 3 characters" });
        }

        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: true, message: "Invalid email format" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: true, message: "Password must be at least 6 characters long" });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "36000m" }
        );

        return res.json({
            error: false,
            user: { id: user._id, fullName, email },
            accessToken,
            message: "Registration Successful",
        });

    } catch (error) {
        console.log("SIGNUP ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: true, message: "Invalid password" });
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

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get("/get-user", authenticationToken, async (req, res) => {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(401).json({ error: true, message: "Invalid token" });
        }

        const isUser = await User.findById(userId);

        if (!isUser) {
            return res.status(401).json({ error: true, message: "User not found" });
        }

        return res.json({
            error: false,
            user: { fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdAt:isUser.createdAt},
            message: "User fetched successfully",
        });

    } catch (error) {
        console.log("GET USER ERROR:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
