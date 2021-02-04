import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import useStyles from './style'
import {useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/posts'
const Form = ({currentId,setCurrentId})=>{
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const user = JSON.parse(localStorage.getItem('profile'))?.profile

    const [postData,setPostData] = useState({
        title:'',message:'',tags:'',selectedFile:''
    })

    //get the post data of required post 
    const post = useSelector((state)=>currentId?state.posts.find((post)=>post._id===currentId):null); 

    
    useEffect(()=>{
        if(post)
            setPostData(post)
    },[post])

    

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(postData)
        
        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.name}))
        }else{
            dispatch(createPost({...postData,name:user?.name}))
        }
        
        clear()
    }

    if(!user?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign In to create your own memories
                </Typography>
            </Paper>
        )
    }

    const clear = ()=>{
        setCurrentId(null)
        setPostData({title:'',message:'',tags:'',selectedFile:''})
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?(<>Editing memory</>):(<>Creating memory</>)}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth  value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form