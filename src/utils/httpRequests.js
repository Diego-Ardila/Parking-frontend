import axios from "axios";

export const getChats = async() => {    
    try{
        const response = await axios({
            method:"GET",
            baseURL:process.env.REACT_APP_SERVER_URL,
            url: "/chat"
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const createUser= async (data) => {
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user",
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const login= async (data) => {
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user/login",
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const adminLogin= async (data) => {
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/admin/login",
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const getUser= async (token) => {
    try{
        const response = await axios({
            method:"GET",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/user",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const validateAdmin= async (token) => {
    try{
        const response = await axios({
            method:"GET",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/admin",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const createMensualidad= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"POST",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/mensualidades",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const getMensualidades= async (userId) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"GET",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/mensualidades",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data:{
                userId
            } 
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const updateMensualidad= async (data) => {
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"PUT",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/mensualidades",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data
        })
        return response.data
    }
    catch(err){
        throw err
    }
}

export const GetPaymentInfoByReference = async (reference)=>{
    try{
        const response = await axios({
            method:"GET",
            baseURL:"https://api.secure.payco.co/validation/v1/reference/",
            url: reference
        })
        return response.data 
    }catch(err){
        throw(err)
    }
}

export const paidMensualidad= async (mensualidadId) => {
    console.log(mensualidadId)
    const token = localStorage.getItem('token')
    try{
        const response = await axios({
            method:"PUT",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url:"/mensualidades/paid",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: {
                mensualidadId
            }
        })
        return response.data
    }
    catch(err){
        throw err
    }
}