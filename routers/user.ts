import {Router} from "express";
import {CreateUserReq} from "../types";
import {UserRecord} from "../records/user.record";


export const userRouter = Router();

userRouter

    .post('/login', async (req, res) => {
        const {email, password} = req.body
        console.log(req.body)
        const user = await UserRecord.getOne(email, password);
        console.log(user)
        res.json(user);
    })

    .post('/reg', async (req, res) => {
        const newUser = new UserRecord(req.body as CreateUserReq);
        await newUser.insert();

        res.json(newUser)
    });