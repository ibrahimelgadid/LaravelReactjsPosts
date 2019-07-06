import * as type from './type';
import axios from "axios";
import store from "../store";
import { setCurrentUser } from "./authAction";


export const editAvatar = (id, avatar,history) => dispatch=>{
    axios.post('/api/avatar/'+id, avatar).then(
        res=>{
            const data = JSON.parse(localStorage.getItem('userData'));
            data.userAvatar = res.data;
            localStorage.setItem("userData", JSON.stringify(data));
            const userData = JSON.parse(localStorage.userData)
            // store.dispatch(setCurrentUser(userData));
            // history.push('/profile')
            window.location.href ='/profile'
            
        }
    ).catch(err=>dispatch({
        type:type.GET_ERRORS,
        payload:err.response.data
    }))
}


// export const getProfiles = () => dispatch=>{
//     dispatch(setProfileLoading());
//     axios.get('/api/profile/all').then(
//         res=>dispatch({
//             type:type.GET_PROFILES,
//             payload:res.data
//         })
//     ).catch(err=>dispatch({
//         type:type.GET_PROFILES,
//         payload:null
//     }))
// }
