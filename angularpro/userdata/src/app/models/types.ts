export interface User{
    _id:string;
    firstname:string;
    email:string;
    userType:string;
    age:number|null;
    password?:string;
}

export interface LoginLog{
    userId:string;
    loginAt:string;
    userAgent:string;
    
}

export interface ApiResponse<T>{
    data:T;
    message:string;
    status:number

}

export interface onlineUser{
    userId:string;
    firstname:string;
    socketId:string;
    connectedAt:string;
}