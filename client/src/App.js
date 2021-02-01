import React,{useEffect,useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './components/images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Forms/Form'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts.js'
const App = ()=>{
    const classes = useStyles()
    const [currentId,setCurrentId] = useState('')
    //A hook to access the redux dispatch function
    const dispatch = useDispatch()

    useEffect(()=>{
        //accepts an action call as an argument -> goes to actions folder
        dispatch(getPosts())
    },[dispatch,currentId])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </AppBar>
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
        </Container>
    )
}

export default App