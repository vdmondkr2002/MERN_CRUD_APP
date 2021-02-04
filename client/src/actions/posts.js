import {FETCH_ALL,DELETE,UPDATE,LIKE,CREATE} from '../constants/actions'
const api = require('../api/index')

//Create an action 
export const getPosts = ()=> async(dispatch)=>{
    try {
        //get data from api
        const {data } = await api.fetchPosts()

        //dispatch event -> goes to reducers folder from here -> the arguments passed here goes to action object
        dispatch({type:FETCH_ALL,payload:data})
    } catch (err) {
        console.log(err.message)
    }
}

export const createPost = (newPost)=> async(dispatch)=>{
    try {
        console.log("Helo")
        const {data} = await api.createPost(newPost)
        console.log(data)
        dispatch({type:CREATE,payload:data})
    } catch (err) {
        console.log(err.messages)
    }
}

export const updatePost = (id,postData) => async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,postData)

        dispatch({type:UPDATE,payload:data})
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = (id) => async(dispatch)=>{
    try {
        await api.deletePost(id)
        console.log("deleted")
        dispatch({type:DELETE,payload:id})
    } catch (err) {
        console.log(err)
    }
}

export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePost(id)
        console.log(data)
        dispatch({type:LIKE,payload:data})
    } catch (err) {
        console.log(err)
    }
}