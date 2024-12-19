import {Router} from "express";
const router = Router();
import addStudent from "./addStudent.js"

router.use('/add',addStudent)

export default router;