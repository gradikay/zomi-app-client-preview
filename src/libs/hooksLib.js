// Amplify required
import { useState } from "react";
// -------------- Application Begins Bellow ------------ //

// This is a Customer Hook
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

// Explaination 

// Instead of using 
// -- const [email, setEmail] = useState("");
// -- const [password, setPassword] = useState("");

// Now we will use
// -- const [fields, handleFieldChange] = useFields({
//    email: "",
//    password: ""
// -- });