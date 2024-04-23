const Task = require("../models/Task");
const { validateObjectId } = require("./utils/validation");


// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user.id });
//     res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
//   }
//   catch (err) {
//     console.error(err);
//     return res.status(500).json({ status: false, msg: "Internal Server Error" });
//   }
// }

exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 4; // Default limit to 4 tasks per page

    let query = { user: req.user.id };

    // Check if search query exists
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i'); // Case-insensitive search
      query.description = searchRegex;
    }

    const totalCount = await Task.countDocuments(query); // Total count of tasks

    const tasks = await Task.find(query)
      .skip((page - 1) * limit) // Skip items based on current page and limit
      .limit(limit); // Limit the number of items returned per page

    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    res.status(200).json({
      tasks,
      page,
      totalPages,
      totalCount,
      status: true,
      msg: "Tasks retrieved successfully.."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.postTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }
    const task = await Task.create({ user: req.user.id, description });
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// exports.deleteTask = async (req, res) => {
//   // const id = req.params.taskId
//   try {

//     const confirmation = req.body.confirmation;
//     if (!confirmation || confirmation !== 'true') {
//       return res.status(400).json({ message: 'Confirmation required for deletion' });
//     }

//     if (!validateObjectId(req.params.taskId)) {
//       return res.status(400).json({ status: false, msg: "Task id not valid" });
     
//     }
//     console.log(1)
   
//     let task = await Task.findById(req.params.taskId);
//     if (!task) {
//       return res.status(400).json({ status: false, msg: "Task with given id not found" });
//     }

//     console.log(2)
//     if (task.user != req.user.id) {
//       return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
//     }
//     console.log(3)
//     // Check if confirmation flag is set in the request body
//     // if (!req.body.confirmation) {
//     //   return res.status(400).json({ status: false, msg: "Confirmation required" });
//     // }
   
//     console.log(4)
//       await Task.findByIdAndDelete(req.params.taskId);
//       res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    
//       console.log(5)
   
//   }
//   catch (err) {
//     console.error(err);
//     return res.status(500).json({ status: false, msg: "Internal Server Error" });
//   }
// }
