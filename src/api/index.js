import instance from './request';

export const loginRequest = (data)=>{
 return instance({url:'/user/login',data,method:'POST'})
}

export const registerRequest = (data)=>{
 return instance({url:'/user/addUser',data,method:'POST'})
}

export const emailCodeRequest = (email)=>{
 return instance({url:`/user/sendMail/${email}`,method:'GET'})
}