export function paymentTypeCheck(secretKey: string) {
  const sS = secretKey?.split("_");
  if (sS?.includes("pi")) {
    return "oneTime";
  } else {
    return "recurring";
  }
}
