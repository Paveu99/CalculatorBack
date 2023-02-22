import {MathEntity} from "./math.entity";

export type CreateMathReq = Omit<MathEntity, 'id'>