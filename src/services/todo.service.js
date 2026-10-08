const Todo = require("../models/todo.model");

async function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    description: data.description,
    category: data.category, // ---> Tambahkan ini agar category tersimpan
    owner: data.owner,
  });
  return await todo.save();
}

async function getAllTodos(ownerId, queryOptions) {
  const { page = 1, limit = 10, completed, sortBy = "createdAt", order = "desc", search } = queryOptions;

  const filter = { owner: ownerId };

  // Filter berdasarkan status completed, hanya jika parameter dikirim
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  // ---> Tambahkan filter pencarian (search) berdasarkan title atau description
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name"), // Opsional: agar data category ikut ter-populate jika berupa relasi
    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

async function getAllTodosForAdmin(queryOptions) {
  const { page = 1, limit = 10, completed, sortBy = "createdAt", order = "desc", search } = queryOptions;

  const filter = {};

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  // ---> Tambahkan filter pencarian untuk admin juga
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit))
      .populate("owner", "name email")
      .populate("category", "name"),
    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

async function getTodoById(id) {
  return await Todo.findById(id)
    .populate("owner", "name email")
    .populate("category", "name");
}

async function updateTodo(id, data) {
  return await Todo.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description,
      completed: data.completed,
      category: data.category,     // ---> Tambahkan ini
      updated_by: data.updated_by, // ---> Tambahkan ini agar updated_by tercatat
    },
    { new: true, runValidators: true }
  );
}

async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}

async function getSummaryStats() {
  const totalTodos = await Todo.countDocuments();
  const completedTodos = await Todo.countDocuments({ completed: true });
  const pendingTodos = totalTodos - completedTodos;

  return { totalTodos, completedTodos, pendingTodos };
}

module.exports = {
  createTodo,
  getAllTodos,
  getAllTodosForAdmin,
  getTodoById,
  updateTodo,
  deleteTodo,
  getSummaryStats,
};