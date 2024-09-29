/**
 * Validates a form field based on the provided rules.
 *
 * @function validateField
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} value - The current value of the field.
 * @param {Object} rules - An object containing validation rules for the field.
 * @returns {string|null} Returns an error message string if validation fails, or `null` if the field is valid.
 *
 * @description This function checks if the field value meets the required validation rules, including required, pattern matching, and minimum length. If validation fails, it returns the appropriate error message; otherwise, it returns `null`.
 */
export function validateField(fieldName, value, rules) {
  const rule = rules[fieldName];

  if (rule) {
    if (rule.required && !value) {
      return 'This field is required.';
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.errorMessage;
    }
    if (rule.minLength && value.length < rule.minLength) {
      return rule.errorMessage;
    }
  }

  return null;
}
