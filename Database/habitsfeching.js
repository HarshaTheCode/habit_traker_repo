import mongoose from "mongoose";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import habits from "../models/habits.js";




 export  async function habitsfetching(req,res){
    const token  = req.cookies.Token;
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const userdata= await user.findOne({Email:verify.Email}).select("habits")
        if(userdata!=null){
            const habitsformdb = await habits.find({_id:userdata.habits}).select("habit")
        
            return habitsformdb ;
        }
        else{
            console.error(`Could not find user data for email: ${verify.Email} in habitsfetching.`);
            return false ;
        }
    } 