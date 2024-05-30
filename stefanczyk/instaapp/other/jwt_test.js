import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
import 'dotenv/config'

const createToken = async () => {

    let token = await sign(
        {
            email: "aaa@test.com",
            anyData: "123"
        },
        process.env.MY_PASS, // key powinien być zapisany w .env
        {
            expiresIn: "30s" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
    return token
}

const verifyToken = (token) => {

    try {
        let decoded = verify(token, process.env.MY_PASS)
        console.log({ decoded: decoded });
    }
    catch (ex) {
        console.log({ message: ex.message });
    }
}


const processToken = async () => {
    const token = await createToken()
    verifyToken(token)
}

processToken()


