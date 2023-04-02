import express, {json} from "express";
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';
import cors from 'cors';
import {mathRouter} from "./routers/math";
import {userRouter} from "./routers/user";


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json())

app.use('/math', mathRouter);
app.use('/user', userRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
