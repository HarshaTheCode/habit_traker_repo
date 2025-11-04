import mongoose from "mongoose";


async function connect() {
    const mongouri = process.env.MONGO_URI 
    
    mongoose.connect(mongouri)
    console.log(mongouri)
    console.log("db connected ")
}

export default connect;