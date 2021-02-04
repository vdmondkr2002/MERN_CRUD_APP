import React from 'react'
import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import {ThumbUpAltOutlined} from '@material-ui/icons';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deletePost,likePost } from '../../../actions/posts'

const Post = ({post,setCurrentId})=>{
    const classes = useStyles()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))

    const deleteaPost = (e)=>{
        console.log("deleting")
        dispatch(deletePost(post._id))
    }

    const likeaPost = (e)=>{
        dispatch(likePost(post._id))
        console.log(post)
    }

    const Likes = ()=>{
        if(post.likes.length>0){
            return post.likes.find((id)=>id===(user?.profile?.googleId)||(user?.profile?._id))?
            (
                <>
                <ThumbUpAltIcon fontSize="small"/>&nbsp; {(post.likes.length>2)?`You and ${post.likes.length-1} others`:`${post.likes.length} like${post.likes.length>1?'s':''}`}
                </>
            ):(
                <>
                <ThumbUpAltOutlined fontSize="small"/>&nbsp; {post.likes.length}{post.likes.length===1?'Like':'Likes'}
                </>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp; Like</>
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div> 
            {
                    user?.profile._id===post.creator?(
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={()=>{setCurrentId(post._id)}}><MoreHorizIcon fontSize="default" /></Button>
            </div>):null
            }
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.message}</Typography>
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.profile} onClick={likeaPost} >
                    <Likes/>
                </Button>
                {
                    user?.profile._id===post.creator?(
                        <Button size="small" color="primary" onClick={deleteaPost}>
                            <DeleteIcon fontSize="small" /> Delete
                        </Button>
                    ):null
                }
                
            </CardActions>
        </Card>
    )
}

export default Post