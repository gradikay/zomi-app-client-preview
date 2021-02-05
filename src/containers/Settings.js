// This file is exported to ---> src/Routes.js
// React required
import React from "react"; 
import { Link } from "react-router-dom";
// CSS
import "../css/Account.css";
// Images
import image1 from "../img/dash2.png";
import image2 from "../img/dash5.png";
import image3 from "../img/dash4.png"; 
import dashbusiness from "../img/dashbusiness.png"; 
import imagemail from "../img/dashmail.png"; 
// -------------- Application Begins Bellow ------------ //


// Rendergin cards
function Card(props) {
    return (
        <Link className="nav-link" to={props.link}>
            { /* INFORMATION CONTAINER */}
            <div className="col-sm-3 p-3">
                { /* CARD */}
                <div className="card shadow-sm">
                    { /* CARD HEADER */}
                    <div className="card-header">
                        { /* CARD MEDIA */}
                        <div className="media d-flex flex-wrap align-items-center">
                            { /* CARD MEDIA IMAGE */}
                            <img src={props.image} alt={props.image} className="align-self-center mr-3" />
                            { /* CARD MEDIA BODY */}
                            <div className="media-body">
                                <h3 className="m-0">{props.cardTitle}</h3>
                            </div>
                        </div>
                    </div>
                    { /* CARD BODY */}
                    <div className="card-body">
                        <p className="m-0">{props.cardBodyText}</p>
                    </div>
                    { /* CARD FOOTER */}
                    <div className="card-footer"><p className="m-0">{props.cardFooterText}</p></div>
                </div>
            </div>
        </Link>
        );
}
// Main function
export default function Settings() {

    return (
        // Make sure that the user has authenticated before returning
        // we are just tasting this project here
        <>
            <main className="Settings bg-white">
                <div className="row mx-auto justify-content-center ">
                    <div className="col-sm-12 bg-light border m-3 p-3" >
                        <h3 className="m-0">Compte</h3>
                    </div>
                    { /* DASHBOARD */}
                    <Card
                        link="/dashboard"
                        image={image1}
                        cardTitle="Tableau de bord"
                        cardBodyText="Voir les alertes et les messages important sur votre compte."
                        cardFooterText="Alertes - Messages"
                    />
                    { /* USER PRODUCTS */}
                    <Card
                        link="/productuser"
                        image={image3}
                        cardTitle="List de Produits"
                        cardBodyText="Regarder et modifier vos produits, services, ou aliments publi&eacute;s."
                        cardFooterText="Produit - Service - Aliment"
                    />
                    { /* ADD NEW PRODUCTS */}
                    <Card
                        link="/productnew"
                        image={image2}
                        cardTitle="Ajouter un produit"
                        cardBodyText="Publier ou ajouter un produit, un service ou un aliment."
                        cardFooterText="Produit - Service - Aliment"
                    /> 
                    { /* STORE INFORMATION */}
                    <Card
                        link="/storeinformation"
                        image={dashbusiness}
                        cardTitle="Information du Business"
                        cardBodyText="Modifier les informations de votre entreprise, boutique, ou service."
                        cardFooterText="Entreprise - Boutique - Business"
                    />
                    <Card
                        link="/messages"
                        image={imagemail}
                        cardTitle="Messages"
                        cardBodyText="Acceder vos message"
                        cardFooterText="Message"
                    />
                </div>
            </main> 
        </>
    );
}