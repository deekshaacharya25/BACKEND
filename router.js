import {Router} from "express";
const router = Router();

import studentApiHandler from "./src/controllers/manageStudents/apiHandler.js";
// import std from "./src/controllers/manageStudents/addStudent.js"

const routes= (app) => {
    app.use("/api/student", studentApiHandler);
    // app.use("/api/student/add", std);
};
export default routes;