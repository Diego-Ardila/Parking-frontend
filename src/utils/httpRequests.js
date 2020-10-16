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