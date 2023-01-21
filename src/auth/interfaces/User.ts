export type ValidRoles = 'user'|'super-user'|'admin';

export interface User {
    email:string;
    fullName:string;
    id:string;
    isActive:boolean;
    password:string;
    roles:ValidRoles[];
}