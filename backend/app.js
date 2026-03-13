const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const songsRouter = require("./routes/songs.route");
const imagekitRouter = require("./routes/imagekit.route");
const app = express();

app.use(cors());
app.use(express.json());

const connectTodb = require("./db/db");

// 1. Database Connection
connectTodb();

// 3. ImageKit Auth Route for Frontend Uploads
app.use("/api/imagekit", imagekitRouter);

// 4. Song Routes (CRUD Operations for ImageKit Songs)
app.use("/api/songs", songsRouter);


module.exports = app;
