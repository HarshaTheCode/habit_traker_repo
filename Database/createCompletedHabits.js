import mongoose from "mongoose";
import habitcompleted from "../models/completedHabits.js";
import user from "../models/user.js";
import  jwt  from "jsonwebtoken";



export async function completedHabit( req,res){
  const token = req.cookies.Token;
  const verify = jwt.verify(token ,process.env.JWT_SECRET)

 const userdataid= await user.findOne({Email:verify.Email}).select("_id")
 
  const completedhabitdata=  new habitcompleted({
  
  
    userId: userdataid._id,
     habitId: req.body.habitId

    })
 
   await completedhabitdata.save(); 
    // console.log(`Marked habit ${req.body.habitId} as completed for user ${verify.Email}`);


  
    return  true;
}
