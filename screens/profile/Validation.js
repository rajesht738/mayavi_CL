import * as yup from "yup";
export const registerValidationSchema = yup.object().shape({
    vehicle_number: yup.string().required("Vehicle number is required"),
    firstName: yup
      .string()
      .min(2, ({ min }) => `First name must be at least ${min} characters`)
      .required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    mobile: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required("A phone number is required"),
    
    alternate_mobile: yup.number().required("Alternate mobile is required"),
  });