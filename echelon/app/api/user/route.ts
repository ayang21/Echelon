import { NextApiRequest, NextApiResponse } from "next";
import UserProgress from "@/app/models/user";
import dbConnect from "@/app/utils/dbconnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method } = req;

    await dbConnect();
    switch (method) {
        case "GET":
            try {
                res.status(200).json({ success: true, message: "Hahaha, nerd"});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case "POST":
            try {
                const user = await UserProgress.findOne({name: req.body.name}); // unsure of syntax, educated guess
                res.status(201).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({ success: false});
            }
            break;
        default:
            res.status(400).json({ success: false});
            break;
    }
}



/**
 * I need to manage user data / activity
 *  what is user data?
 *      User data would be user information such as name, password, etc
 *  what is user activity?
 *      Module progress
 * 
 * How do we want to organize it in mongodb?
 *  users collection
 *  modules collection?
 *  could have a unique field for each module
 */


/**
 * What type of requests do we want?
 *  Get user
 *      name, module progress
 *  Post
 *      update module progress
 *      one per module or have it identify what module its for
 */

/**
 * Module Progress
 *  #videos watched
 *  quiz complete? 
 */