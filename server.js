import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import restaurantRoutes from "./src/routes/restaurantRoute.js";

dotenv.config();

const app = express();

// 1️⃣ Middleware CORS
app.use(
  cors({
    origin: ["https://food-notes-frontend.vercel.app"], // domain Vercel của bạn
    credentials: true,
  })
);

// 2️⃣ Middleware parse JSON
app.use(express.json());

// 3️⃣ Kết nối MongoDB
connectDB();

// 4️⃣ Route test
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// 5️⃣ Route uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 6️⃣ Restaurant routes
app.use("/api/restaurants", restaurantRoutes);

// 7️⃣ Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
