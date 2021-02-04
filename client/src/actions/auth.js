import {AUTH} from '../constants/actions'
import api from '../api/index'

export const signUp = (formData,history)=> async(dispatch)=>{
    try {
        console.log(formData)
        //sign Up the user
        const {data} = await api.signUp(formData)
        console.log("data:",data)
        dispatch({type:AUTH,payload:data})
        history.push('/')
    } catch (err) {
        console.log(err)
    }
}

export const signIn = (formData,history)=> async(dispatch)=>{
    try {
        //log in the user
        const {email,password} = formData
        console.log(formData)
        console.log("Signing In....")
        const {data} =await  api.signIn({email,password})

        dispatch({type:AUTH,payload:data})

        history.push('/')
    } catch (err) {
        console.log(err)
    }
}