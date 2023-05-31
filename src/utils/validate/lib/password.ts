import type Validation from "../types/validation.type";
import type ValidationError from "../types/validationError.type";

const validations_analysis: { [key: string]: string } = {
  minLength: "length",
  minLowercase: "lowercaseCount",
  minUppercase: "uppercaseCount",
  minNumbers: "numberCount",
  minSymbols: "symbolCount",
};

const validations: { [key: string]: number } = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const validationErrorCodes: { [key: string]: string } = {
  PASSWORD_TOO_SHORT: "password_too_short",
  PASSWORD_DOESNT_CONTAIN_MIN_LOWERCASE: "password_doesnt_contain_min_lowercase",
  PASSWORD_DOESNT_CONTAIN_MIN_UPPERCASE: "password_doesnt_contain_min_uppercase",
  PASSWORD_DOESNT_CONTAIN_MIN_NUMBERS: "password_doesnt_contain_min_numbers",
  PASSWORD_DOESNT_CONTAIN_MIN_SYMBOLS: "password_doesnt_contain_min_symbols",
};

const validationErrorsObject: { [key: string]: ValidationError } = {
  minLength: {
    code: validationErrorCodes.PASSWORD_TOO_SHORT,
    message: `Contraseña debe tener al menos ${validations.minLength} caracteres`,
    field: "password",
  },
  minLowercase: {
    code: validationErrorCodes.PASSWORD_DOESNT_CONTAIN_MIN_LOWERCASE,
    message: `Contraseña debe tener al menos ${validations.minLowercase} caracter${
      validations.minLowercase > 1 ? "es" : ""
    } singular${validations.minLowercase > 1 ? "es" : ""}`,
    field: "password",
  },
  minUppercase: {
    code: validationErrorCodes.PASSWORD_DOESNT_CONTAIN_MIN_UPPERCASE,
    message: `Contraseña debe tener al menos ${validations.minUppercase} caracter${
      validations.minUppercase > 1 ? "es" : ""
    } singular${validations.minUppercase > 1 ? "es" : ""}`,
    field: "password",
  },
  minNumbers: {
    code: validationErrorCodes.PASSWORD_DOESNT_CONTAIN_MIN_NUMBERS,
    message: `Contraseña debe tener al menos ${validations.minNumbers} caracter${
      validations.minNumbers > 1 ? "es" : ""
    } numérico${validations.minNumbers > 1 ? "s" : ""}`,
    field: "password",
  },
  minSymbols: {
    code: validationErrorCodes.PASSWORD_DOESNT_CONTAIN_MIN_SYMBOLS,
    message: `Contraseña debe tener al menos ${validations.minSymbols} caracter${
      validations.minSymbols > 1 ? "es" : ""
    } especial${validations.minSymbols > 1 ? "es" : ""}`,
    field: "password",
  },
};

export const passwordValidationErrorsArray = Object.values(validationErrorsObject);

const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex = /^[0-9]$/;
const symbolRegex = /^[-#!$@%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;

/*
 * Original Author: validatorjs
 * Counts number of occurrences of each char in a string
 * could be moved to util/ ?
 */
function countChars(str: string) {
  let result: { [key: string]: number } = {};
  Array.from(str).forEach((char) => {
    result[char] = result[char] ? result[char] + 1 : 1;
  });
  return result;
}

/*
 * Original Author: validatorjs
 * Return information about a password
 */
function analyzePassword(password: string) {
  let charMap = countChars(password);
  let analysis: { [key: string]: number } = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0,
  };
  Object.keys(charMap).forEach((char) => {
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}

export default function password(password: string): Validation {
  const analysis = analyzePassword(password);
  const errors: Array<ValidationError> = [];
  Object.keys(validations).forEach((validation: string) => {
    if (analysis[validations_analysis[validation]] < validations[validation])
      errors.push(validationErrorsObject[validation]);
  });
  let validation: Validation = {
    hasErrors: errors.length > 0,
    errors: errors,
  };
  return validation;
}
