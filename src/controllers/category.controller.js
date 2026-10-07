// Sesuaikan import model Category dengan yang ada di project Anda
// Contoh: const { Category } = require("../models"); 

// Mendapatkan semua kategori
exports.getAllCategories = async (req, res, next) => {
  try {
    // const categories = await Category.findAll();
    res.status(200).json({
      status: "success",
      message: "Get all categories successfully",
      data: [], // Ganti dengan variabel data categories dari database
    });
  } catch (error) {
    next(error);
  }
};

// Membuat kategori baru
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // const newCategory = await Category.create({ name });
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: { name }, // Ganti dengan hasil create data
    });
  } catch (error) {
    next(error);
  }
};

// Memperbarui kategori
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    // Logika update kategori berdasarkan ID
    res.status(200).json({
      status: "success",
      message: `Category with id ${id} updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Menghapus kategori
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Logika delete kategori berdasarkan ID
    res.status(200).json({
      status: "success",
      message: `Category with id ${id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};