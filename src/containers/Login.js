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
// CSS
import "../css/Login.css";
// -------------- Application Begins Bellow ------------ //

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFields({
        email: "",
        password: ""
    });
    // Validation function
    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }
    // Sumbitted data get executed
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {

            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            window.location.reload();

        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }
    // Returning UI
    return (
        <main className="Signup container-fluid border-top border-bottom bg-white py-3">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-12 text-center border-bottom mb-3">
                    <h1>Larissa</h1> 
                    <p> <small>Not a patron? Member? <span role="img" aria-label="hand">&#128073;</span><span role="img" aria-label="skin dark">&#127998;</span> <Link to="/signup">Signup</Link> </small></p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-sm-4 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleSubmit} autoComplete="on">

                        { /* Email - Start */}
                        <div className="form-group">
                            <label aria-label="email">E-mail</label>
                            <input
                                value={fields.email}
                                onChange={handleFieldChange}
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                required="required"
                                autoComplete="email"
                            />
                        </div>
                        { /* Email - End */}

                        { /* Password - Start */}
                        <div className="form-group">
                            <label aria-label="password">Password</label>
                            <input
                                value={fields.password}
                                onChange={handleFieldChange}
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                required="required"
                                autoComplete="current-password"
                            />
                        </div>
                        { /* Password - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            className="btn btn-primary d-block my-3"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Continue
                        </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}

                    <hr />

                    { /* Footer - Start */}
                    <footer className="p-2  w-100">
                        <p> <small>By continuing, you agree to Fiberabbit's Terms of Service and Privacy Notice.</small> </p>
                        <hr />
                        <Link to="/reset">Forgot password?</Link>
                    </footer>
                    { /* Footer - End */}

                </section>
                { /* Body - End */}

            </div>
        </main>
    );
}