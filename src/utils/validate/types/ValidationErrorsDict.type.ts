import type ValidationError from "./validationError.type"

export default interface ValidationErrorsDict {
  [key: string]: Array<ValidationError>
}