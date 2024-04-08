import UserTaskModel from "../Model/UserTask.Model.js";

export const CreateTask = async (req, res) => {
  const { task } = req.body;
  const {
    userId,
    title,
    description,
    taskPriority,
    dueDate,
    progressPercentage,
  } = task;

  try {
    if (!userId || !title || !description || !taskPriority || !dueDate) {
      const missingFields = [];
      if (!userId) missingFields.push("userId");
      if (!title) missingFields.push("title");
      if (!description) missingFields.push("description");
      if (!taskPriority) missingFields.push("taskPriority");
      if (!dueDate) missingFields.push("dueDate");

      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    let completionStatus = false;

    if (progressPercentage === 100) {
      completionStatus = true;
    }

    const newTask = new UserTaskModel({
      userId,
      title,
      description,
      taskPriority,
      dueDate,
      progressPercentage,
      completionStatus,
    });

    const savedTask = await newTask.save();
    res
      .status(200)
      .json({ success: true, message: "Task Created ", task: savedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const GetAllTask = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "No user ID provided" });
    }

    const allTasks = await UserTaskModel.find({ userId: uid });

    if (allTasks.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No tasks found for the user" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Tasks found", tasks: allTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const { tid } = req.params;
    const { task } = req.body;

    // Validate if all required fields are provided
    const requiredFields = [
      "userId",
      "title",
      "description",
      "taskPriority",
      "dueDate",
    ];
    const missingFields = requiredFields.filter((field) => !task[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    if (!tid) {
      return res
        .status(400)
        .json({ success: false, message: "No task ID found" });
    }

    // Check if the task exists
    const existingTask = await UserTaskModel.findById(tid);
    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Update the task
    let completionStatus = false;

    if (task.progressPercentage === 100) {
      completionStatus = true;
    }
    await UserTaskModel.findByIdAndUpdate(
      tid,
      { ...task, completionStatus },
      {
        new: true,
      }
    );

    res.status(200).json({ success: true, message: "Task updated" });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const DeleteTask = async (req, res) => {
  try {
    const { tid } = req.params;
    if (!tid) {
      return res.status(400).json({ success: false, message: "Cannot get ID" });
    }

    const existingTask = await UserTaskModel.findById(tid);
    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await UserTaskModel.findByIdAndDelete(tid);

    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
