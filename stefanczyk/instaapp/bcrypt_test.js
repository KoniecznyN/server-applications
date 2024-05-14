import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

const pass = "moje tajne hasło"

const encryptPass = async (password) => {

    let encryptedPassword = await hash(password, 10);
    console.log({ encryptedPassword: encryptedPassword });
    return encryptedPassword
}

const encryptedPass = await encryptPass(pass)
console.log(encryptedPass);

const decryptPass = async (userpass, encrypted) => {

    let decrypted = await compare(userpass, encrypted)
    console.log(decrypted);

}

await decryptPass(pass, encryptedPass)