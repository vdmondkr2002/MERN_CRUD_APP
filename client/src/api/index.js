const axios = require('axios')

const API = axios.create({ baseURL: 'http://localhost:5000/' });

//function going to happen during each of our request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
  

const urlPost = '/posts'

const fetchPosts = ()=> API.get(urlPost)

const createPost = (newPost)=>API.post(urlPost,newPost)

const updatePost = (id,postData)=>API.patch(`${urlPost}/${id}`,postData)

const deletePost = (id)=>API.delete(`${urlPost}/${id}`)

const likePost = (id)=>API.patch(`${urlPost}/${id}/likePost`)

const urlUser = '/users'

const signIn = (formData)=>API.post(`${urlUser}/signIn`,formData)
const signUp = (formData)=>API.post(`${urlUser}/signUp`,formData)

module.exports = {fetchPosts,createPost,updatePost,deletePost,likePost,signIn,signUp}

