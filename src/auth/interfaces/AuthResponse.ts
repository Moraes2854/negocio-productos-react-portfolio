import { ValidRoles } from "./User";

export interface AuthResponse {
    email:string;
    fullName:string;
    id:string;
    isActive:boolean;
    password:string;
    roles:ValidRoles[],
    token:string;
}