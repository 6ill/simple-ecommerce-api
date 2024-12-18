import { Role } from "../enums";

export interface UserDecoded {
    username:string;
    email:string;
    role:Role;
    iat:number;
    exp:number;
}