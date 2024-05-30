import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;

const pass = "moje tajne hasło";

const encryptPass = async (password) => {
  let encryptedPassword = await hash(password, 10);
  return encryptedPassword;
};

const encryptedPass = await encryptPass(pass);

const decryptPass = async (userpass, encrypted) => {
  let decrypted = await compare(userpass, encrypted);
  return decrypted;
};

await decryptPass(pass, encryptedPass);
