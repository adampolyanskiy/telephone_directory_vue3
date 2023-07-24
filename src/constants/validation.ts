export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Поле обязательно',
  MIN_LENGTH: 'Поле должно содержать минимум {0} символ(ов)',
  MAX_LENGTH: 'Поле должно содержать максимум {0} символ(ов)',
  CYRILLIC_ONLY: 'Поле должно содержать только кириллицу',
  PHONE_LENGTH: 'Номер должен состоять из цифр и их количество должно быть равно 11'
};

export const VALIDATION_LEN = {
  FIRSTNAME: {
    MIN: 2,
    MAX: 20
  },
  LASTNAME: {
    MIN: 2,
    MAX: 20
  },
  MIDDLENAME: {
    MIN: 2,
    MAX: 20
  },
  FIRST_NAME: {
    MIN: 2,
    MAX: 20
  },
  ADDRESS: {
    MIN: 2,
    MAX: 20
  },
  CELLPHONE: {
    MIN: 11,
    MAX: 11
  },
  HOMEPHONE: {
    MIN: 11,
    MAX: 11
  }
};

export const VALIDATION_REGEX = {
  CYRILLIC: /^[А-Яа-яёЁ]+$/,
  TELEPHONE: /[0-9]{11,11}/
};
