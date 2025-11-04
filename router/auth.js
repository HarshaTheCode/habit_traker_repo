import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.Token;

        if (!token) {
            return res.redirect('/login');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by email from token
        const userdata = await user.findOne({ Email: decoded.Email });

        if (!userdata) {
            res.clearCookie("Token");
            return res.redirect('/login');
        }

        // Attach user to request
        req.user = userdata;
        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        res.clearCookie("Token");
        return res.redirect('/login');
    }
};

export default protectRoute;