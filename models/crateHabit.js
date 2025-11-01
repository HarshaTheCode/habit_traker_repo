import mongoose from "mongoose";
import habits from "./habits.js";
import user from "./user.js";
import  jwt  from "jsonwebtoken";

const mongouri = 'mongodb://localhost:27017/habitTraker';


export async function createHabit( req,res){
  const token = req.cookies.Token;
  const verify = jwt.verify(token ,"secretCode")
  console.log(verify)
   mongoose.connect(mongouri)

 
 const userdataid= await user.findOne({Email:verify.Email}).select("_id")
 
console.log(userdataid)
  
  const habitdata=  new habits({
    
    userId: userdataid._id,
    habit:req.body.habit,
        isActive: "true",
        frequency:req.body.frequency

        
    })

    console.log(habitdata);


    const  userHabitUpadte = await user.updateOne(
      
        {Email :verify.Email},
      {$push:{habits:habitdata._id}},
    );
 
   await habitdata.save(); 
    console.log("insertion completed")


  
    return  true;
}











