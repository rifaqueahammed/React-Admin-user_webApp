const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    verifyToken :(req, res, next) => {
        const token = req.body.token.token;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if (token === "") {
            res.json({ error: "no token provided" });
        }
        else{
            jwt.verify(token,jwtSecretKey,(err, decoded) => {
                if (err) {
                    console.log(err)
                    res.json({ error: "Authentication failed" });
                } else {
                    next();
                }
            })
        }
    }
}



