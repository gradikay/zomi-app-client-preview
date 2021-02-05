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
// CSS
import "../css/Register.css";
// -------------- Application Begins Bellow ------------ //

export default function ResetPassword() {
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
    function validateEmail() {
        return fields.email.length > 0;
    }
    function validateConfirmationForm() {
        return fields.password.length > 0 &&
            fields.password === fields.confirmPassword;
    }

    async function handleSubmitSendResetCode(event) {
        // Preventing the default html behavior of form submition
        event.preventDefault();
        setIsLoading(true);

        try {
            // Storgin value in Cognito upon signing up
            const sentRequest = await Auth.forgotPassword(fields.email)

            setIsLoading(false);
            setSentRequest(sentRequest);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    async function handleSubmitResetPassword(event) {
        // Preventing the default html behavior of form submition
        event.preventDefault();
        setIsLoading(true);

        try {
            // Storgin value in Cognito upon signing up
            await Auth.forgotPasswordSubmit(fields.email, fields.confirmationCode, fields.password)
            await Auth.signIn(fields.email, fields.password);
            // Setting up our user information with cognito and authenticating them
            userHasAuthenticated(true);
            // Send us to /boutique after successfully signing in
            //window.location.reload();
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    function renderEmailField() {
        return (
            <main className="Signup container bg-white py-3 vh-100">
                <div className="row">

                    { /* Header - Start */}
                    <header className="col-sm-12 text-center border-bottom mb-3">
                        <h1>Larissa</h1>
                        <p>Verify your email, Please! <span role="img" aria-label="hand down">&#128071;</span><span role="img" aria-label="dark skin">&#127998;</span> </p>
                    </header>
                    { /* Header - End */}

                    { /* Body - Start */}
                    <section className="col-sm-4 mx-auto">

                        { /* Form - Start */}
                        <form onSubmit={handleSubmitSendResetCode}>

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
                                />
                            </div>
                            { /* Email - End */}

                            { /* Submit Button - Start */}
                            <LoaderButton
                                block
                                type="submit"
                                className="btn-primary d-block my-3"
                                isLoading={isLoading}
                                disabled={!validateEmail()}
                            >
                                Send
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
    function renderResetPasswordField() {
        return (
            <>
                <main className="Signup container bg-white pt-3 pb-5">
                    <div className="row">

                        { /* Header - Start */}
                        <header className="col-sm-12 text-center border-bottom mb-3">
                            <h1>Larissa</h1>
                            <p>You are almost done! <span role="img" aria-label="hands">&#128079;</span><span role="img" aria-label="dark skin">&#127998;</span> </p>
                            <p>Check your email for the confirmation code! <span role="img"
                                aria-label="hand">&#128071;</span><span role="img" aria-label="dark skin">&#127998;</span> </p>
                        </header>
                        { /* Header - End */}

                        { /* Body - Start */}
                        <section className="col-sm-4 mx-auto">

                            { /* Form - Start */}
                            <form onSubmit={handleSubmitResetPassword}>

                                { /* Pass Code - Start */}
                                <div className="form-group">
                                    <label aria-label="confirmationCode">Confirmation Code</label>
                                    <input
                                        value={fields.confirmationCode}
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
                                { /* Pass Code - Start */}

                                <hr />

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
                                    />
                                </div>
                                { /* Password - End */}

                                { /* Confirm Password - Start */}
                                <div className="form-group">
                                    <label aria-label="confirmPassword">Confirm Password</label>
                                    <input
                                        value={fields.confirmPassword}
                                        onChange={handleFieldChange}
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        required="required"
                                    />
                                </div>
                                { /* Confirm Password - End */}

                                { /* Submit Button - Start */}
                                <LoaderButton
                                    block
                                    type="submit"
                                    className="btn-primary d-block my-3"
                                    isLoading={isLoading}
                                    disabled={!validateConfirmationForm()}
                                >
                                    Update
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

    return (
        <div className="Signup">
            {sentRequest === null ? renderEmailField() : renderResetPasswordField()}
        </div>
    );
}