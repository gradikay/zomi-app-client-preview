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
import "../css/Register.css";
// -------------- Application Begins Bellow ------------ //

export default function Register() {
    // Setting up our user fields
    const [fields, handleFieldChange] = useFields({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        confirmationCode: ""
    });
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    // Validating form when all fields are filled
    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.lastName.length > 0 &&
            fields.firstName.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    // Validating confirmation form
    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    // Submitting form handling
    async function handleSubmit(event) {
        // Preventing the default html behavior of form submition
        event.preventDefault();

        setIsLoading(true);

        try {
            // Storgin value in Cognito upon signing up
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
                attributes: { 
                    given_name: fields.firstName,
                    family_name: fields.lastName,
                    email: fields.email,
                    updated_at: "",
                    locale: "",
                    zoneinfo: "",
                    phone_number: "",
                    address: ""
                }
            });
            setIsLoading(false);
            // Storing new values in setNewUser
            setNewUser(newUser);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    // Verification code is verified with the email address store in the current session
    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
            // Setting up our user information with cognito and authenticating them
            userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    // Rendering confirmation User Interface
    

    

    // Return results
    return (
        <div id="Signup" className="bg-white border-bottom">
            {
                newUser === null ?
                    <RenderForm
                        validateForm={validateForm}
                        handleSubmit={handleSubmit}
                        handleFieldChange={handleFieldChange}
                        firstName={fields.firstName}
                        lastName={fields.lastName}
                        email={fields.email}
                        password={fields.password}
                        confirmPassword={fields.confirmPassword}
                        isLoading={isLoading}
                    /> :
                    <RenderConfirmationForm
                        handleConfirmationSubmit={handleConfirmationSubmit}
                        isLoading={isLoading}
                        validateConfirmationForm={validateConfirmationForm}
                        handleFieldChange={handleFieldChange}
                        confirmationCode={fields.confirmationCode}
                    />
            }
        </div>
    );
}

function RenderConfirmationForm(props) {
    const {
        handleConfirmationSubmit,
        isLoading,
        validateConfirmationForm,
        handleFieldChange,
        confirmationCode
    } = props;
    return (
        <main className="Signup container bg-white pt-3 pb-5 vh-100">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-12 text-center border-bottom mb-3">
                    <h1>Larissa</h1>
                    <p>You are almost done! <span role="img" aria-label="done">&#128079;&#127998;</span> </p>
                    <p>Check your email for the confirmation code! <span role="img" aria-label="confirmation code">&#128071;&#127998;</span> </p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-sm-4 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleConfirmationSubmit}>

                        { /* Confirmation Code - Start */}
                        <div className="form-group">
                            <label aria-label="congirmationCode">Confirmation Code</label>
                            <input
                                value={confirmationCode}
                                onChange={handleFieldChange}
                                type="tel"
                                className="form-control"
                                name="confirmationCode"
                                id="confirmationCode"
                                required="required"
                                placeholder="Code - 000000"
                            />
                        </div>
                        <span><small>Check your email for confirmation code.</small></span>
                        { /* Confirmation Code - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            className="btn-primary d-block my-3"
                            isLoading={isLoading}
                            disabled={!validateConfirmationForm()}
                        >
                            Verify
                            </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}

                </section>
                { /* Body - End */}

            </div>
        </main>
    );
}
// Rendering signup User Interface
function RenderForm(props) {
    const {
        validateForm,
        handleSubmit,
        handleFieldChange,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isLoading
    } = props;
    return (
        <main className="Signup container-fluid bg-white py-3 border-top">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-12 text-center border-bottom mb-3">
                    <h1>Larissa</h1>
                    <p><small>Already a patron? <span role="img" aria-label="thumbs">&#128073;</span><span role="img" aria-label="black shade">&#127998;</span> <Link to="/login">Login</Link> </small></p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-sm-4 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleSubmit}>

                        { /* First Name - Start */}
                        <div className="form-group">
                            <label aria-label="email">First Name</label>
                            <input
                                value={firstName}
                                onChange={handleFieldChange}
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control"
                                required="required"
                                autoComplete="given-name"
                            />
                        </div>
                        { /* First Name - End */}

                        { /* Last Name - Start */}
                        <div className="form-group">
                            <label aria-label="lastName">Last Name</label>
                            <input
                                value={lastName}
                                onChange={handleFieldChange}
                                type="text"
                                className="form-control"
                                name="lastName"
                                id="lastName"
                                required="required"
                                autoComplete="family-name"
                            />
                        </div>
                        { /* Last Name - End */}

                        { /* Email - Start */}
                        <div className="form-group">
                            <label aria-label="email">E-mail</label>
                            <input
                                value={email}
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
                                value={password}
                                onChange={handleFieldChange}
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                required="required"
                                autoComplete="new-password"
                            />
                        </div>
                        { /* Password - End */}

                        { /* Confirm Password - Start */}
                        <div className="form-group">
                            <label aria-label="confirmPassword">Confirm Password</label>
                            <input
                                value={confirmPassword}
                                onChange={handleFieldChange}
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                id="confirmPassword"
                                required="required"
                                autoComplete="new-password"
                            />
                        </div>
                        { /* Confirm Password - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            className="btn btn-primary d-block my-3"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Signup
                            </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}

                    <hr />

                    { /* Footer - Start */}
                    <footer className="p-2  w-100">
                        <p> <small>By continuing, you agree to Larissa's Terms of Service and Privacy Notice.</small> </p>
                        <hr />
                        <Link to="/reset">Forgot Password?</Link>
                    </footer>
                    { /* Footer - End */}

                </section>
                { /* Body - End */}

            </div>
        </main>
    );
}