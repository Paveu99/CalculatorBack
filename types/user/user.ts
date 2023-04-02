import {UserEntity} from "./user.entity";

export type CreateUserReq = Omit<UserEntity, 'id'>
export type CheckUserReq = Omit<UserEntity, 'id' | 'name' | 'surname'>