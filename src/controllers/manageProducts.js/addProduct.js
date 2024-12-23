import { response, Router } from "express"
const router = Router();
import productModel from "../../models/productModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from 'validator';
import pkg from 'validator';
const { isFloat } = pkg;

router.post("/", async (req, res) => {
    try {

        const { product_id, name, description, brand, price, category} = req.body;
        console.log(req.body);
        const product = productModel();
       
        if (!product_id || product_id == undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"product_id"));
        }
        if (!name || name == undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"name"));
        }
        if (!description || description == undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"description"));
        }
        if (!brand || brand == undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"brand"));
        }
        if (!price|| price== undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"price"));
        }
        if (!category|| category== undefined) {
            return send(res, setErrorRes(RESPONSE.REQUIRED,"category"));
        }

        let isFloat = validator.isFloat(price,{ min: 0 });
        if (!isFloat){
            return send(res, setErrorRes(RESPONSE.INVALID,"price"));
        }

  
let isExist = await productModel.aggregate([
    {
    $match: {
        product_id: product_id,
        isactive:STATE.ACTIVE,
    }
},
]);
   
if (isExist.length > 0){
    return send(res, setErrorRes(RESPONSE.ALREADY_EXISTS,"product_id"));
}

        productModel.create({
            product_id: product_id,
            name: name,
            description: description,
            brand: brand,
            price: price,
            category: category,

        });
        return send(res,RESPONSE.SUCCESS);
        // res.json(RESPONSE.SUCCESS);


    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;