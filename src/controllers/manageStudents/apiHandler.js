import {Router} from "express";
const router = Router();
// app.use(express.json()); // This is necessary to parse JSON bodies
import addStudent from "./addStudent.js"
import listStudent from "./listStudent.js"
import deleteStudent from "./deleteStudent.js"
import editStudent from "./editStudent.js"


router.use('/add',addStudent);
router.use('/list',listStudent);
router.use('/delete',deleteStudent);
router.use('/edit',editStudent);

// router.use('/add',addProduct);
// router.use('/list',listProduct);
// router.use('/delete',deleteProduct);
// router.use('/edit', editProduct);

export default router;