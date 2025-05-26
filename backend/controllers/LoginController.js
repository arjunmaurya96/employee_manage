const bcrypt = require("bcrypt")
const loginData = require("../models/LoginModel");
const jwt = require('jsonwebtoken')



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // validataion 
        if (!name) {
            return res.status(400).send("Name is Required")
        }
        if (!password) {
            return res.status(400).send("Password is Required")
        }
        const user = await loginData.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User is already existt, You can login", success: false })
        }
        const LoginData = new loginData({ name, email, password });
        LoginData.password = await bcrypt.hash(password, 10);
        await LoginData.save();
        res.status(201).json({ message: "Signup Successfully ...!", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginData.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';

        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })


        res.status(200).json({ message: "Login Success ...!", success: true, data: { jwtToken, email, name: user.name }, })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false })
    }
}





module.exports = {
    signup,
    login,

}