import mongoose from "mongoose";
import user from '../models/user.js';
import jwt from 'jsonwebtoken'

export async function createUser(req, res) {

    const userdata = await new user({
        username: req.body.username,
        Email: req.body.userEmail,
        password: req.body.userPassword
    })


    const token = jwt.sign({

        Email: req.body.userEmail,
        
    }, "secretCode")
    console.log(token)
    res.cookie("Token", token)


    await userdata.save();

    console.log("insertion completed")
    return true;
}



