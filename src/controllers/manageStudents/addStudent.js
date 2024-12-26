import { response, Router } from "express"
const router = Router();
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";
import { authenticate } from "../../middlewares/authenticate.js";

router.post("/",authenticate, async (req, res) => {
    try {

        const { name, rollno, email } = req.body;
        //console.log(req.body);
        const student = studentModel();
        // console.log({name,rollno,email});
        if (!name || name == undefined) {
            // const response = RESPONSE.REQUIRED;

            // res.json({
            //     code: response.code,
            //     message : "name" + response.message,
            // });
            // req.json(RESPONSE.REQUIRED);
            return send(res, setErrorRes(RESPONSE.REQUIRED,"name"));
        }
        if (!rollno || rollno == undefined) {
            // const response = RESPONSE.REQUIRED;

            // res.json({
            //     code: response.code,
            //     message : "rollno" + response.message,
            // });
            return send(res, setErrorRes(RESPONSE.REQUIRED,"rollno"));
        }
        if (!email || email == undefined) {
            // const response = RESPONSE.REQUIRED;

            // res.json({
            //     code: response.code,
            //     message : "email" + response.message,
            // });
            return send(res, setErrorRes(RESPONSE.REQUIRED,"email"));
         
        }


        let isEmail = validator.isEmail(email);
        if (!isEmail){
            return send(res, setErrorRes(RESPONSE.INVALID,"email"));
        }

        //FIND METHOD

// let isExist = await studentModel.find({
//     rollno:rollno
//     });
// if (isExist.length > 0){
//     return send(res, setErrorRes(RESPONSE.ALREADY_EXIST,"rollno"));
// }

let isExist = await studentModel.aggregate([
    {
    $match: {
        rollno:rollno,
        isactive:STATE.ACTIVE,
    }
},
]);
   
if (isExist.length > 0){
    return send(res, setErrorRes(RESPONSE.ALREADY_EXISTS,"rollno"));
}

        studentModel.create({
            name: name,
            rollno: rollno,
            email: email,

        });
        return send(res,RESPONSE.SUCCESS);
        // res.json(RESPONSE.SUCCESS);


    } catch (error) {
        console.log(error);
        // res.json(RESPONSE.UNKNOWN_ERR);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;