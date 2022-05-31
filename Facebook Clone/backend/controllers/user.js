const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");


exports.register = async (req, res) => {

 try{
    const {
        first_name, last_name, password,
        email, username, bYear, bMonth,
        bDay, gender
         
    } = req.body;


    if(!validateEmail(email)){
        return res.status(400).json({
            message:"invalid email address",
        })
    }

    const check = await User.findOne({email});
    if(check) {
        return res.status(400).json({
            message:"email user already exists",
        })
    }

    if(!validateLength(first_name, 3, 30))
    {
        return res.status(400).json({
            message:"first name must be longer than 3 and lessthan 30",
        })
    }
    if(!validateLength(last_name, 3, 30))
    {
        return res.status(400).json({
            message:"last name must be longer than 3 and lessthan 30",
        })
    }
    if(!validateLength(password, 6, 40))
    {
        return res.status(400).json({
            message:"pass word must be longer than 6 and lessthan 40",
        })
    }


    const cryptedPassword= await bcrypt.hash(password, 12);
    console.log(cryptedPassword);


    let tempUserName = first_name + last_name;
    let newUserName = await validateUsername(tempUserName);
    const user =  await new User({
        first_name, last_name,email, password: cryptedPassword,
        username: newUserName, bYear, bMonth,
        bDay, gender
    }).save();

    const emailVerificationToken = generateToken({
        id: user._id.toString()
    },
    "30m"
    );
    console.log(emailVerificationToken);

    res.json(user);
 }
 catch (error) {
     res.status(500).json({
         message: error.message
     })
 }
}