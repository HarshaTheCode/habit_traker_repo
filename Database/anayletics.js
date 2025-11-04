import habitcompleted from "../models/completedHabits.js";
import jwt from "jsonwebtoken"



export const getDailyAnalytics = async (req, res) => {
  
  const token  = req.cookies.Token;
          const verify = jwt.verify(token,'secretCode');
          console.log(verify)
    
    // Step 1: get today's date range
    const start = new Date();
    start.setHours(0, 0, 0, 0); // 00:00 AM
    const end = new Date();
    end.setHours(23, 59, 59, 999); // 11:59 PM

    const todayData = await habitcompleted.aggregate( [
    { $match: { completedAt: { $gte: start, $lte: end } } },

    // lookup user but filter by email in the lookup pipeline
    {
      $lookup: {
        from: "users",
        let: { uid: "$userId" },
        pipeline: [
          { $match: { $expr: { $and: [ { $eq: ["$_id", "$$uid"] }, { $eq: ["$Email", verify.Email] } ] } } },
          { $project: { username: 1, Email: 1 } }
        ],
        as: "user"
      }
    },
    { $unwind: "$user" }, 

    // lookup habit
    {
      $lookup: {
        from: "habits",
        localField: "habitId",
        foreignField: "_id",
        as: "habit"
      }
    },
    { $unwind: { path: "$habit", preserveNullAndEmptyArrays: true } },

    // project what you want in response
    {
      $project: {
        _id: 1,
        completedAt: 1,
        "user.username": 1,
        "user.Email": 1,
        "habit.habit": 1,
        "habit.frequency": 1
      }
    },

  ]);


    // Step 3: prepare the response
    const totalCompletions = todayData.length;

    console.log(totalCompletions)
    console.log(start.toDateString())
    console.log(todayData)

    return todayData;
  };
  
