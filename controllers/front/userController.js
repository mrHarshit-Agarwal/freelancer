const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

require("dotenv").config();

const registerUser = async (req, res) => {
    const { name, email, password, dob } = req.body;

    if (!name || !email || !password || !dob) {
        return res.status(400).json({ 
            
            message: "All fields are required" 
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                 message: "User already exists" 

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            dob,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser

        });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });

    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                id: user._id 
            },
            process.env.JWT_SECRET,
            {
                 expiresIn: "2h" 

            } 
        );

        const { password: pwd, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword

        });
    } catch (error) {

        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });

};

module.exports = { registerUser, loginUser, logoutUser };
