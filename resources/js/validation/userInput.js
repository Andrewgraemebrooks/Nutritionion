import validator from "validator"
import isEmpty from "./isEmpty"
import { Map } from "immutable"

/**
 * Validates the user input before sending it to the API
 * @param {Any} userInput
 * @returns {Object} Returns an object containing any potential errors, a boolean to indicate the presence of errors,
 *  and the validated user input.
 */
const validateUserInput = (userInput) => {
  // Create an errors object to store errors
  let errors = new Map()

  // Validator only handles strings, so set it to an empty string if an empty object, null or undefinied.
  userInput = !isEmpty(userInput) ? userInput : ""

  // Adds an error if the string is empty.
  if (validator.isEmpty(userInput)) {
    errors = errors.set("isEmpty", "You must enter an ingredient to search")
  }

  return {
    errors,
    noErrors: errors.isEmpty(),
  }
}

export default validateUserInput
