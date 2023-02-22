import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {MathEntity} from "../types";


type MathRecordsResults = [MathRecord[], FieldPacket[]]

export class MathRecord implements MathEntity {
    public id?: string;
    public firstNum: number;
    public operator: string;
    public secondNum: number;
    public solution: number | null;
    public dateAdded?: string | null

    constructor(obj: MathEntity) {

        this.id = obj.id;
        this.firstNum = obj.firstNum;
        this.operator = obj.operator;
        this.secondNum = obj.secondNum;
        this.solution = obj.solution;
        this.dateAdded = obj.dateAdded
    }

    static async listAll(): Promise<MathRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `math_expressions` ORDER BY `dateAdded` DESC") as MathRecordsResults;
        return results.map(obj => new MathRecord(obj));
    }

    static async getOne(id: string): Promise<MathRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `math_expressions` WHERE `id` = :id", {
            id,
        }) as MathRecordsResults;
        return results.length === 0 ? null : new MathRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        if (!this.dateAdded) {
            let date = new Date();
            this.dateAdded = (date.getFullYear()) + '-' +
                ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' +
                ('00' + date.getHours()).slice(-2) + ':' +
                ('00' + date.getMinutes()).slice(-2) + ':' +
                ('00' + date.getSeconds()).slice(-2);
        }

        await pool.execute("INSERT INTO `math_expressions` VALUES(:id, :firstNum, :operator, :secondNum, :solution, :dateAdded)", {
            id: this.id,
            firstNum: this.firstNum,
            operator: this.operator,
            secondNum: this.secondNum,
            solution: this.solution,
            dateAdded: this.dateAdded,
        });

        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `math_expressions` WHERE `id` = :id", {
            id: this.id,
        });
    }
}
