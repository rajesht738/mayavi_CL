import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
    vehicle_number: yup
      .string()
      .required("Vehicle Number is required"),
    firstName: yup
      .string()
      .min(2, ({ min }) => `First name must be at least ${min} characters`)
      .required("First name is required"),
    lastName: yup
      .string()
      .required("Last name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    mobile: yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required("A phone number is required"),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        "Password must have a special character"
      )
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });