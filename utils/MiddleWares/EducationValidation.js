import { validationResult } from "express-validator";

export const validateEducationInfo = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { Education } = req.body;
    const {
      userId,
      institution,
      institutionLocation,
      degree,
      fieldOfStudy,
      startYear,
    } = Education;
    if (
      !userId ||
      !institution ||
      !institutionLocation ||
      !degree ||
      !fieldOfStudy ||
      !startYear
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    next();
  } catch (error) {
    console.error("Error during validation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
