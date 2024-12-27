import { response, Router } from "express"
const router = Router();
import teacherModel from "../../models/teacherModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { ROLE, STATE } from "../../config/constants.js";
import validator from "validator";
import bcrypt from "bcrypt"
router.post("/", async (req, res) => {
    try {

        const { teacher_name, phone, email, password} = req.body;
     
        const teacher = teacherModel();
    
        if (!teacher_name || teacher_name == undefined) {
  
            return send(res, setErrorRes(RESPONSE.REQUIRED,"teacher_name"));
        }
        if (!phone || phone == undefined) {
      
            return send(res, setErrorRes(RESPONSE.REQUIRED,"phone"));
        }
        if (!email || email == undefined) {
           
            return send(res, setErrorRes(RESPONSE.REQUIRED,"email"));
         
        }
        if (!password || password == undefined) {
          
            return send(res, setErrorRes(RESPONSE.REQUIRED,"password"));
         
        }


        let isEmail = validator.isEmail(email);
        if (!isEmail){
            return send(res, setErrorRes(RESPONSE.INVALID,"email"));
        }

        //FIND METHOD

// let isExist = await teacherModel.find({
//     phone:phone
//     });
// if (isExist.length > 0){
//     return send(res, setErrorRes(RESPONSE.ALREADY_EXIST,"phone"));
// }

let isExist = await teacherModel.aggregate([
    {
    $match: {
        phone:phone,
        isactive:STATE.ACTIVE,
    }
},
]);
   
if (isExist.length > 0){
    return send(res, setErrorRes(RESPONSE.ALREADY_EXISTS,"phone"));
}
let isValidPhone = phone.toString().match(/^\+91\d{10}$/);
// console.log(isValidPhone);

if (!isValidPhone) {
    return send(res, setErrorRes(RESPONSE.INVALID,"phone"));
 
}

let isValidPassword = password.toString().match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/);
// console.log(isValidPassword);


if (!isValidPassword) {
    return send(res, setErrorRes(RESPONSE.INVALID,"Password Pattern"));
 
}
let encryptedPass = await bcrypt.hash(password, Number(process.env.SALTROUND));
console.log("encryptedPass",encryptedPass);

        teacherModel.create(
            //ALTERNATIVE 
            //req.body
            {
            teacher_name,
            phone: phone,
            email: email,
            password:encryptedPass,
            role: ROLE.TEACHER,
            
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



