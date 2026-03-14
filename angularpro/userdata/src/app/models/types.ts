export interface User{
    _id:string;
    firstname:string;
    email:string;
    userType:string;
    age:number|null;
    password?:string;
}

export interface Polls {
  _id: string;
  question: string;
  options: PollOption[];
  createdBy: string;  
  hidden: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes?: number;
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