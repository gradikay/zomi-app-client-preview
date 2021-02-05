// This file is exported to ---> src/App.js
// React required
import React from "react";
import { Route, Switch } from "react-router-dom";
// Containers - Pages
import Home from "./containers/Home";  
import Login from "./containers/Login"; 
import AboutUs from "./containers/AboutUs"; 
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";
import Register from "./containers/Register"; 
import ContactUs from "./containers/ContactUs";
import Dashboard from "./containers/Dashboard"; 
import ProductNew from "./containers/ProductNew";
import ProductEdit from "./containers/ProductEdit";
import ProductUser from "./containers/ProductUser";
import ProductFilter from "./containers/ProductFilter";
import ProductView from "./containers/ProductView";
import UserAgreement from "./containers/UserAgreement";
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
            <AppliedRoute path="/about" exact component={AboutUs} appProps={appProps} />
            <AppliedRoute path="/filter/:id" component={ProductFilter} appProps={appProps} />   
            <AppliedRoute path="/view/:id" component={ProductView} appProps={appProps} />   
            <AppliedRoute path="/contact" exact component={ContactUs} appProps={appProps} />  
            <AppliedRoute path="/security/agreement" exact component={UserAgreement} appProps={appProps} />
            { /* AppliedRoute - Public & Private accessible links - End */ }

            { /* UnauthenticatedRoute - Public (Not logged In User) only links - Start */ }
            <UnauthenticatedRoute path="/login" component={Login} appProps={appProps} />
            <UnauthenticatedRoute path="/register" component={Register} appProps={appProps} />
            <UnauthenticatedRoute path="/reset" component={ResetPassword} appProps={appProps} />
            <UnauthenticatedRoute path="/my/code/codedeconfirmation" component={SignupConfirmation} appProps={appProps} />
            { /* UnauthenticatedRoute - Public (Not logged In User) only links - End */ }

            { /* AuthenticatedRoute - Private (logged In User) only links - Start */ }
            <AuthenticatedRoute path="/settings" component={Settings} appProps={appProps} />
            <AuthenticatedRoute path="/dashboard" component={Dashboard} appProps={appProps} />
            <AuthenticatedRoute path="/productnew" component={ProductNew} appProps={appProps} />
            <AuthenticatedRoute path="/productuser" component={ProductUser} appProps={appProps} />
            <AuthenticatedRoute path="/productedit/:id" component={ProductEdit} appProps={appProps} /> 
            { /* AuthenticatedRoute - Private (logged In User) only links - End */ }

            { /* 404 Page - Start */ }
            <Route component={NotFound} />
            { /* 404 Page - End */}

        </Switch>
    );
}