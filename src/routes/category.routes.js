const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API untuk manajemen kategori Todo
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Mengambil semua kategori
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar kategori
 *   post:
 *     summary: Membuat kategori baru
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pekerjaan Rumah
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 */
router.route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Memperbarui kategori berdasarkan ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Kategori
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pekerjaan Kantor
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       404:
 *         description: Kategori tidak ditemukan
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Kategori
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;