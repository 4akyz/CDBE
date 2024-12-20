import User from "../models/user";
import { registerSchema } from "../schema/auth";
import bcryptjs from "bcrypt";

export const signup = async(req,res) => {
    //get user data
    const {username, password, confirmPassword, email, age} =req.body;
    //kiem tra hop le
    const {error} = registerSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const  messages = console.log(error.details.map((message) => message.message));
        return res.status(400).json({
            messages,
        })
    }
    //kiem tra ton tai
    const existUSer = await User.findOne({email});
    if (existUSer) {
        return res.status(400).json({
            messages: ["Email da ton tai"],
        })
    }
    //ma hoa mat khau bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log('hashedPassword', await bcryptjs.hash(password, 10));

    //luu vao db
    const user = await User.create({
        username, email, password: hashedPassword, age,
    })
    //tra ve thong tin dang ky(khong gui mat khau)
    user.password = undefined;
    return res.status(201).json({
        user,
    })
}