import React,{useState, useEffect} from 'react'
import {Link,useHistory,useLocation} from 'react-router-dom'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import memories from '../images/memories.png'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './styles'
import { LOGOUT } from '../../constants/actions'
const Navbar = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const location = useLocation()

    //To load the user whenever we come back to this page without refreshing(like when we reach here using history.push('/))
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
        const token = user?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp*100 < new Date().getTime()) 
                logOut()
        }
    },[location,user?.token])



    const logOut = ()=>{
        dispatch({type:LOGOUT})
        setUser(null)
        history.push('/')
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/ " className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div> 
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user?.profile?.imageUrl} alt={user?.profile?.name}>{user?.profile?.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.profile?.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={logOut} color="secondary">LogOut</Button>
                    </div>
                ):(
                    <Button variant="contained" component={Link} to='/auth' color="primary">Sign Up</Button>
                )

                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar