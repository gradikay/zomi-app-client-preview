// This file is exported to ---> src/Routes.js
// React required
import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib";
// -------------- Application Begins Bellow ------------ //


// Link available to Logged In users
// before (route):       <Route path="/account" exact component={Account}/>
// after (custom route): <AuthenticatedRoute path="/account" exact component={Account} appProps={appProps} />

export default function AuthenticatedRoute({ children, ...rest }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                    <Redirect to={
                        `/login?redirect=${pathname}${search}`
                    } />
                )}
        </Route>
    );
}