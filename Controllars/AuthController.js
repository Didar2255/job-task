const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {

        // checking email is already registered or not
        const userSignUp = await User.findOne({ email: req.body.email });
        if (userSignUp) {
            res.status(404).json({
                error: 'Email is already taken'
            })
        } else {

            // password hashing for security
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            //taking user info
            const newUser = new User({
                name: req.body.name,
                phone: req.body.phone,
                date: req.body.date,
                gender: req.body.gender,
                email: req.body.email,
                password: hashPassword,

            });

            // Save user Information
            await newUser.save();
            res.status(200).json({
                newUser,
                message: 'signup successfully',
            });
        }

    } catch (err) {
        res.status(500).json({
            message: 'signup error find!!!',
        });
    }
}

//SignIn Function

exports.login = async (req, res) => {
    try {

        //checking email is already registered or not
        const user = await User.find({ email: req.body.email });
        // console.log(user)
        // console.log(user[0]);

        //if user is registered?
        if (user && user.length > 0) {
            //compare this user password against hash password.
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            //if password is valid then go to this condition.
            if (isValidPassword) {

                //generate jwt token 

                const token = jwt.sign(
                    {
                        name: user[0].name,
                        userId: user[0]._id,
                        email: user[0].email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '10d',
                    }
                );
                res.status(200).json({

                    //saving the token & data.
                    token: token,
                    message: 'login successfully',
                    data: user[0]
                });
            } else {
                res.status(401).json({
                    error: 'authentication failed',
                });
            }
            // console.log(user[0]._id)
            // console.log(user[0].firstName);
        } else {
            res.status(401).json({
                error: 'authentication failed',
            });
        }
    } catch (err) {
        res.status(401).json({
            error: 'authentication failed',
        });
    }
};
