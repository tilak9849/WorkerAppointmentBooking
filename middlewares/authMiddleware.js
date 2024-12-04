const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        // Ensure the header is present and properly formatted
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                message: 'Authorization header missing or invalid',
                success: false


            });
        }
        



        const token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Authentication failed',
                    success: false
                });
            }

            // Attach the user ID from the token payload to the request object
            req.body.userId = decoded.id;
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error',
            success: false
        });
    }
};
