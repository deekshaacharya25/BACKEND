import { response, Router } from "express"
const router = Router();
import productModel from "../../models/productModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";


router.get("/:id?", async (req, res) => {
    try {
        let product_id =req.query.product_id;
        let query={};
        let p_id = req.query.id;
        query.isactive= STATE.ACTIVE;

        product_id != undefined ? (query.product_id = product_id) : "";
        
        p_id != undefined
        ? (query.$expr = { $eq : ["$_id", {$toObjectId: p_id}]})
        : "";
        let productData = await productModel.aggregate([
            {
                $match: query,
            },
            {
                $project: {
                    isactive: 0,
                    __v: 0,
                },
            },
        ]);

        if(productData.length==0){
            return setErrorRes(res, setErrorRes(RESPONSE.NOT_FOUND, "Product Data"));
        }


        return send(res,RESPONSE.SUCCESS,productData);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;