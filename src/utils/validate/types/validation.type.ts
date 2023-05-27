import type ValidationError from "./validationError.type";

export default interface Validation {
  hasErrors: boolean;
  errors?: Array<ValidationError>;
}
