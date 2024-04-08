import ExperienceModal from "../Model/Experience.Model.js";

export const createExperience = async (req, res) => {
  try {
    const { Experience } = req.body;
    const {
      company,
      role,
      startDate,
      userId,
      endDate,
      skillsUsed,
      description,
    } = Experience;

    // Validate input
    if (
      !company ||
      !userId ||
      !role ||
      !startDate ||
      !endDate ||
      !skillsUsed ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new experience object
    const newExperience = new ExperienceModal({
      company,
      role,
      startDate,
      endDate,
      description,
      skillsUsed,
      userId,
    });

    // Save the experience to the database
    await newExperience.save();

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience: newExperience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { Experience } = req.body;
    const { eid } = req.params;
    const {
      company,
      role,
      startDate,
      userId,
      endDate,
      skillsUsed,
      description,
    } = Experience;
    if (
      !company ||
      !userId ||
      !role ||
      !startDate ||
      !endDate ||
      !skillsUsed ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the experience exists
    const experience = await ExperienceModal.findByIdAndUpdate(
      eid,
      Experience,
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExperience = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      res.status(400).json({ success: false, message: "ID Required " });
    }
    const allExperiences = await ExperienceModal.find({ userId: uid });
    if (allExperiences.lenght === 0) {
      res
        .status(400)
        .json({ success: false, message: "Experience Not  Found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience Found Successfully",
      allExperiences,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteExperience = async (req, res) => {
  try {
    const { eid } = req.params;
    if (!eid) {
      return res.status(400).json({ success: false, message: "Cannot get ID" });
    }

    const existingExperience = await ExperienceModal.findById(eid);
    if (!existingExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    await ExperienceModal.findByIdAndDelete(eid);

    return res
      .status(200)
      .json({ success: true, message: "Experience deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
