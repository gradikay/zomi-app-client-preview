// This file is exported to src/App.js
// React required
import React from "react";
import { Route, Switch } from "react-router-dom";
// Containers - Pages
import Home from "./containers/Home";  
import Login from "./containers/Login";   
import NotFound from "./containers/NotFound";
import Register from "./containers/Register";    
import PostNew from "./containers/PostNew";
import PostEdit from "./containers/PostEdit";
import Dashboard from "./containers/Dashboard";
import PostFilter from "./containers/PostFilter";
import PostView from "./containers/PostView"; 
import ResetPassword from "./containers/ResetPassword"; 
import SignupConfirmation from "./containers/SignupConfirmation";
// Components
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute"; 
// -------------- Application Begins Bellow ------------ //


export default function Routes({ appProps }) {
    return (
        <Switch>

            { /* AppliedRoute - Public & Private accessible links - Start */ }
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />    
            <AppliedRoute path="/filter/:name" component={PostFilter} appProps={appProps} />   
            <AppliedRoute path="/view/:id" component={PostView} appProps={appProps} />      
            { /* AppliedRoute - Public & Private accessible links - End */ }

            { /* UnauthenticatedRoute - Public (Not logged In User) only links - Start */ }
            <UnauthenticatedRoute path="/login" component={Login} appProps={appProps} />
            <UnauthenticatedRoute path="/register" component={Register} appProps={appProps} />
            <UnauthenticatedRoute path="/reset" component={ResetPassword} appProps={appProps} />
            <UnauthenticatedRoute path="/confirmation" component={SignupConfirmation} appProps={appProps} />
            { /* UnauthenticatedRoute - Public (Not logged In User) only links - End */ }

            { /* AuthenticatedRoute - Private (logged In User) only links - Start */ } 
            <AuthenticatedRoute path="/postnew" component={PostNew} appProps={appProps} />
            <AuthenticatedRoute path="/dashboard" component={Dashboard} appProps={appProps} />
            <AuthenticatedRoute path="/postedit/:id" component={PostEdit} appProps={appProps} /> 
            { /* AuthenticatedRoute - Private (logged In User) only links - End */ }

            { /* 404 Page - Start */ }
            <Route component={NotFound} />
            { /* 404 Page - End */}

        </Switch>
    );
}