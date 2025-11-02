import mongoose from 'mongoose'

const Monogschema = mongoose.Schema({
    username:String,
    Email:String,
    password:String,
    habits:[ 
        {

            type: mongoose.Schema.Types.ObjectId, // reference to the user
            ref: 'habits',
        } 
        ]
})

const user = mongoose.model('user',Monogschema);

export default user;

