import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";

export const signup = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        res.status(201).json({
            message: "User created successfully"
        })
    }
    catch (error) {
        next(error);
    }
    
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorhandler(404,"User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(401,"Invalid credentials"));
        const token = jwt.sign({
            id: validUser._id  
        },process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(rest)

        
    }catch (error) {
        next(error)
    }
}
