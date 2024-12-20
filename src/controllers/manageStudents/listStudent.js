import { response, Router } from "express"
const router = Router();
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";

router.get("/:id?", async (req, res) => {
    try {
        // let student_id =req.params.id;
        // console.log(student_id);
        let rollno =req.query.rollno;
        let query={};
        query.isactive= STATE.ACTIVE;

        rollno != undefined ? (query.rollno = rollno) : "";
     
        let studentData = await studentModel.aggregate([
            {
                // $match: {
                //     // _id: student_id,
                //     rollno:rollno,
                //     isactive: STATE.ACTIVE,
                // },

                $match: query,
            },
            {
                $project: {
                    isactive: 0,
                    __v: 0,
                },
            },
        ]);

        if(studentData.length==0){
            return setErrorRes(res, setErrorRes(RESPONSE.NOT_FOUND, "Student Data"));
        }


        return send(res,RESPONSE.SUCCESS,studentData);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;