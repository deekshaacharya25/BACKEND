import {Router} from "express";
const router = Router();
// import addStudent from "./addStudent.js"
// import listStudent from "./listStudent.js"
// import deleteStudent from "./deleteStudent.js"

import addProduct from "./addProduct.js"
import listProduct from "./listProduct.js"

// router.use('/add',addStudent);
// router.use('/list',listStudent);
// router.use('/delete',deleteStudent);

router.use('/add',addProduct);
router.use('/list',listProduct);

export default router;