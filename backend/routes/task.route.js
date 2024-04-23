const express = require("express");
const { authenticateUser } = require("../middlewares/auth.middleware");

const router = express.Router();
// Routes beginning with /api/tasks
router.get("/", authenticateUser, async (req, res) => {
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

router.get("/:taskId", authenticateUser, async (req, res) => {
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

router.post("/", authenticateUser, async (req, res) => {
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

router.put("/:taskId", authenticateUser, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: "Description of task not found" });
    }

    task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      { description },
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

router.delete("/:taskId", authenticateUser, async (req, res) => {
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

module.exports = router;
