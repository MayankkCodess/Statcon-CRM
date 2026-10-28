import express from "express";
import { AddLoggerWork } from "../controllers/loggerWork.controller.js";

const router = express.Router();

router.route("/addComplaint").post(AddLoggerWork);

export default router;



// 1. i need to know what happens or say what is the difference between seperating routes and using in app.post("/user/signup") 
// 2. i need to learn about this statement - const router = express.Router();
// 3. what happen when writing router.route 
// 4. i have to know the full mechanism of routes like why middlewares must above them and all 