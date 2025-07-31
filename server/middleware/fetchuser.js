const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Access Denied" });
    }

    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Access Denied" });
    }
};

module.exports = fetchuser;
