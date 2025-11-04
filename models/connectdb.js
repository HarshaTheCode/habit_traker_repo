import mongoose from "mongoose";


const mongouri = 'mongodb://localhost:27017/habitTraker';

async function connect() {
    
    mongoose.connect(mongouri) 
    console.log("db connected ")
}

export default connect;