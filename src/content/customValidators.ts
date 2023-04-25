export function isUSSocialSecurityNumber(value: string): boolean {
  const ssnRegex = /^(?!000|.+0{4})(?:\d{9}|\d{3}-\d{2}-\d{4})$/;
  return ssnRegex.test(value);
}
