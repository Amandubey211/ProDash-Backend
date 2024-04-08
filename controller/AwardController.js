import AwardModel from "../Model/Awards.Model.js";

// Controller function to create a new award
const createAward = async (req, res) => {
  try {
    const { Award } = req.body;
    const {
      role,
      companyOrInstitute,
      certification,
      grade,
      userId,
      description,
      dateReceived,
    } = Award;

    // Check if any required field is empty
    if (
      !role ||
      !companyOrInstitute ||
      !certification ||
      !grade ||
      !userId ||
      !dateReceived
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: null,
      });
    }

    // Create a new award instance
    const award = new AwardModel({
      role,
      companyOrInstitute,
      certification,
      grade,
      dateReceived,
      userId,
      description,
    });

    // Save the award to the database
    await award.save();

    res.status(201).json({
      success: true,
      message: "created successfully",
      data: award,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating award",
      error: error.message,
    });
  }
};

// Controller function to get all awards
const getAwards = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    // Fetch all awards from the database
    const awards = await AwardModel.find({ userId: uid });
    if (!awards) {
      return res.status(400).json({
        success: false,
        message: "Awards Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Awards retrieved successfully",
      awards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching awards",
      error: error.message,
    });
  }
};

// Controller function to update an award
const updateAward = async (req, res) => {
  try {
    const { Award } = req.body;
    const {
      role,
      companyOrInstitute,
      certification,
      grade,
      userId,
      description,
      dateReceived,
    } = Award;
    // Check if any required field is empty
    if (!role || !companyOrInstitute || !certification || !grade || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: null,
      });
    }

    const award = await AwardModel.findById(req.params.aid);

    // Check if the award exists
    if (!award) {
      return res
        .status(404)
        .json({ success: false, message: "Award not found", error: null });
    }

    // Update award fields
    award.role = role;
    award.companyOrInstitute = companyOrInstitute;
    award.certification = certification;
    award.grade = grade;
    award.userId = userId;
    award.description = description;
    award.dateReceived = dateReceived;

    // Save the updated award to the database
    await award.save();

    res.status(200).json({
      success: true,
      message: "Award updated successfully",
      data: award,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating award",
      error: error.message,
    });
  }
};

// Controller function to delete an award
const deleteAward = async (req, res) => {
  try {
    const award = await AwardModel.findByIdAndDelete(req.params.aid);

    // Check if the award exists
    if (!award) {
      return res
        .status(404)
        .json({ success: false, message: "Award not found", error: null });
    }

    res.status(200).json({
      success: true,
      message: "Award deleted successfully",
      data: award,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting award",
      error: error.message,
    });
  }
};

// Controller function to get a single award by ID
// const getAwardById = async (req, res) => {
//     try {
//       const award = await AwardModel.findById(req.params.id);

//       // Check if the award exists
//       if (!award) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Award not found", error: null });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Award retrieved successfully",
//         data: award,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Error fetching award",
//         error: error.message,
//       });
//     }
//   };

export { createAward, getAwards, updateAward, deleteAward };
