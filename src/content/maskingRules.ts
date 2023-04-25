import validator from "validator";
import { isUSSocialSecurityNumber } from "./customValidators";

export const maskingRules: MaskingRule[] = [
  {
    name: "btcAddress",
    validator_func: validator.isBtcAddress,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "creditCard",
    validator_func: validator.isCreditCard,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "currency",
    validator_func: (value: string) =>
      validator.isCurrency(value, {
        allow_space_after_symbol: true,
        require_symbol: true,
      }),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "email",
    validator_func: validator.isEmail,
    mask: (value: string) => "email@example.com",
  },
  {
    name: "ethereumAddress",
    validator_func: validator.isEthereumAddress,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "hash",
    validator_func: (value: string) => validator.isHash(value, "sha256"),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "ip",
    validator_func: validator.isIP,
    mask: (value: string) => value.replace(/./g, "x"),
  },
  {
    name: "isbn",
    validator_func: validator.isISBN,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "issn",
    validator_func: validator.isISSN,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "passportNumber",
    validator_func: validator.isPassportNumber,
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "postcode",
    validator_func: (value: string) => validator.isPostalCode(value, "any"),
    mask: (value: string) => value.replace(/./g, "*"),
  },
  {
    name: "phone",
    validator_func: validator.isMobilePhone,
    mask: (value: string) => "xxx-xxx-xxxx",
  },
  {
    name: "ssn",
    validator_func: isUSSocialSecurityNumber,
    mask: (value: string) => "xxx-xx-xxxx",
  },
];
