// This file is exported to ---> src/Routes.js
// React required
import React, { useState } from "react";
// Amplify required
import { Auth } from "aws-amplify";
// Components
import LoaderButton from "../components/LoaderButton";
// Libs
import { useFields } from "../libs/hooksLib"; 
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function SignupConfirmation(props) {

    // Important variables
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFields({
        email: "",
        company: "",
        password: "",
        lastName: "",
        firstName: "",
        confirmPassword: "",
        confirmationCode: ""
    });

    // Validating Confirmation form function
    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    // Handling submitted verification code : This is exectuted first
    async function handleConfirmationSubmitAfter(event) {
        event.preventDefault();
        //setMessage = ""
        setIsLoading(true);

        try {

            await Auth.confirmSignUp(fields.email, fields.confirmationCode);

            // Redirect to login
            props.history.push("/login");

        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }
    return (
        <main className="Signup container bg-white py-3 vh-100">
            <div className="row">

                { /* Header - Start */}
                <header className="col-sm-12 text-center border-bottom mb-3">
                    <h1>Zomi</h1>
                    <p>Thank you for joining Zomi! <span role="img" aria-label="thumbs up">&#128077;</span><span role="img" aria-label="dark skin">&#127998;</span> </p>
                </header>
                { /* Header - End */}

                { /* Body - Start */}
                <section className="col-sm-4 mx-auto">

                    { /* Form - Start */}
                    <form onSubmit={handleConfirmationSubmitAfter}>

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

                        { /* Confimation Code - Start */}
                        <div className="form-group">
                            <label aria-label="congirmationCode">Confirmation Code</label>
                            <input
                                value={fields.confirmationCode}
                                onChange={handleFieldChange}
                                type="tel"
                                className="form-control"
                                name="congirmationCode"
                                id="congirmationCode"
                                required="required"
                                autoComplete="on"
                                placeholder="Code - 000000"
                            />
                        </div>
                        <span><small>Check your email for confirmation code.</small></span>
                        { /* Confimation Code - End */}

                        { /* Submit Button - Start */}
                        <LoaderButton
                            block
                            type="submit"
                            className="btn btn-primary d-block my-3"
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