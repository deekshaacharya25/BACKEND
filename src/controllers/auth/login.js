import { response, Router } from "express"
const router = Router();
import teacherModel from "../../models/teacherModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
router.post("/", async (req, res) => {
    try {

        const { username, password} = req.body;
     

        if (!username || username == undefined) {
  
            return send(res, setErrorRes(RESPONSE.REQUIRED,"username"));
        }

        if (!password || password == undefined) {
          
            return send(res, setErrorRes(RESPONSE.REQUIRED,"password"));
         
        }


      

        //FIND METHOD

let userData = await teacherModel.findOne({
    isactive: STATE.ACTIVE,
    $or:[{ phone: username},{email:username}],
   });


   
if(userData && (await bcrypt.compare(password, userData.password))){
    let token = jwt.sign({ 
    id: userData._id,
    teacher_name: userData.teacher_name,
    phone: userData.phone,
    email: userData.email,
    role: userData.role,
    },process.env.SECRETKEY
);
    return send(res,RESPONSE.SUCCESS,token);
}else{
     return send(res, setErrorRes(RESPONSE.INVALID, "Login Credential"));
}

    } catch (error) {
        console.log(error);
        // res.json(RESPONSE.UNKNOWN_ERR);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;



