import React from 'react'
import Post from './Post/Post'
import {useSelector} from 'react-redux'
import { Grid,CircularProgress} from '@material-ui/core';
import useStyles from './style'
const Posts = ({setCurrentId})=>{
    //A hook to access the redux store's state.
    const posts = useSelector((state)=>state.posts)
    const classes = useStyles()

    console.log(posts.length)
    return (
        posts.length===0?<CircularProgress/>:
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post)=>(
                    <Grid item xs={12} sm={6}>
                        <Post setCurrentId={setCurrentId} key={post.id} post={post}/>
                    </Grid>
                ))
                }
            </Grid>
    )
}

export default Posts