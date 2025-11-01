import express from 'express'
import { routes } from './router/pathroutes.js';
import cookieParser from 'cookie-parser';


const app = express();

/*
this is basicall an middle ware which will give the power of reading the html form data 
 
the  data comming from the html form is like {name=Harsha&age=18} this but the express dont understand the plan text 
 then the (.urlencoded) wil come to the piture and it will convert that into readble json which will be understand by express 
 
 the (extended:true ) is like it will give more power to the express for the complext text from the url it can read if url 
 containes the text of an array and in that data if (extended : true) it will open it and it allows the nesting  if (flase) it will use it as it is 
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/',routes)

app.use(express.static('public')); // This line serves static files from the 'public' directory

app.listen('3000', () => {
    console.log("app was  Running at http://localhost:3000/")
});