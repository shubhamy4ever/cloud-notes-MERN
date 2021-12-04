var jwt = require('jsonwebtoken');
const JWT_SECRET = '$oyasauceisbest';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // took .user from verification data and stored it in req.user
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token 2" })
    }

}


module.exports = fetchuser;