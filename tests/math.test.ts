import {pool} from "../utils/db";
import {MathRecord} from "../records/math.record";

const defaultObj = {
    firstNum: 1,
    operator: '+',
    secondNum: 2,
    solution: 3,
    userId: '123'
}

afterAll(async () => {
    await pool.end()
})

test('Can build mathRecord', async () => {
    const entry = new MathRecord(defaultObj);
    expect(entry.solution).toEqual(3);
    expect(entry.operator).toBe('+');
})


test('Can list all record from database', async () => {
    const list = await MathRecord.listAll();
    console.log(list)
    expect(list).not.toEqual([]);
    expect(list[0].id).toBeDefined();
})

test('Validates invalid entry', async () => {
    expect(() => new MathRecord({
        ...defaultObj,
        operator: '/',
        secondNum: 0
    })).toThrow();
})

test('Can add record and return uuid', async () => {
    const entry = new MathRecord(defaultObj);
    await entry.insert();
    expect(entry.id).toBeDefined();
    expect(typeof entry.id).toBe('string')
})

test('Can add record to database', async () => {
    const entry = new MathRecord(defaultObj);
    await entry.insert();
    const searchEntry = await MathRecord.getOne(entry.id);
    expect(searchEntry).toBeDefined();
    expect(searchEntry).not.toBeNull();
    expect(searchEntry.id).toBe(entry.id)

})