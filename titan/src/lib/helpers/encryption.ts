import Cryptr from "cryptr";

export function encrypt(text: string) {
  const secretKey: string = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? "";
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: any) {
  if (!encryptedString) {
    throw new Error("Invalid encrypted string");
  }

  try {
    const secretKey: any = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;
    const cryptr = new Cryptr(secretKey);
    const text = cryptr.decrypt(encryptedString);
    return text;
  } catch (error) {
    console.error("Error during decryption:", error);
    throw error;
  }
}
