import EducationInfoModel from "../Model/Education.Model.js";

export const CreateEducation = async (req, res) => {
  try {
    const { Education } = req.body;
    const {
      userId,
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      description,
      institutionLocation,
      GPA,
    } = Education;

    const newEducationInfo = new EducationInfoModel({
      userId,
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      description,
      institutionLocation,
      GPA,
    });

    // Save the new education info to the database
    await newEducationInfo.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Education information created successfully",
      data: newEducationInfo,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const GetAllEducation = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const educationInfo = await EducationInfoModel.find({ userId: uid });

    if (!educationInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Education information not found" });
    }
    res.status(200).json({ success: true, data: educationInfo });
  } catch (error) {
    console.error("Error in GetAllEducation:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const UpdateEducation = async (req, res) => {
  try {
    const { eid } = req.params;
    const { Education } = req.body;

    if (!eid) {
      return res
        .status(400)
        .json({ success: false, message: "Education ID is required" });
    }

    const existingEducation = await EducationInfoModel.findById(eid);
    if (!existingEducation) {
      return res
        .status(404)
        .json({ success: false, message: "Education data not found" });
    }

    await EducationInfoModel.findByIdAndUpdate(eid, Education, { new: true });

    res.status(200).json({ success: true, message: "Education data updated" });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const DeleteEducation = async (req, res) => {
  try {
    const { eid } = req.params;

    if (!eid) {
      return res.status(404).json({ success: false, message: "Id Not Found" });
    }

    const isExist = await EducationInfoModel.findByIdAndDelete(eid);

    if (!isExist) {
      return res.status(400).json({ success: false, message: "Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Education Data Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
