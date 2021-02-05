// This file is exported to --->  src/index.js
// React required
import React, { useState, useEffect } from "react";
// Amplify required
import { Auth } from "aws-amplify"; 
// Routes (Links) for all pages -- See -- src/Routes.js
import Routes from "./Routes"; 
// Components
import Footer from "./components/Footer"; 
import Navigation from "./components/Navigation";  
// AppContext holds the user status (signed in - true) or (signed out - false)
// AppContext holds the value of [isAuthenticated] and [useHasAuthenticated]
import { AppContext } from "./libs/contextLib";
// -------------- Application Begins Bellow ------------ //


export default function App() {
    // Check if the user is logged in (true) or logged out (false)
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    // Waiting for the application to finish signing in the user
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    // useEffect for the current session and setting our isAuthenticated to true if signed in
    useEffect(() => {
        async function onLoad() {
            try {
                await Auth.currentSession();
                userHasAuthenticated(true);
            }
            catch (e) {
                if (e !== 'No current user') {
                    alert(e);
                }
            }

            setIsAuthenticating(false);
        }
        onLoad(); 
    }, []);      

    return (
        !isAuthenticating && (  
            
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>

                { /* Navigation - (Navigation.js) - Main navigation - Start */}                    
                <Navigation/>
                { /* Navigation - (Navigation.js) - Main navigation - End */} 

                { /* Routes for all pages - (Routes.js) - Start */}
                <Routes />
                { /* Routes for all pages - (Routes.js) - End */}

                { /* Footer - (Footer.js) - Start */}
                <Footer />
                { /* Footer - (Footer.js) - End */}

            </AppContext.Provider>
            
        )
    );
}