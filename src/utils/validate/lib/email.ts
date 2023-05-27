import type Validation from "../types/validation.type";
import type ValidationError from "../types/validationError.type";
import isEmail from "validator/lib/isEmail";

export default function email(email: string, defineValidation?: { required?: boolean; invalid?: boolean}): Validation {

  const validations: { [key: string]: any } = {
    required: defineValidation?.required != undefined ? defineValidation?.required : true,
    invalid: defineValidation?.invalid != undefined ? defineValidation?.invalid : true,
  };
  
  
  const validationErrorCodes: { [key: string]: string } = {
    REQUIRED_EMAIL: "required_email",
    INVALID_EMAIL: "invalid_email",
  };
  
  const validationErrorsObject: { [key: string]: ValidationError } = {
    required: {
      code: validationErrorCodes.REQUIRED_EMAIL,
      message: "Es requerido",
      field: "email",
    },
    invalid: {
      code: validationErrorCodes.INVALID_EMAIL,
      message: "Es inválido",
      field: "email",
    },
  };

  const errors: Array<ValidationError> = [];
  if (validations.required && !email) errors.push(validationErrorsObject.required);
  if (validations.invalid && email && !isEmail(email)) errors.push(validationErrorsObject.invalid);
  let validation: Validation = {
    hasErrors: errors.length > 0,
    errors: errors,
  };
  return validation;
}
