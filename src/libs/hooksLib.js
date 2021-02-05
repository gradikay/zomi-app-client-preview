// **** THIS FILE IS EXPORTED TO ---> Register.js, Login.js, SignupConfirmation.js, ResetPassword.js ****
// Amplify required
import { useState } from "react";
// -------------- Application Begins Bellow ------------ //

// This is a Customer Hook
// useFormFields is exported to Register.js, Login.js, SignupConfirmation.js, ResetPassword.js
export function useFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}

// -------------- Learn More Begins Bellow ------------ //
// Learn more here ---> https://reactjs.org/docs/hooks-custom.html

// Explaination 

// Instead of using 
// -- const [email, setEmail] = useState("");
// -- const [password, setPassword] = useState("");

// Now we will use
// -- const [fields, handleFieldChange] = useFields({
//    email: "",
//    password: ""
// -- });