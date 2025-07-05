const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");  // ✅ import todo routes

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://to-do-app-bae5.onrender.com"
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
