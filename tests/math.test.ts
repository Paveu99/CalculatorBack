import {pool} from "../utils/db";
import {MathRecord} from "../records/math.record";

const defaultObj = {
    firstNum: 1,
    operator: '+',
    secondNum: 2,
    solution: 3,
}

afterAll(async () => {
    await pool.end()
})

test('Can build mathRecord', async () => {
    const entry = new MathRecord(defaultObj);
    expect(entry.solution).toEqual(3);
    expect(entry.operator).toBe('+');
})