import {Router} from "express";
const router = Router();
// import addStudent from "./addStudent.js"
// import listStudent from "./listStudent.js"
// import deleteStudent from "./deleteStudent.js"

import addProduct from "./addProduct.js"
import listProduct from "./listProduct.js"
import deleteProduct from "./deleteProduct.js"
import editProduct from "./editProduct.js"

// import addProduct from "../manageProducts/addProduct.js"
// import listProduct from "../manageProducts/listProduct.js"

// router.use('/add',addStudent);
// router.use('/list',listStudent);
// router.use('/delete',deleteStudent);
// router.use('/edit',editStudent);


router.use('/add',addProduct);
router.use('/list',listProduct);
router.use('/delete',deleteProduct);
router.use('/edit',editProduct);

export default router;