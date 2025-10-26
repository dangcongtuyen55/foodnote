import Restaurant from "../models/restaurantModel.js";

// 🟢 Lấy danh sách (chỉ lấy quán chưa xóa)
export const getRestaurants = async (req, res) => {
  try {
    const data = await Restaurant.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Lấy chi tiết 1 quán
export const getRestaurantById = async (req, res) => {
  try {
    const item = await Restaurant.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!item)
      return res.status(404).json({ message: "Không tìm thấy quán ăn" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Tạo mới quán ăn
export const createRestaurant = async (req, res) => {
  try {
    const body = req.body;

    // Nếu có file upload (multer + Cloudinary)
    if (req.file) {
      // CloudinaryStorage tự gán URL vào req.file.path
      body.menuImage = req.file.path;
    }

    const newItem = new Restaurant(body);
    const saved = await newItem.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🟢 Cập nhật quán ăn
export const updateRestaurant = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.menuImage = `/uploads/${req.file.filename}`;
    }

    const updated = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      updateData,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy quán ăn" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🟢 "Xóa mềm" quán ăn
export const softDeleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy quán ăn" });
    res.json({ message: "Đã chuyển quán sang trạng thái isDeleted=true" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Restore quán đã xóa
export const restoreRestaurant = async (req, res) => {
  try {
    const restored = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );
    if (!restored)
      return res.status(404).json({ message: "Không tìm thấy quán ăn" });
    res.json({ message: "Đã khôi phục quán ăn" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
