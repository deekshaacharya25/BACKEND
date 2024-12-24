import { response, Router } from "express"
const router = Router();
import productModel from "../../models/productModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";

router.delete("/", async (req, res) => {
    try {
       let p_id = req.query.p_id;
       if (!p_id || p_id == undefined) {
                   return send(res, setErrorRes(RESPONSE.REQUIRED,"p_id"));
               }
         let productData = await productModel.aggregate([
                   {
                $match :{ $expr : { $eq : ["$_id", {$toObjectId: p_id}] }, 
                isactive: STATE.ACTIVE,
            },
            },
         ]);

         if(productData.length === 0){
            return send(res, setErrorRes(RESPONSE.NOT_FOUND, "Product data"));
         }

        console.log(productData);

    await productModel.deleteOne({
        _id: p_id,
 
});


        return send(res,RESPONSE.SUCCESS);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;