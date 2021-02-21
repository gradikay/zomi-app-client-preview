// This file is exported to ---> src/Routes.js
// React required
import React, { useState } from "react";
// Components
import LoaderButton from "../components/LoaderButton";
// Amplify required
import { Auth } from "aws-amplify";
// Libs
import { useFields } from "../libs/hooksLib";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib"; 
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function ResetPassword() {
   
    // Important Variables
    const [isLoading, setIsLoading] = useState(false);
    const [sentRequest, setSentRequest] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFields({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        company: "",
        confirmPassword: "",
        confirmationCode: ""
    });

    // Validating Email function
    function validateEmail() {
        return fields.email.length > 0;
    }

    // Validating Confirmation form function
    function validateConfirmationForm() {
        return fields.password.length > 0 &&
            fields.password === fields.confirmPassword;
    }

    // Handling submitted verification code : This is exectuted first
    async function handleSubmitSendResetCode(event) {

        event.preventDefault();
        setIsLoading(true);

        try {

            // Amplify's Auth.forgotPassword : Check AWS cognito for submitted email 
            const sentRequest = await Auth.forgotPassword(fields.email)

            setIsLoading(false);
            setSentRequest(sentRequest);

        } catch (e) {

            alert(e.message);
            setIsLoading(false);

        }
    }

    // Handling submitted data : new password, email, and confirmation code
    async function handleSubmitResetPassword(event) {

        event.preventDefault();
        setIsLoading(true);

        try {

            // Getting user new password and email
            await Auth.forgotPasswordSubmit(fields.email, fields.confirmationCode, fields.password)
            // Then Sign in the user
            await Auth.signIn(fields.email, fields.password);
            
            userHasAuthenticated(true); 

        } catch (e) {

            alert(e.message);
            setIsLoading(false);

        }
    }

    // Return UI
    return (
        <div className="Signup bg-white">
            {
                /* Checking if the user has submitted an email address */
                sentRequest === null
                    ?
                    // Render Email Field
                <RenderEmailField
                    email={fields.email}
                    isLoading={isLoading}
                    validateEmail={validateEmail}
                    handleFieldChange={handleFieldChange}
                    handleSubmitSendResetCode={handleSubmitSendResetCode}
                />
                    :
                    // Render Password Field
                <RenderResetPasswordField
                        password={fields.password}
                        isLoading={isLoading}
                        confirmPassword={fields.confimPassword}
                        handleFieldChange={handleFieldChange}
                        confirmationCode={fields.confirmationCode}
                        validateConfirmationForm={validateConfirmationForm}
                        handleSubmitResetPassword={handleSubmitResetPassword}
                />
            }
        </div>
    );
}


// First, We get the user email 
function RenderEmailField(props) {

    // Important variables
    const {

        email,
        isLoading,
        validateEmail,
        handleFieldChange,
        handleSubmitSendResetCode

    } = props;


    return (
        <main className="Signup container-fluid bg-white py-3 vh-100 border-bottom">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-9 text-center border-bottom mb-3 mx-auto">
                    <h1>Zomi</h1>
                    <p>Please, Verify your email bellow!</p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-sm-5 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleSubmitSendResetCode}>

                        { /* Email - Start */}
                        <div className="form-group">
                            <label aria-label="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                                placeholder="Please enter your email"
                            />
                        </div>
                        { /* Email - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateEmail()}
                            className="btn-primary d-block my-3"
                        >
                            Send
                            </LoaderButton>
                        { /* Submit Button - End */}

                    </form>
                    { /* Form - End */}

                    { /* Lower Section - Start */}
                    <section className="p-2 border-top">
                        <p className="border-bottom pb-3">
                            <small>By using this application, you agree to Zomi's <a href="#">Terms of Service</a> and <a href="#">Privacy Notice</a>. </small>
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


// If the user exist, Let them reset the password
function RenderResetPasswordField(props) {

    // Important variables
    const {

        password,
        isLoading,
        confirmPassword,
        confirmationCode,
        handleFieldChange,
        validateConfirmationForm,
        handleSubmitResetPassword

    } = props;


    return (
        <>
            <main className="Signup container-fluid bg-white pt-3 pb-5 border-bottom">
                <div className="row">

                    { /* Header - Start */}
                    <header className="col-sm-9 text-center border-bottom mb-3 mx-auto">
                        <h1>Zomi</h1> 
                        <p>Please, Check your email for a confirmation code!</p>
                    </header>
                    { /* Header - End */}

                    { /* Body - Start */}
                    <section className="col-sm-5 mx-auto">

                        { /* Form - Start */}
                        <form onSubmit={handleSubmitResetPassword}>

                            { /* Pass Code - Start */}
                            <div className="form-group">
                                <label aria-label="confirmationCode">Confirmation Code</label>
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
                            <span><small>Enter your confirmation code and reset your password!</small></span>
                            { /* Pass Code - Start */}

                            <hr />

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
                                    onChange={handleFieldChange}
                                />
                            </div>
                            { /* Confirm Password - End */}

                            { /* Submit Button - Start */}
                            <LoaderButton
                                block
                                type="submit"
                                isLoading={isLoading}
                                className="btn-primary d-block my-3"
                                disabled={!validateConfirmationForm()}
                            >
                                Update & Login
                                </LoaderButton>
                            { /* Submit Button - End */}

                        </form>
                        { /* Form - End */}

                    </section>
                    { /* Body - End */}

                </div>
            </main>
        </>
    );
}