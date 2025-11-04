import mongoose from "mongoose";
import habitcompleted from "../models/completedHabits.js";
import user from "../models/user.js";
import  jwt  from "jsonwebtoken";



export async function completedHabit( req,res){
  const token = req.cookies.Token;
  const verify = jwt.verify(token ,process.env.JWT_SECRET)
  
  
  console.log(req.body)
  console.log(verify)

 
 const userdataid= await user.findOne({Email:verify.Email}).select("_id")
 
console.log(userdataid)
 
  const completedhabitdata=  new habitcompleted({
  
  
    userId: userdataid._id,
     habitId: req.body.habitId

    })

    console.log(completedhabitdata);
 
   await completedhabitdata.save(); 
    console.log("insertion completed")


  
    return  true;
}
