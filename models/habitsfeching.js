import mongoose from "mongoose";
import user from "./user.js";
import jwt from "jsonwebtoken";
import habits from "./habits.js";


const mongouri = 'mongodb://localhost:27017/habitTraker';


await mongoose.connect(mongouri)

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