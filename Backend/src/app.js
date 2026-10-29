import dotenv from "dotenv";
//this (.config) is an method which takes an object of path of env
//you can also do it in package.json watch - chai code - lec -2 33:58 timeline
dotenv.config({
  path: "./.env",
});

import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser";
import complaintRoute from "./routes/complaint.route.js"
// below by using this method of express , all properties transfers to app
const app = express();

//read documentation for more info // frontend also 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//we have to set some settings before seeing cookie option as 
// data may come from URL , json ,req bhejenge body mai form se , kuch ka direct form aayega , file data - we use multer which is third party
// we must limit json , to prevent server from crash 

//1. for json data limit 
app.use(express.json({limit:'16kb'})); 
//2. URL data ke sath problem hai - like space ka url encoder hota hai %20 , so ye sab express ko batana hota hai , extended means that - u can give objects into objects
app.use(express.urlencoded({extended:true})); 
//3. sometimes we want to keep some files or pdf in our server as public assest
app.use(express.static('public')); 

// cookie-parser works is i want , ki mai apne server se user ke browser ki cookies access bhi kar pau or set bhi kar pau 
app.use(cookieParser()); 

// all routes
app.use("/api/v1/complaint",complaintRoute);




export {app};