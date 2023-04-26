import validator from "validator";
import {
  isCreditCardNumber,
  isIBAN,
  isUSSocialSecurityNumber,
  isUSBankRoutingNumber,
  isUSDriversLicense,
} from "./customValidators";

export const maskingRules: MaskingRule[] = [
  {
    ruleType: "btcAddress",
    displayName: "Bitcoin Address",
    unicode: "U+20BF",
    validator_func: validator.isBtcAddress,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "custom",
    displayName: "Custom",
    unicode: "U+1F6E1",
    validator_func: () => false,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "creditCard",
    displayName: "Credit Card",
    unicode: "U+1F4B3",
    validator_func: isCreditCardNumber,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "currency",
    displayName: "Currency",
    unicode: "U+1F4B5",
    validator_func: (value: string) =>
      validator.isCurrency(value, {
        allow_space_after_symbol: true,
        require_symbol: true,
      }),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "email",
    displayName: "Email",
    unicode: "U+2709",
    validator_func: validator.isEmail,
    mask: (value: string) => "email@example.com",
  },
  {
    ruleType: "ethereumAddress",
    displayName: "Ethereum Address",
    unicode: "U+1F4E6",
    validator_func: validator.isEthereumAddress,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "hash",
    displayName: "Hash",
    unicode: "U+1F4C8",
    validator_func: (value: string) => validator.isHash(value, "sha256"),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "iban",
    displayName: "IBAN",
    unicode: "U+1F4B6",
    validator_func: isIBAN,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "ip",
    displayName: "IP Address",
    unicode: "U+1F310",
    validator_func: validator.isIP,
    mask: (value: string) => value.replace(/./g, "x"),
  },
  {
    ruleType: "issn",
    displayName: "ISSN",
    unicode: "U+1F4DA",
    validator_func: validator.isISSN,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  // {
  //   ruleType: "passportNumber",
  //   displayName: "Passport Number",
  //   unicode: "U+1F4C1",
  //   validator_func: isPassportNumber,
  //   mask: (value: string) => value.replace(/./g, "*"),
  // },
  {
    ruleType: "postcode",
    displayName: "Postcode",
    unicode: "U+1F3E4",
    validator_func: (value: string) => validator.isPostalCode(value, "any"),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "phone",
    displayName: "Phone",
    unicode: "U+260E",
    validator_func: validator.isMobilePhone,
    mask: (value: string) => "xxx-xxx-xxxx",
  },
  {
    ruleType: "ssn",
    displayName: "Social Security Number",
    unicode: "U+1F46E",
    validator_func: isUSSocialSecurityNumber,
    mask: (value: string) => "xxx-xx-xxxx",
  },
  {
    ruleType: "usBankRoutingNumber",
    displayName: "US Bank Routing Number",
    unicode: "U+1F3E6",
    validator_func: isUSBankRoutingNumber,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    ruleType: "usDriversLicense",
    displayName: "US Driver's License",
    unicode: "U+1F699",
    validator_func: isUSDriversLicense,
    mask: (value: string) => value.replace(/./g, "*"),
  },
];

export function getMaskingRule(
  ruleType: SensitiveDataType
): MaskingRule | undefined {
  return maskingRules.find((rule) => rule.ruleType === ruleType);
}
