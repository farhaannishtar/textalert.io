export function validatePhoneNumber(phoneStr: string): boolean {
  const regex = /^\d{0,10}$/;
  const result = regex.test(phoneStr);
  return result;
}
