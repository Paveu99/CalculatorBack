import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {CreateMathReq} from "../types";
import {MathRecord} from "../records/math.record";


export const mathRouter = Router();

mathRouter

    .get('/', async (req, res) => {
        const mathHistory = await MathRecord.listAll();

        res.json({
            mathHistory,
        });
    })

    .delete('/:id', async (req, res) => {
        const expression = await MathRecord.getOne(req.params.id);

        if (!expression) {
            throw new ValidationError('No such expression')
        }

        await expression.delete()

        res.end()
    })

    .post('/', async (req, res) => {
        const newExpression = new MathRecord(req.body as CreateMathReq);
        await newExpression.insert();

        res.json(newExpression)
    });