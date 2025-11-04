import habitcompleted from "../models/completedHabits.js";
import habits from "../models/habits.js";
import user from "../models/user.js";
import jwt from "jsonwebtoken";

export async function createHabit(req, res) {
  const token = req.cookies.Token;
  const verify = jwt.verify(token, process.env.JWT_SECRET)
  console.log(verify)

  const userdataid = await user.findOne({ Email: verify.Email }).select("_id")

  console.log(userdataid)

  const habitdata = new habits({

    userId: userdataid._id,
    habit: req.body.habit,
    isActive: "true",
    frequency: req.body.frequency
  })

  console.log(habitdata);

  const userHabitUpadte = await user.updateOne(

    { Email: verify.Email },
    { $push: { habits: habitdata._id } },
  );

  await habitdata.save();
  console.log("insertion completed")

  return true;
}

/*-------------------------------------------------------------------------------------------------------*/

export async function deletedHabit(req, res) {

  const token = req.cookies.Token;
  const verify = jwt.verify(token, process.env.JWT_SECRET)
  const userid = req.body.habitId;
  console.log(verify)
  console.log(req.body)
  const userdataid = await user.findOne({ Email: verify.Email }).select("_id")


  const habitdataid = await habits.deleteOne({ _id: userid })
  const completeddelete = await habitcompleted.deleteOne({ habitId: userid })

  const userHabitdelete = await user.updateOne(

    { Email: verify.Email },
    { $pull: { habits: req.body.habitId } },
  );

  console.log("deletion completed")

  return true;
}
/*------------------------------------------------------------------------------------------------------- */


export async function editHabit( req,res){


 
 
    await habits.updateOne(
  
  
   { _id: req.body.habitId },
    { $set: { habit: req.body.updatedhabit } },

    );

    console.log("habit updated ");
 
   

  
    return  true;
}
