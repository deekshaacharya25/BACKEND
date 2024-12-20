import { response, Router } from "express"
const router = Router();
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";

router.delete("/", async (req, res) => {
    try {
       let student_id = req.query.student_id;
         let studentData = await studentModel.aggregate([
                   {
                       $match: {$expr : [{ $toObjectId: student_id}] },
                   },
         ]);






        return send(res,RESPONSE.SUCCESS);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;