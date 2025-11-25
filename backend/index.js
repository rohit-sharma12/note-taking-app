require("dotenv").config();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

const jwt = require("jsonwebtoken");

connectDB();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", async (req, res) => {
    res.json({ data: "Hello man" })
})

app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);
app.listen(8000);

module.exports = app;