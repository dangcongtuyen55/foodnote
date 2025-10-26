import express from "express";
import path from "path";

import upload from "../middlewares/upload.js";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  softDeleteRestaurant,
  restoreRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

// thêm upload.single("menuImage") vào route POST và PUT
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", upload.single("menuImage"), createRestaurant);
router.put("/:id", upload.single("menuImage"), updateRestaurant);
router.put("/:id/restore", restoreRestaurant);
router.delete("/:id", softDeleteRestaurant);

export default router;
