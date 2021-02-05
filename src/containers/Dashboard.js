// This file is exported to --->  src/Routes.js
// React required
import React, { useState, useEffect } from "react";
// Amplify required
import { Auth } from "aws-amplify";
// -------------- Application Begins Bellow ------------ //


export default function Dashboard() { 
    //const { path } = useRouteMatch();
    //const { userHasAuthenticated } = useAppContext();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        let unmounted = false;
        async function onLoad() {
            try {
                if (!unmounted) {
                    // bypassCache set to "true" will update the page with update cognito data
                    let user = await Auth.currentAuthenticatedUser({ bypassCache: true });
                    let { attributes } = user;
                    setUser(attributes);  
                }

            }
            catch (e) {
                if (e !== 'No current user') {
                    alert(e);
                }
            }

            setIsAuthenticating(false);

        }
        onLoad();
        return () => {
            unmounted = true;
        }
    }, []); 

    return (
         // Make sure that the user has authenticated before returning
        !isAuthenticating && (
            <> 
                <main className="Board bg-white p-3"> 
                    { /* Board */}
                    <Board user={user} /> 
                </main>
            </> 
        )
    );
}
const Board = ({ user }) => {
    return (
        <>
            <div className="row mx-auto justify-content-center ">
                <div className="col-sm-8 bg-light border m-3 p-3">
                    <h3>Alertes et Messages</h3>
                    <p>{user['custom:firstName']}, trouverez ci-dessous la liste des alertes qui n&eacute;cessitent votre attention.</p>
                </div>
                <div className="col-sm-8 border p-3 m-3">
                    <div className="media"> 
                        <div className="media-body">
                            <h3>Alertes</h3>
                            <hr />
                        { /* ALERTS */ }
                        <Alerts user={user} />
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
}
const Alerts = ({ user }) => {
 
    return (
        <>
            <div
                className={
                    user["custom:address"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-danger"
                }
            >
                {
                    user["custom:address"] != null ?
                        <h3><strong>Super! </strong> L'adresse de votre boutique est configur&eacute;.</h3> :
                        <h3><strong>Danger! </strong>L'adresse de votre boutique n'a pas &eacute;t&eacute; configur&eacute;e.</h3>
                }
                <p>La configuration de votre address aide les clients &agrave; vous trouver lorsqu'ils recherchent des entreprises dans un endroit pr&eacute;cis. </p>
            </div>
            <div
                className={
                    // if
                    user["custom:province"] && user["custom:city"] === null ?
                        "d-block alert alert-danger" :

                    // else if
                    user["custom:province"] && user["custom:city"] === "undefined" ?
                            "d-block alert alert-danger" :

                    // else
                        "d-block alert alert-success"
                }
            >
                {
                    // if
                    user["custom:province"] && user["custom:city"] === null ?
                        <h3><strong>Danger! </strong>La province et la ville de votre magasin sont n&eacute;cessaires pour publier un produit, vous ne l'avez pas encore configur&eacute;.</h3> :

                    // else if 
                        user["custom:province"] && user["custom:city"] === "undefined" ?
                            <h3><strong>Danger! </strong>La province et la ville de votre magasin sont n&eacute;cessaires pour publier un produit, vous ne l'avez pas encore configur&eacute;.</h3> :

                    // else
                            <h3><strong>Super! </strong>La province et la ville de votre magasin sont configur&eacute;</h3>
                }
                <p>La configuration de votre ville et de votre province aidera les clients &agrave; vous trouver lorsqu'ils recherchent des entreprises dans un endroit pr&eacute;cis. </p>
            </div> 
            <div
                className={
                    user["custom:storeManager"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-info"
                }
            >
                {
                    user["custom:storeManager"] != null ?
                        <h3><strong>Super! </strong>Le nom de votre g&eacute;rant de magasin est configur&eacute;.</h3> :
                        <h3><strong>Information! </strong>Indiquez le nom de votre g&eacute;rant de magasin.</h3>
                }
            </div>
            <div
                className={
                    user["custom:storeDepartment"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-info"
                }
            >
                {
                    user["custom:storeDepartment"] != null ?
                        <h3><strong>Super! </strong>Votre d&eacute;partement est configur&eacute;.</h3> :
                        <h3><strong>Information! </strong>Quel est votre d&eacute;partement? vous ne l'avez pas encore configur&eacute;.</h3>
                }
            </div>
            <div
                className={
                    user["custom:storeEmail"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-danger"
                }
            >
                {
                    user["custom:storeEmail"] != null ?
                        <h3><strong>Super! </strong> Votre e-mail est configur&eacute;.</h3> :
                        <h3><strong>Danger! </strong>Vous n'avez pas d&eacute;fini d'e-mail pour votre boutique.</h3>
                }
            </div>
            <div
                className={
                    user["custom:storeWeb"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-info"
                }
            >
                {
                    user["custom:storeWeb"] != null ?
                        <h3><strong>Information! </strong>Le site Web de votre magasin est configur&eacute;.</h3> :
                        <h3><strong>Information! </strong>Le site Web de votre magasin est manquant.</h3>
                }
            </div>
            <div
                className={
                    user["custom:storePhoneNumber"] != null ?
                        "d-block alert alert-success" :
                        "d-block alert alert-danger"
                }
            >
                {
                    user["custom:storePhoneNumber"] != null ?
                        <h3><strong>Super! </strong> Votre num&eacute;ro de t&eacute;l&eacute;phone est configur&eacute;.</h3>:
                        <h3><strong>Danger! </strong> Le num&eacute;ro de t&eacute;l&eacute;phone de votre magasin est manquant.</h3>
                }
                
            </div>
        </>
        );
}