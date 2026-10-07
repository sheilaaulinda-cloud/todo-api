function errorHandler(err, req, res, next) {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose ValidationError — misal field "title" wajib diisi tapi kosong
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Mongoose CastError — misal ID yang dikirim bukan format ObjectId yang valid
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field "${err.path}": ${err.value}`;
  }

  // Mongoose duplicate key error — misal field unique sudah dipakai data lain
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for field: ${field}`;
  }

  // Struktur response dasar
  const response = {
    success: false,
    message,
  };

  // Stack trace HANYA disertakan jika berada di mode development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;