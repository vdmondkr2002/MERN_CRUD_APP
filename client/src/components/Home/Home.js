import React,{useState,useEffect} from 'react'
import Posts from '../Posts/Posts'
import Form from '../Forms/Form'
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/posts'
import useStyles from '../../styles'
import {Container,Grid,Grow} from '@material-ui/core'
const Home = () => { 
    const classes = useStyles()
    const [currentId,setCurrentId] = useState('')

     //A hook to access the redux dispatch function
     const dispatch = useDispatch()

     useEffect(()=>{
         //accepts an action call as an argument -> goes to actions folder
         dispatch(getPosts())
     },[dispatch,currentId])
    return (
        <Grow in>
                <Container>
                <Grid  className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
                </Container>
        </Grow>
    )
}

export default Home
