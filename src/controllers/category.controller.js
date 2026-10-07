const Category = require("../models/category.model");

// Mendapatkan semua kategori
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};

// Membuat kategori baru
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: { category: newCategory },
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
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: { category: updatedCategory },
    });
  } catch (error) {
    next(error);
  }
};

// Menghapus kategori
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};