import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET_KEY as string;

// Function to encrypt the data and store it in a cookie
export const encryptData = (data: object, name: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  Cookies.set(name, encrypted, { expires: 7 }); // Set cookie with a 7-day expiration
};

// Function to retrieve and decrypt the data from a cookie
export const decryptData = (name: string) => {
  const encryptedData = Cookies.get(name);
  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );
    return decryptedData;
  }
  return null;
};
