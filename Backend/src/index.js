// we want .env to load all variable to each files as early as possible, so configuring dotenv must be in main file  
// While building Statcon-CRM it is also better to load it in app.js then importing app.js in starting 
import connectDB from "./config/dbConnection.js";
import {app} from "./app.js";

// so when async db method completed it return promise so we handle below
connectDB()
  .then(() => {
    //before app.listen we have to listen for error also (app.on)
    app.on("error", (error) => {
      console.log("Error:", error);
      throw error;
    });
    //we use callback , because callback only run ya happen when app.listen(event) or say server(async) ka execution completes/happens
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at port${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed`, err);
  });
