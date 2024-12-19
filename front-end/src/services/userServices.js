import axios from "axios"

export const checkUserLogin = async (data) =>{
    const response = await axios.post('http://localhost:8000/api/auth/checkUserLogin',data);
    return response;
}

export const userRegister = async (data) =>{
    const response = await axios.post('http://localhost:8000/api/auth/sendVerificationCode',data);
    return response;
}

export const verifyCode = async (data) =>{
    const response = await axios.post('http://localhost:8000/api/auth/checkVerificationCode',data);
    return response;
}

export const sendResetPasswordLink = async (data) =>{
    const response = await axios.post('http://localhost:8000/api/auth/forgotPassword',data);
    return response;
}

export const resetPassword = async (data) =>{
    const response = await axios.post('http://localhost:8000/api/auth/resetPassword',data);
    return response;
}