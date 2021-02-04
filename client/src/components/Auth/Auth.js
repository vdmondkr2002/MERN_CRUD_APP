import React,{useState,useEffect} from 'react'
import {Avatar,Paper,Button,Grid,Typography,Container,TextField} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {AUTH} from '../../constants/actions'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import {signIn,signUp} from '../../actions/auth'

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const classes = useStyles()
    const [showPassword,setShowPassword] = useState(false)
    const [isSignup,setIsSignup] = useState(true)
    const [formData,setFormData] = useState(initialState)
    const history = useHistory()
   
    const dispatch = useDispatch()


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(isSignup)
        if(isSignup){
            console.log(formData)
            dispatch(signUp(formData,history))
        }else{
            dispatch(signIn(formData,history))
        }
    }

    

    //pB8SwFqILT2MvIfxoGHDhFDE
    const handleShowPassword=()=>{
        setShowPassword(prevShowPassword=>!prevShowPassword)
    } 

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }   

    const switchMode=()=>{
        setIsSignup(previsSignUp=>!previsSignUp)
        setShowPassword(false)
    }
    
    const googleSuccess = async (res) => {
        console.log(res)
        const profile = res?.profileObj;
        const token = res?.tokenId;
        console.log(profile,token)
        try {
          dispatch({ type: AUTH, payload: { profile, token } });
    
          history.push('/');
        } catch (error) {
          console.log(error);
        }
    };

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange}  autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange}   half />
                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange}  handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    clientId="716279671550-01vfocmd0piq66eladgoco4ef4c07gcp.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
