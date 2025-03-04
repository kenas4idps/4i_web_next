export const validateEmail = (value: string) => {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return !expression.test(value);
};

export const validateName = (value: string) => {
  const expression = /^[A-Za-zÀ-ÖØ-öø-ÿ-' \u4e00-\u9fa5]+$/;
  return !expression.test(value);
};

export const validatePhoneNumber = (value: string) => {
  const expression = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return !expression.test(value);
};
