// This file is exported to ---> src/Routes.js
// React required
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Amplify required
import { Auth } from "aws-amplify";
// Components
import LoaderButton from "../components/LoaderButton";
// Libs
import { useFields } from "../libs/hooksLib";
// Setting up - user status (user login - true) - for useAppContext
import { useAppContext } from "../libs/contextLib"; 
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function Login() {

    // Important Variables
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFields({
        email: "",
        password: ""
    });

    // Validating function : enable submit button when our input are filled
    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    // Handling submitted data
    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        try {
            // Getting the user email and password 
            await Auth.signIn(fields.email, fields.password);

            // Setting userHasAuthenticated to "True" in userAppContext() 
            userHasAuthenticated(true);
            window.location.reload();

        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }


    // Return UI
    return (
        <main className="Signup container-fluid border-top border-bottom bg-white py-3">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-9 text-center border-bottom mb-3 mx-auto">
                    <h1>Larissa</h1> 
                    <p> Not a Member? <Link to="/register"> Signup here </Link> </p>
                </header>
                { /* Header - End */}

                { /* Form and Lower Section - Start */}
                <section className="col-sm-5 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleSubmit} autoComplete="on">

                        { /* Email - Start */}
                        <div className="form-group">
                            <label aria-label="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required="required"
                                autoComplete="email"
                                value={fields.email}
                                className="form-control"
                                onChange={handleFieldChange}
                            />
                        </div>
                        { /* Email - End */}

                        { /* Password - Start */}
                        <div className="form-group">
                            <label aria-label="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required="required"
                                value={fields.password}
                                className="form-control"
                                onChange={handleFieldChange}
                                autoComplete="current-password"
                            />
                        </div>
                        { /* Password - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                            className="btn btn-primary d-block my-3"
                        >
                            Login
                        </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}

                    { /* Lower Section - Start */}
                    <section className="p-2 border-top">
                        <p className="border-bottom pb-3">
                            <small>By signing in, you agree to Larissa's <a href="#">Terms of Service</a> and <a href="#">Privacy Notice</a>. </small>
                        </p>

                        <Link to="/reset"> Forgot password? </Link>
                        <span> | </span>
                        <Link to="/confirmation"> ( I have a verification code ) </Link>
                    </section>
                    { /* Lower Section - End */}

                </section>
                { /* Form and Lower Section - End */}

            </div>
        </main>
    );
}