const User = require('../models/userModel');
const { use } = require('../routes/auth');
const jwtHelpers = require("../utils/jwtHelpers");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email });

    if(user && await (bcrypt.compare(password, user.password))) {
        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                accessToken: jwtHelpers.sign({
                    sub: user.id
                })
            }
        })
    } else {
        res.status(401).json({
            message: "Invalid Email or Password"
        })
    }
}

exports.register = async (req, res) => {
    const {name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400).json({message: "all feilds are mandatory!"})
    }
    // const emailAvailable = User.findOne({ email });
    // if(emailAvailable) {
    //     res.status(400).json({message: "user already registered!"})
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = User.create({
        name,
        email,
        password: hashPassword
    })

    if(user) {
        res.status(201).json({
            success: true
        })
    }else {
        res.status(500).json({
            message: "somthing went wrong!"
        })
    }

}

exports.me = async (req, res) => {
    const user = await User.findById(req.userId)
    res.status(200).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })

}