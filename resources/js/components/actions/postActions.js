import * as type from '../actions/type';
import axios from "axios";


export const getPosts = () => dispatch=>{
    dispatch(setPostLoading());
    axios.get('/api/posts').then(
        res=>{dispatch({
            type:type.GET_POSTS,
            payload:res.data
        })
        
    }
    ).catch(err=>dispatch({
        type:type.GET_ERRORS,
        payload:err.response.data
    }))
}

export const getPostsWithoutLoading = () => dispatch=>{
    // dispatch(setPostLoading());
    axios.get('/api/posts').then(
        res=>{dispatch({
            type:type.GET_POSTS,
            payload:res.data
        })
        
    }
    ).catch(err=>dispatch({
        type:type.GET_ERRORS,
        payload:err.response.data
    }))
}


export const addPost = (postData, history) =>dispatch=>{
    dispatch(clearErrors());
    axios.post('/api/posts',postData).then(
        res=>history.push('/posts')
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}

export const editPost = (postData,id, history) =>dispatch=>{
    dispatch(clearErrors());
    axios.post('/api/posts/'+id,postData).then(
        res=>history.push('/posts')
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const deletePost = (id) =>dispatch=>{
    axios.delete('/api/posts/'+id).then(
        res => {
            dispatch({
                type:type.DELETE_POST,
                payload:id
            })
        }
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const setPostLoading = () =>{
    return{
        type:type.POST_LOADING
    }
}







// export const addLike = (id) =>dispatch=>{
//     axios.post('/api/posts/like/'+id).then(
//         res =>dispatch(getPosts())).catch(err=>{
//             dispatch({
//                 type:type.GET_ERRORS,
//                 payload:err.response.data
//         })
//     })
// }


// export const addDisLike = (id) =>dispatch=>{
//     axios.post('/api/posts/dislike/'+id).then(
//         res =>dispatch(getPosts())).catch(err=>{
//             dispatch({
//                 type:type.GET_ERRORS,
//                 payload:err.response.data
//         })
//     })
// }


export const getPost = (id)=>dispatch=>{
    dispatch(setPostLoading())
    axios.get('/api/posts/'+id).then(res=>{
        dispatch({
            type:type.GET_POST,
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:type.GET_POST,
            payload:null
        })
    })
}


export const addComment = (commentData) =>dispatch=>{
    dispatch(clearErrors());
    axios.post('/api/comments',commentData).then(
        res=>{
        dispatch(getPostsWithoutLoading())
    }
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const deleteComment = (commentId) =>dispatch=>{
    axios.delete('/api/comments/'+commentId).then(
        res=>dispatch(getPostsWithoutLoading())
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const clearErrors = () => dispatch=>{
    dispatch({
        type:type.CLEAR_ERRORS
    })
}