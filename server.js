/*const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");


dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));



app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});
app.get("/", (req,res)=>{
    res.send("Secure Web App Running");
});*/

/* ================= IMPORTS ================= */
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();

/* ================= APP INIT ================= */
const app = express();

/* ================= ROUTE IMPORTS ================= */
const authRoutes = require("./routes/authRoutes");

/* ================= MIDDLEWARE ================= */

// Security
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Serve frontend files
app.use(express.static("public"));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

/* ================= ROUTES ================= */

// Root route
app.get("/", (req, res) => {
    res.send("Secure Web App Running");
});

// Auth routes
app.use("/api/auth", authRoutes);

/* ================= DATABASE + SERVER START ================= */

const startServer = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        app.listen(5000, () => {
            console.log("🚀 Server running on port 5000");
        });

    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
};

startServer();
