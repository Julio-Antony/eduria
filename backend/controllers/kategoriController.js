import asyncHandler from 'express-async-handler'
import Kategori from '../models/kategoriModel.js'

// @desc    Get all course categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Kategori.find().populate('parent', 'name');
  res.json(categories);
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Kategori.findById(req.params.id);
  if (!category) {
  res.status(404);
  throw new Error('Kategori tidak ditemukan');
}
  res.json(category);
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, idNumber, description, parent, visibility } = req.body;

  const category = new Kategori({
    name,
    idNumber,
    description,
    parent: parent || null,
    visibility,
  });

  await category.save();
  res.status(201).json({message: "Kategori berhasil ditambahkan"});
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, idNumber, description, parent, visibility } = req.body;
  const category = await Kategori.findById(req.params.id);

  if (!category) {
  res.status(404);
  throw new Error('Kategori tidak ditemukan');
}

  category.name = name || category.name;
  category.idNumber = idNumber || category.idNumber;
  category.description = description || category.description;
  category.parent = parent || null;
  category.visibility = visibility !== undefined ? visibility : category.visibility;

  await category.save();
  res.status(200).json({message: "Kategori berhasil diperbarui"});
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Kategori.findById(req.params.id);

  if (!category) {
  res.status(404);
  throw new Error('Kategori tidak ditemukan');
}

  await category.deleteOne();
  res.status(200).json({ message: 'Kategori dihapus' });
});

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};