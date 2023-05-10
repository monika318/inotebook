const jwt = require('jsonwebtoken');
const JWT_SECRET = "ThisisaTrail";

//next is to call the next function
const fetchUser = (req, res, next) => {
    //get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please enter valid token" });
    }
    try {
        const string = jwt.verify(token, JWT_SECRET);
        req.user = string.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please enter valid token" });
    }
}


module.exports = fetchUser;