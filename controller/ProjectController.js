import ProjectModel from "../Model/Project.Model.js";

export const createProjectController = async (req, res) => {
  const {
    userId,
    title,
    skillsUsed,
    createdBy,
    projectPhotoURL,
    startDate,
    endDate,
    githubLink,
    role,
    progressPercentage,
    size,
    liveDemoLink,
    description,
  } = req.body;
  // Check if required fields are present
  if (
    !userId ||
    !title ||
    !skillsUsed ||
    !role ||
    !startDate ||
    !endDate ||
    !description ||
    !progressPercentage ||
    !size ||
    !createdBy
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const project = new ProjectModel({
      userId,
      title,
      skillsUsed,
      role,
      projectPhotoURL,
      startDate,
      endDate,
      progressPercentage,
      githubLink,
      size,
      liveDemoLink,
      description,
      createdBy,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProjectController = async (req, res) => {
  try {
    const { updatedProject } = req.body;
    const { pid } = req.params;

    // Check if all required fields are provided
    const requiredFields = [
      "userId",
      "title",
      "description",
      "skillsUsed",
      "createdBy",
      "startDate",
      "endDate",
      "role",
      "size",
      "progressPercentage",
    ];
    const missingFields = requiredFields.filter(
      (field) => !updatedProject[field]
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    // Check if pid is provided
    if (!pid) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    // Check if the project exists
    const isUpdated = await ProjectModel.findByIdAndUpdate(
      pid,
      updatedProject,
      {
        new: true,
      }
    );
    if (!isUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // If everything is successful, return success response
    return res
      .status(200)
      .json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const GetAllProject = async (req, res) => {
  try {
    const { uid } = req.params;
    // Check if uid is provided
    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    // Find all projects for the specified user
    const allProjects = await ProjectModel.find({ userId: uid });
    // Check if any projects were found
    if (allProjects?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No projects found for the specified user",
      });
    }
    // Return success response with the list of projects
    return res.status(200).json({ success: true, data: allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      return res.status(400).json({ success: false, message: "Cannot get ID" });
    }
    const isExist = await ProjectModel.findByIdAndDelete(pid);
    if (!isExist) {
      res.status(404).json({ success: false, message: "Project Not Found" });
    }
    res
      .status(201)
      .json({ success: true, message: "Project Deleted Successfully" });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
