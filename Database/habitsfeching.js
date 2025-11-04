import mongoose from "mongoose";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import habits from "../models/habits.js";




 export  async function habitsfetching(req,res){
    console.log("functions started")
    const token  = req.cookies.Token;
        const verify = jwt.verify(token,'secretCode');
        const userdata= await user.findOne({Email:verify.Email}).select("habits")
        console.log(userdata)
        if(userdata!=null){
            const habitsformdb = await habits.find({_id:userdata.habits}).select("habit")
            console.log(habitsformdb)
            


            return habitsformdb ;
        }
        else{
            console.log("somthing went wrong")
            return false ;
        }
    } 