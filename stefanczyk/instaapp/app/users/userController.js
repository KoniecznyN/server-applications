const userController = {
  encryptPass: async (password) => {
    let encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  },
  decryptPass: async (userpass, encrypted) => {
    let decrypted = await compare(userpass, encrypted);
    return decrypted;
  },
  addUser: () => {},
};

export { userController };
