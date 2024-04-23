const errorHandler = (error, res) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { errorHandler };
