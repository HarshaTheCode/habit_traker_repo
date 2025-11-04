// testEnv.js
import dotenv from 'dotenv';
dotenv.config();

const env=process.env.JWT_SECRET

console.log(env);