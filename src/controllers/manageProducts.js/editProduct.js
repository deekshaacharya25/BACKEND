import { response, Router } from "express"
const router = Router();
import productModel from "../../models/productModel.js";
import { RESPONSE } from "../../config/global.js";
import {send, setErrorRes } from "../../helpers/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";
import pkg from 'validator';
import { isValidObjectId } from "mongoose";
const { isFloat } = pkg;

router.put("/", async (req, res) => {
    try {
       let p_id = req.query.p_id;

       let { product_id, name, description, brand, price, category} =req.body;
       let updates= {};
       

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

        if( product_id && product_id != undefined){
            let isExist = await productModel.aggregate([
                {
                $match: {
                    product_id: product_id,
                    isactive:STATE.ACTIVE,
                }
            },
            ]);
            updates.product_id = product_id;
        }
        if( name && name != undefined){
            updates.name = name;
        }
        if( description && description != undefined){
            updates.description = description;
        }
        if( brand && brand != undefined){
            updates.brand = brand;
        }
        if( price && price != undefined){
                let isFloat = validator.isFloat(price,{ min: 0 });
                if (!isFloat){
                    return send(res, setErrorRes(RESPONSE.INVALID,"price"));
                }
            updates.price = price;
        }
        if( category && category != undefined){
            updates.category = category;
        }

    await productModel.updateMany(
        { 
            _id: p_id,

         }, { 
            $set: updates,
         }
    );

    console.log(updates);

        return send(res,RESPONSE.SUCCESS);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNKNOWN_ERR);
    }
});
export default router;

