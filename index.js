// import {Router} from "express";
import express from "express";
const app=express();
// const router = Router();

import dotenv from "dotenv";
import {connectDB} from "./src/helpers/dbConnection.js";
import routes from "./router.js";
dotenv.config();

const PORT=process.env.PORT;

// router.get("/",(req,res) =>{
//  return  res.json({responseMessage: "All good"});
// });

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
connectDB();


routes(app);

app.listen(PORT,() => {
    console.log("Server is listening on PORT",PORT);
});

