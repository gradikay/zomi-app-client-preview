// This file is exported to ---> src/Routes.js
// React required
import React from "react";
import { Route } from "react-router-dom";
// -------------- Application Begins Bellow ------------ //


// Link available to Public and Logged In users
// before (route):       <Route path="/" exact component={Home}/>
// after (custom route): <AppliedRoute path="/" exact component={Home} appProps={appProps} />

export default function AppliedRoute({ component: C, appProps, ...rest }) {
    return (
        <Route {...rest} render={props => <C {...props} {...appProps} />} />
    );
}
