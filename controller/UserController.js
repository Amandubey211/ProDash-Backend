import AwardModel from "../Model/Awards.Model.js";
import EducationInfoModel from "../Model/Education.Model.js";
import ExperienceModal from "../Model/Experience.Model.js";
import ProjectModel from "../Model/Project.Model.js";
import UserAuthModel from "../Model/UserAuth.Model.js";
import UserInfoModel from "../Model/UserInfo.Model.js";

export const GetUserController = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a user ID" });
    }

    const user = await UserAuthModel.findById(uid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const currentTime = new Date().getTime();
    const expirationTime = currentTime + 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const expires = new Date(expirationTime);

    res.cookie("aman", "sdfsdfsdfsghh", { expires });

    res.status(200).json({
      success: true,
      message: `Welcome ${user.userName.toUpperCase()}!`,
      user: {
        userName: user.userName,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const CalculateProfileCompleteness = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "ID Required",
        data: { completeness: 0 },
      });
    }
    // Fetch data from modular models
    const [userInfo, projectInfo, educationInfo, experienceInfo, achievements] =
      await Promise.all([
        UserInfoModel.findOne({ userId: uid }),
        ProjectModel.findOne({ userId: uid }),
        EducationInfoModel.findOne({ userId: uid }),
        ExperienceModal.findOne({ userId: uid }),
        AwardModel.findOne({ userId: uid }),
      ]);

    // Calculate completeness based on the presence of data
    let completeness = 0;
    const incompleteData = [];

    if (!userInfo) incompleteData.push("Personal info +20");
    if (!projectInfo) incompleteData.push("Project info +15 ");
    if (!educationInfo) incompleteData.push("Education info +10");
    if (!experienceInfo) incompleteData.push("Experience info +10");
    if (!achievements) incompleteData.push("Achivements info +15");

    if (userInfo) completeness += 20;
    if (projectInfo) completeness += 15;
    if (educationInfo) completeness += 10;
    if (experienceInfo) completeness += 10;
    if (achievements) completeness += 15;

    return res.status(200).json({
      success: true,
      message: "Profile completeness calculated",
      profileStat: { completeness, incompleteData, outOf: 70 }, //change outOF if you add more later
    });
  } catch (error) {
    console.error("Error calculating profile completeness:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      // data: { completeness: 0 },
    });
  }
};
