const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      enum:["todo", "inprogress", "done"],
      default: "todo",
    }
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
