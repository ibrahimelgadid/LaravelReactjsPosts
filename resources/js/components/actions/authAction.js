import * as type from './type';
import axios from "axios";

import setAuth from "../components/setAuth";


export const registerUser = (newUser,history)=> dispatch =>{
    dispatch(clearErrors());
    axios.post('/api/auth/register',newUser)
    .then(res=>history.push('/login')
    ).catch(err=>dispatch(getError(err)))
}


export const loginUser = (loginUser,history)=> dispatch =>{
    dispatch(clearErrors());
    axios.post('/api/auth/login', loginUser)
        .then(res=>{
            const { access_token } = res.data;
            localStorage.setItem('userToken', (access_token));
            setAuth(`Bearer ${access_token}`)
            axios.post('/api/auth/me')
            .then(res=>{
                let userData = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    userAvatar:res.data.userAvatar
                };
                localStorage["userData"] = JSON.stringify(userData);
                dispatch(setCurrentUser(JSON.parse(localStorage["userData"] )));
                history.push('/posts')
                
            }).catch(err=>dispatch(getError(err)));
        }).catch(err=>dispatch(getError(err)))
}

export const logoutUser = (history)=> dispatch =>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setAuth(false);
    dispatch(setCurrentUser({}));
}



//getting current user
export const setCurrentUser = (userData)=>{
    return{
        type:type.SET_CURRENT_USER,
        payload:userData
    }
}


//get errors
export const getError = (err)=>{
    return{
        type:type.GET_ERRORS,
        payload:err.response.data
    }
}

//get errors
export const clearErrors = (err)=>{
    return{
        type:type.CLEAR_ERRORS
    }
}

