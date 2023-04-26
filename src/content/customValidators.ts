import validator from "validator";

export function isCreditCardNumber(value: string): boolean {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
  const jcbRegex = /^(?:2131|1800|35\d{3})\d{11}$/;

  const sanitizedValue = value.replace(/\s+/g, "");

  return (
    visaRegex.test(sanitizedValue) ||
    mastercardRegex.test(sanitizedValue) ||
    amexRegex.test(sanitizedValue) ||
    discoverRegex.test(sanitizedValue) ||
    dinersClubRegex.test(sanitizedValue) ||
    jcbRegex.test(sanitizedValue) ||
    validator.isCreditCard(sanitizedValue) // Fallback check
  );
}

export function isIBAN(value: string): boolean {
  const ibanRegex = /^([A-Za-z]{2}\d{2}\s*(?:(?:\d{4}\s*){4}\d{3}|\d{1,32}))$/;
  return ibanRegex.test(value);
}

export function isPassportNumber(value: string): boolean {
  const passportRegex = /^[a-zA-Z0-9]{6,10}$/;
  return passportRegex.test(value);
}

export function isUSBankRoutingNumber(value: string): boolean {
  const usBankRoutingNumberRegex = /^(\d{9})$/;
  return usBankRoutingNumberRegex.test(value);
}

export function isUSDriversLicense(value: string): boolean {
  const usDriversLicenseRegex = /^([A-Za-z]{1}\d{3}\s*\d{2}\s*\d{4})$/;
  return usDriversLicenseRegex.test(value);
}

export function isUSSocialSecurityNumber(value: string): boolean {
  const ssnRegex = /^(?!000|.+0{4})(?:\d{9}|\d{3}-\d{2}-\d{4})$/;
  return ssnRegex.test(value);
}
