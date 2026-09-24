const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// SIGNUP

const signup = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password
        } = req.body;


        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        const existingUser = await User.findOne({
            where: {
                email
            }
        });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });

        }


        const existingPhone = await User.findOne({
            where: {
                phone
            }
        });


        if (existingPhone) {

            return res.status(409).json({
                success: false,
                message: "Phone number already registered"
            });

        }


        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({

            name,

            email,

            phone,

            password: hashedPassword

        });


        res.status(201).json({

            success: true,

            message: "Signup successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

};


// LOGIN

const login = async (req, res) => {

    try {

        const {
            emailOrPhone,
            password
        } = req.body;


        if (
            !emailOrPhone ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email/Phone and password are required"

            });

        }


        const user = await User.findOne({

            where: {

                [require("sequelize").Op.or]: [

                    {
                        email: emailOrPhone
                    },

                    {
                        phone: emailOrPhone
                    }

                ]

            }

        });


        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid email/phone or password"

            });

        }


        // COMPARE PASSWORD

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email/phone or password"

            });

        }


        // CREATE JWT

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                phone: user.phone

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

};


module.exports = {
    signup,
    login
};