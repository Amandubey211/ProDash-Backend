import { validateEmail, validateMobileNumber } from "./AuthUtils.js";

export const validatePersonalInfo = (personalInfo, uid) => {
  const { firstName, lastName, mobNumber, city, email, gender, headline } =
    personalInfo;
  const errors = [];

  // Required fields validation
  const requiredFields = {
    firstName,
    lastName,
    mobNumber,
    city,
    email,
    gender,
    headline,
    uid,
  };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      errors.push(key);
    }
  }

  // Email format validation
  if (!validateEmail(email)) {
    errors.push("email");
  }

  // Mobile number format validation
  if (!validateMobileNumber(mobNumber)) {
    errors.push("mobNumber");
  }

  return errors;
};
