import { createUser } from '../models/createUser.js';
import path from 'path'
import express from 'express';
import { createHabit } from '../models/crateHabit.js'
import { findpassword, finduser } from '../models/findingUser.js';
import jwt from 'jsonwebtoken'
import { completedHabit } from '../models/createCompletedHabits.js';
import { habitsfetching } from '../models/habitsfeching.js';
import { getDailyAnalytics } from '../models/anayletics.js';


export const routes = express.Router();
const __dirname = import.meta.dirname;




routes.get('/', (req, res) => {
     const filepath=path.join(__dirname,'../public', 'landing.html')
    res.sendFile(filepath)
})

routes.get('/register', (req, res) => {

    const filepath = path.join(__dirname, '../public', 'register.html')
    res.sendFile(filepath)
})

routes.get('/login', (req, res) => {
    const filepath = path.join(__dirname, '../public', 'login.html')
    res.clearCookie("Token")
    res.sendFile(filepath)
})

routes.get('/logout',(req,res)=>{
    res.clearCookie("Token");
    res.send("your loged out")
})

routes.post('/login', async (req, res) => {

    const findinguser = await finduser(req, res);

    if (findinguser) {
        const findingpassword = await findpassword(req, res);

        console.log("user exists")
        if (findingpassword==true) {

             const token = jwt.sign({
                Email :req.body.userEmail
            },"secretCode")
                
                    res.cookie("Token",token)

            res.redirect('/home')
        }
        else {
          
            res.redirect('/404')

        }
    } else {
        res.redirect('/404')

    }



})

routes.get('/404',(req,res)=>{
    const filepath = path.join(__dirname, '../public', '404.html')
        res.sendFile(filepath)
})

routes.post('/create', async (req, res) => {

    const result = await createUser(req, res);
    console.log(result)
    if (!result) {

        res.send('error while creating the user')

    }
    else {


        console.log("user created ")

        const filepath = path.join(__dirname, '../public', "homepage.html")
        res.redirect('/home')

    }
})

routes.get('/home', (req, res) => {

    const filepath = path.join(__dirname, '../public', "homepage.html")


    res.sendFile(filepath)

})

routes.post('/createHabit', (req, res) => {

    createHabit(req, res);
    console.log("Habit crated ")
    res.send("perfect")
})

routes.post('/habitcompleted',(req,res)=>{

    completedHabit(req,res);
    res.send("habit completed")
})

routes.get('/habitsData', async(req,res)=>{
    const ids= await habitsfetching(req,res);
    res.send(ids)
})

// Add this alongside your existing GET route
routes.get('/any', async(req,res)=>{
  console.log("data fetching from POST")
    const info =await getDailyAnalytics(req,res);
    const completions ={count:info.length};
    console.log({info, completions})
  res.send({info, completions})
});