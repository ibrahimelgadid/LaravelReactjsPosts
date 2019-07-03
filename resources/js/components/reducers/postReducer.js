import * as type from '../actions/type';

const initialState={
    posts:[],
    post:{},
    loading:true
};

export default function(state=initialState, action){
    switch (action.type) {
    
    case type.POST_LOADING:
        return{
            ...state,
            loading:true
        }
        

    case type.GET_POSTS:
            return{
                ...state,
                posts:action.payload,
                loading:true
            }



    case type.GET_POST:
        return{
            ...state,
            post:action.payload,
            loading:false
        }

    case type.DELETE_POST:
        return{
            ...state,
            posts:state.posts.filter(post=>post.id !== action.payload)
        }

    // case type.ADD_LIKE:
    //     return{
    //         ...state,
    //         posts:[action.payload]
    //     }

    // case type.ADD_DISLIKE:
    //     return{
    //         ...state,
    //         posts:[action.payload]
    //     }


        default:
            return state;
    }
}