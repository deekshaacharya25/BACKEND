import {Router} from "express";
const router = Router();

import studentApiHandler from "./src/controllers/manageStudents/apiHandler.js";
// import productApiHandler from "./src/controllers/manageProducts.js/apiHandler.js";
// import std from "./src/controllers/manageStudents/addStudent.js"
import teacherApiHandler from "./src/controllers/auth/apiHandler.js";

const routes= (app) => {

    app.use("/api/student", studentApiHandler);
    // app.use("/api/product", productApiHandler);
    app.use("/api/auth",teacherApiHandler);
    //Alternative
    // app.use("/api/student/add", std);
    
};
export default routes;