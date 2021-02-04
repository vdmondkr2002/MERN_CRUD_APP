import {AUTH, LOGOUT} from '../constants/actions'
const authReducer = (state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            console.log(action.payload)
            localStorage.setItem('profile',JSON.stringify({...action?.payload}))
            return {...state,authdata:action?.payload}
        case LOGOUT:
            localStorage.clear()
            return {...state,authdata:null}
        default:
            return state;
    }
}

export default authReducer;