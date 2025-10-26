import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import restaurantRoutes from "./src/routes/restaurantRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
connectDB();

// Route test
app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/restaurants", restaurantRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
