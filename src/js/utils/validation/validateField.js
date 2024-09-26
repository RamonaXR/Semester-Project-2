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
