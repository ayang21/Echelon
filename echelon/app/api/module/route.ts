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
                switch (req.body.modId) {
                    case 1:
                        user.moduleOne = req.body.module;
                        await user.save()
                        res.status(200).json({ success: true, data: user});
                        break;
                    case 2:
                        user.moduleTwo = req.body.module;
                        await user.save()
                        res.status(200).json({ success: true, data: user});
                        break;
                    case 3:
                        user.moduleThree = req.body.module;
                        await user.save()
                        res.status(200).json({ success: true, data: user});
                        break;
                    default:
                        res.status(400).json({ success: false});

                }
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
