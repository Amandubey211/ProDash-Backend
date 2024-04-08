import UserInfoModel from "../Model/UserInfo.Model.js";
import { validatePersonalInfo } from "../utils/PersonalInfoUtils.js";

export const managePersonalInfo = async (req, res) => {
  const { personalInfo } = req.body;
  const { uid } = req.params;

  // Validate personal info
  const validationErrors = validatePersonalInfo(personalInfo, uid);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing or invalid fields: ${validationErrors.join(", ")}`,
    });
  }

  try {
    let personalInfoData;

    // Check if personal info with the provided email exists
    const existingInfo = await UserInfoModel.findOne({ userId: uid });

    // Update or create personal info based on existence
    if (existingInfo) {
      personalInfoData = await UserInfoModel.findOneAndUpdate(
        { userId: uid },
        { $set: personalInfo },
        { new: true }
      );
    } else {
      personalInfoData = await UserInfoModel.create({
        userId: uid,
        ...personalInfo,
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: existingInfo
        ? "Personal info updated successfully"
        : "Personal info created successfully",
      userInfo: personalInfoData,
    });
  } catch (error) {
    // Handle server errors
    console.error("Error managing personal info:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getPersonalInfo = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res
        .status(400)
        .json({ success: false, error: "No user ID provided" });
    }

    const userInfo = await UserInfoModel.findOne({ userId: uid });

    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, error: "User information not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User information retrieved successfully",
      userInfo,
    });
  } catch (error) {
    console.error("Error in getPersonalInfo:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const managePhoto = async (req, res) => {
  try {
    const { uid } = req.params;
    const { photoUrl } = req.body;

    // Validate input
    if (!uid || !photoUrl) {
      return res.status(400).json({ success: false, error: "Bad Request" });
    }

    const isProfile = await UserInfoModel.find({ userID: uid });
    if (!isProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Please add Detail first " });
    }
    // Update profile photo
    const updatedProfile = await UserInfoModel.findOneAndUpdate(
      { userId: uid },
      { $set: { photoUrl: photoUrl } },
      { new: true }
    );

    // Check if profile was updated
    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Error in managePhoto:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
