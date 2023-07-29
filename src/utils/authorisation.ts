import { decryptData } from "./localStorage";

type User = {
  // Other user fields...
  role: string | null; // Assuming the role field is a string representing the user's role.
};

export function isAdminOrManager() {
  if (typeof window !== "undefined") {
    const userData = decryptData("userdata");
    return userData?.role === "Admin";
  }
}
