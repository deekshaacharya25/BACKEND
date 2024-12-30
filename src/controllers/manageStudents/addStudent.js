import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrorRes } from "../../helpers/responseHelper.js";
import { ROLE, STATE } from "../../config/constants.js";
import validator from "validator";
import { authenticate } from "../../middlewares/authenticate.js";
import multer from "multer";
import image from "../../middlewares/uploads.js";
// Initialize Multer middleware
const upload = image.array("image");

router.post("/", authenticate, async (req, res) => {
  try {
    // Check user role (if required)
    // if (req.user.role !== ROLE.TEACHER) {
    //   return send(res, RESPONSE.UNAUTHORIZED);
    // }

    // Use the Multer upload middleware
    upload(req, res, async (err) => {
     
        // Handle Multer-specific errors
        if (err instanceof multer.MulterError) {
          return send(res, RESPONSE.MULTER_ERR);
        }else if (err) {
        // Handle unknown errors
        return send(res, RESPONSE.UNKNOWN_ERR);
        }

      // Ensure at least one file is uploaded
      if (!req.files || req.files.length < 1) {
        return send(res, setErrorRes(RESPONSE.REQUIRED, "image"));
      }

      console.log(req.files);

      // Extract fields from the request body
      const { name, rollno, email } = req.body;
      const teacher_id = req.user.id;

      // Validate required fields
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

      // Validate email format
      if (!validator.isEmail(email)) {
        return send(res, setErrorRes(RESPONSE.INVALID, "email"));
      }

      // Check for existing student using aggregation
      const isExist = await studentModel.aggregate([
        {
          $match: {
            rollno: rollno,
            isactive: STATE.ACTIVE,
          },
        },
      ]);

      if (isExist.length > 0) {
        return send(res, setErrorRes(RESPONSE.ALREADY_EXISTS, "rollno"));
      }

      // Create the student record
      await studentModel.create({
        name: name,
        rollno: rollno,
        email: email,
        teacher_id: teacher_id,
      });

      // Send success response
      return send(res, RESPONSE.SUCCESS);
    });
  } catch (error) {
    console.error(error);
    // Handle unexpected errors
    if (!res.headersSent) {
      return send(res, RESPONSE.UNKNOWN_ERR);
    }
  }
});

export default router;
