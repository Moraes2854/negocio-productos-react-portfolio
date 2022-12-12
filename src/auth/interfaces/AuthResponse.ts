import { ValidRoles } from "./User";

export interface AuthResponse {
    id:string;
    email:string;
    password:string;
    fullName:string;
    isActive:boolean;
    roles:ValidRoles[],
    token:string;
}