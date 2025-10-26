import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên quán ăn là bắt buộc"],
    },
    address: {
      type: String,
      required: [true, "Địa chỉ là bắt buộc"],
    },
    mapUrl: {
      type: String,
      required: [true, "Cần có link Google Map"],
    },
    menuImage: {
      type: String, // lưu tên file ảnh hoặc URL
      default: "",
    },
    rating: {
      type: String,
      enum: ["Ăn ngon", "Ổn áp", "Tạm được", "Không ngon"], // list cố định
      default: "Ổn áp",
    },
    note: {
      type: String, // mô tả ngắn về quán
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false, // false = đang hoạt động, true = đã xoá mềm
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
