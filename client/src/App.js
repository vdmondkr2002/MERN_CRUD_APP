import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
const App = ()=>{
    
    return (
        
        <Router>
            <Container maxWidth="lg">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/auth" component={Auth}/>
                </Switch>
            </Container>
        </Router>
        
    )
}

export default App