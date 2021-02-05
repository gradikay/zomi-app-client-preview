// This file is exported to ---> src/Routes.js
// React required
import React from "react";
import { Route, Redirect } from "react-router-dom";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib";
// -------------- Application Begins Bellow ------------ //


function querystring(name, url = window.location.href) {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Link available to Public (not Logged In) users
// before (route):       <Route path="/login" exact component={Login}/>
// after (custom route): <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps}/> 

export default function UnauthenticatedRoute({ children, ...rest }) {
    const { isAuthenticated } = useAppContext();
    const redirect = querystring("redirect");
    return (
        <Route {...rest}>
            {!isAuthenticated ? (
                children
            ) : (
                    <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
                )}
        </Route>
    );
}