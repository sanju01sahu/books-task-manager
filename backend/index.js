const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

//importing different router
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route");

const app = express();

//Application level middleware
app.use(express.json());
app.use(cors());

//Connectionn to mongo db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("server is working");
});

// API routes
app.use("/user", authRoutes);
app.use("/task", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
