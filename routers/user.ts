import {Router} from "express";
import {CreateUserReq} from "../types";
import {UserRecord} from "../records/user.record";
import {compare} from "bcrypt";


export const userRouter = Router();

userRouter

    .post('/login', async (req, res) => {
        const {email, password} = req.body
        const user = await UserRecord.getOne(email);
        if (!user) {
            res.end()
        }
        const match = await compare(password, user.password);
        if (match) {
            res.json(user);
        } else {
            res.end()
        }
    })

    .post('/reg', async (req, res) => {
        const newUser = new UserRecord(req.body as CreateUserReq);
        await newUser.insert();

        res.json(newUser)
    });