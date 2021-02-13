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
export default function Register() {

    // Important Variables 
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFields({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        confirmPassword: "",
        confirmationCode: ""
    });

    // Enabling submit button when all fields are filled
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

    // Handling submitted data
    async function handleSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {

            // Sending data to AWS Cognito via Amplify - Auth.signUp
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
                attributes: { 
                    given_name: fields.firstName,
                    family_name: fields.lastName,
                    email: fields.email,
                    phone_number: "",
                    updated_at: "",
                    zoneinfo: "",
                    locale: "",
                    address: ""
                }
            });

            setNewUser(newUser);
            setIsLoading(false); 

        } catch (e) {

            alert(e.message);
            setIsLoading(false);

        }
    }


    // Handling Verification Code
    async function handleConfirmationSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {

            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
             
            userHasAuthenticated(true);

        } catch (e) {

            alert(e.message);
            setIsLoading(false);

        }
    }


    // Return UI
    return (

        <div id="Signup" className="bg-white border-bottom">

            {
                newUser === null ?

                    // Render form
                    <RenderForm
                        email={fields.email}
                        isLoading={isLoading}
                        password={fields.password}
                        lastName={fields.lastName}
                        validateForm={validateForm}
                        handleSubmit={handleSubmit}
                        firstName={fields.firstName}
                        handleFieldChange={handleFieldChange}
                        confirmPassword={fields.confirmPassword}
                    />
                    :

                    // Render confirmation form
                    <RenderConfirmationForm
                        isLoading={isLoading}
                        handleFieldChange={handleFieldChange}
                        confirmationCode={fields.confirmationCode}
                        validateConfirmationForm={validateConfirmationForm}
                        handleConfirmationSubmit={handleConfirmationSubmit}
                    />
            }

        </div>
    );
}

// First, let collect users' information
function RenderForm(props) {


    // Important variables
    const {

        handleFieldChange,
        confirmPassword,
        validateForm,
        handleSubmit,
        firstName,
        isLoading,
        lastName,
        password,
        email

    } = props;


    // Return UI
    return (
        <main className="Signup container-fluid bg-white py-3 border-top">
            <div className="row">

                { /* Header - Start */}
                <header className="col-md-9 text-center border-bottom mb-3 mx-auto">
                    <h1>Larissa</h1>
                    <p>Already a member? <Link to="/login">Login here!</Link> </p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-md-5 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleSubmit}>

                        { /* First Name - Start */}
                        <div className="form-group w-50 float-left">
                            <label aria-label="given_name">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                required="required"
                                className="form-control"
                                autoComplete="given-name"
                                onChange={handleFieldChange}
                            />
                        </div>
                        { /* First Name - End */}

                        { /* Last Name - Start */}
                        <div className="form-group w-50 float-right">
                            <label aria-label="family_name">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                required="required"
                                className="form-control"
                                autoComplete="family-name"
                                onChange={handleFieldChange}
                            />
                        </div>
                        { /* Last Name - End */}

                        { /* Email - Start */}
                        <div className="form-group">
                            <label aria-label="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                required="required"
                                autoComplete="email"
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
                                value={password}
                                required="required"
                                className="form-control"
                                autoComplete="new-password"
                                onChange={handleFieldChange}
                            />
                        </div>
                        { /* Password - End */}

                        { /* Confirm Password - Start */}
                        <div className="form-group">
                            <label aria-label="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                required="required"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                className="form-control"
                                autoComplete="new-password"
                                onChange={handleFieldChange}
                            />
                        </div>
                        { /* Confirm Password - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                            className="btn btn-primary d-block my-3"
                        >
                            Register
                        </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */} 

                    { /* Footer - Start */}
                    <footer className="p-2  w-100 border-top">
                        <p className="border-bottom pb-3">
                            <mdall>By registering, you agree to Larissa's <a href="#">Terms of Service</a> and <a href="#">Privacy Notice</a>.</mdall>
                        </p>
                        <Link to="/reset"> Forgot password? </Link>
                        <span> | </span>
                        <Link to="/confirmation"> ( I have a verification code ) </Link>
                    </footer>
                    { /* Footer - End */}

                </section>
                { /* Body - End */}

            </div>
        </main>
    );
}

// Then, we send them a confirmation code and render the input field
function RenderConfirmationForm(props) {

    // Important variables
    const {

        isLoading,
        confirmationCode,
        handleFieldChange,
        handleConfirmationSubmit,
        validateConfirmationForm,

    } = props;


    //Return UI
    return (
        <main className="Signup container-fluid bg-white pt-3 pb-5 vh-100">
            <div className="row">

                { /* Header - Start */}
                <header className="col-md-10 text-center border-bottom mb-3 mx-auto">
                    <h1>Larissa</h1> 
                    <p>Please, check your email for a confirmation code! </p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-md-5 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleConfirmationSubmit}>

                        { /* Confirmation Code - Start */}
                        <div className="form-group">
                            <label aria-label="congirmationCode">Confirmation Code</label>
                            <input
                                type="tel"
                                required="required"
                                id="confirmationCode"
                                name="confirmationCode"
                                className="form-control"
                                value={confirmationCode}
                                placeholder="Code - 000000"
                                onChange={handleFieldChange}
                            />
                        </div>
                        <span><mdall>Check your email for confirmation code.</mdall></span>
                        { /* Confirmation Code - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            isLoading={isLoading}
                            className="btn-primary d-block my-3"
                            disabled={!validateConfirmationForm()}
                        >
                            Verify
                            </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}


                    { /* Lower Section - Start */}
                    <section className="p-2 border-top">
                        <p className="border-bottom pb-3">
                            <small>By using this application, you agree to Larissa's <a href="#">Terms of Service</a> and <a href="#">Privacy Notice</a>. </small>
                        </p>

                        <a href="/login"> Login </a>
                        <span> | </span>
                        <a href="/register"> Register instead! </a>
                    </section>
                    { /* Lower Section - End */}


                </section>
                { /* Body - End */}

            </div>
        </main>
    );
}