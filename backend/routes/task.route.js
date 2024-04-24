const express = require("express");
const { authenticateUser } = require("../middlewares/auth.middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TaskModel = require("../models/task.model");
const errorHandler = require("../middlewares/error.middleware");
const router = express.Router();

// Routes beginning with /tasks/

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const tasks = await TaskModel.find({ user: req.user.id });
    res
      .status(200)
      .json({ tasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

router.get("/getsingle/:taskId", authenticateUser, async (req, res) => {
  try {
    const task = await TaskModel.findOne({
      user: req.user.id,
      _id: req.params.taskId,
    });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res
      .status(200)
      .json({ task, status: true, msg: "Task found successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

router.get("/search", authenticateUser, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 25; // Default limit to 4 tasks per page

    const query = buildQuery(req.query, req.user.id);

    const totalCount = await TaskModel.countDocuments(query); // Total count of tasks

    const tasks = await TaskModel.find(query)
      .skip((page - 1) * limit) // Skip items based on current page and limit
      .limit(limit); // Limit the number of items returned per page

    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    res.status(200).json({
      tasks,
      page,
      totalPages,
      totalCount,
      status: true,
      msg: "Tasks retrieved successfully..",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

router.post("/post", authenticateUser, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: "Description of task not found" });
    }
    const task = await TaskModel.create({ user: req.user.id, description });
    res
      .status(200)
      .json({ task, status: true, msg: "Task created successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

router.put("/put/:taskId", authenticateUser, async (req, res) => {
  try {
    const { description, status } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: "Description of task not found" });
    }

    task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      { description, status },
      { new: true }
    );
    res
      .status(200)
      .json({ task, status: true, msg: "Task updated successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

router.delete("/delete/:taskId", authenticateUser, async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

function buildQuery(queryParams, userId) {
  const query = { user: userId };

  if (queryParams.search) {
    const searchRegex = new RegExp(queryParams.search, "i");
    query.description = searchRegex;
  }

  if (queryParams.status) {
    query.status = queryParams.status;
  }

  return query;
}

module.exports = router;
