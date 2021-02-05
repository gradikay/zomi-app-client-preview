// This file is exported to --->  src/Routes.js
import React from "react"; 
import {Link} from "react-router-dom";
// Images
import image1 from "../img/dash2.png";
import image2 from "../img/dash5.png";
import image3 from "../img/dash4.png";
import imagemail from "../img/dashmail.png";
import imagefaq from "../img/dashfaq.png";
import imagehelp from "../img/dashhelp.png";
import dashbusiness from "../img/dashbusiness.png";
// -------------- Application Begins Bellow ------------ //


export default function ContactUs() {
 
    return (
        // Make sure that the user has authenticated before returning
        <>
            <main className="Settings bg-white">
                <div className="row mx-auto justify-content-center ">
                    <div className="col-sm-12 bg-light border m-3 p-3">
                        <h3 className="m-0">Compte</h3>
                    </div>
                    { /* DASHBOARD */ }
                    <Link className="nav-link" to="/dashboard">
                        { /* STORE INFORMATION CONTAINER */}
                        <div className="col-sm-3 p-3">
                            { /* CARD */}
                            <div className="card shadow-sm">
                                { /* CARD HEADER */}
                                <div className="card-header">
                                    { /* CARD MEDIA */}
                                    <div className="media d-flex flex-wrap align-items-center">
                                        { /* CARD MEDIA IMAGE */}
                                        <img src={image1} alt={ image1 } className="align-self-center mr-3" />
                                        { /* CARD MEDIA BODY */}
                                        <div className="media-body">
                                            <h3 className="m-0">Tableau de bord</h3>
                                        </div>
                                    </div>
                                </div>
                                { /* CARD BODY */}
                                <div className="card-body">
                                    <p className="m-0">Voir les alertes et les messages important sur votre compte.</p>
                                </div>
                                { /* CARD FOOTER */}
                                <div className="card-footer"><p className="m-0">Alertes - Messages</p></div>
                            </div>
                        </div> 
                    </Link>
                    { /* USER PRODUCTS */ }
                    <Link className="nav-link" to="/productuser">
                        { /* USER PRODUCTS CONTAINER */ }
                        <div className="col-sm-3 p-3">
                            { /* CARD */ }
                            <div className="card shadow-sm">
                                { /* CARD HEADER */ }
                                <div className="card-header">
                                    { /* CARD MEDIA */ }
                                    <div className="media d-flex flex-wrap align-items-center">
                                        { /* CARD MEDIA IMAGE */ }
                                        <img src={image3} alt={image3} className="align-self-center mr-3" />
                                        { /* CARD MEDIA BODY */ }
                                        <div className="media-body">
                                            <h3 className="m-0">List de Produits</h3>
                                        </div>
                                    </div>
                                </div>
                                { /* CARD BODY */ }
                                <div className="card-body"> 
                                    <p className="m-0">Regarder et modifier vos produits, services, ou aliments publi&eacute;s.</p> 
                                </div>
                                { /* CARD FOOTER */ }
                                <div className="card-footer"><p className="m-0">Produit - Service - Aliment</p></div>
                            </div>                            
                        </div>
                    </Link>
                    { /* ADD NEW PRODUCTS */ }
                    <Link className="nav-link" to="/productnew">
                        { /* ADD NEW PRODUCTS CONTAINER */}
                        <div className="col-sm-3 p-3">
                            { /* CARD */}
                            <div className="card shadow-sm">
                                { /* CARD HEADER */}
                                <div className="card-header">
                                    { /* CARD MEDIA */}
                                    <div className="media d-flex flex-wrap align-items-center">
                                        { /* CARD MEDIA IMAGE */}
                                        <img src={image2} alt={image2} className="align-self-center mr-3" />
                                        { /* CARD MEDIA BODY */}
                                        <div className="media-body">
                                            <h3 className="m-0">Ajouter un produit</h3>
                                        </div>
                                    </div>
                                </div>
                                { /* CARD BODY */}
                                <div className="card-body">
                                    <p className="m-0">Publier ou ajouter un produit, un service ou un aliment.</p>
                                </div>
                                { /* CARD FOOTER */}
                                <div className="card-footer"><p className="m-0">Produit - Service - Aliment</p></div>
                            </div>
                        </div>
                    </Link>
                    { /* STORE INFORMATION */ }
                    <Link className="nav-link" to="/storeinformation">
                        { /* STORE INFORMATION CONTAINER */}
                        <div className="col-sm-3 p-3">
                            { /* CARD */}
                            <div className="card shadow-sm">
                                { /* CARD HEADER */}
                                <div className="card-header">
                                    { /* CARD MEDIA */}
                                    <div className="media d-flex flex-wrap align-items-center">
                                        { /* CARD MEDIA IMAGE */}
                                        <img src={dashbusiness} alt={dashbusiness} className="align-self-center mr-3" />
                                        { /* CARD MEDIA BODY */}
                                        <div className="media-body">
                                            <h3 className="m-0">Information du Business</h3>
                                        </div>
                                    </div>
                                </div>
                                { /* CARD BODY */}
                                <div className="card-body">
                                    <p className="m-0">Modifier les informations de votre entreprise, boutique, ou service.</p>
                                </div>
                                { /* CARD FOOTER */}
                                <div className="card-footer"><p className="m-0">Entreprise - Boutique - Business</p></div>
                            </div>
                        </div>
                    </Link>
                    { /* HELP AND SUPPORT */ }
                    <div className="col-sm-3 border p-3 m-3 bg-light d-none">
                        <div className="media">
                            <img src={imagehelp} alt={imagehelp} className="align-self-center mr-3" />
                            <div className="media-body">
                                <h3>Centre d'aide</h3>
                                <p>Besoin d'aid? Envoyez-nous vos questions</p>
                            </div>
                        </div>
                    </div>
                    { /* FAQS */ }
                    <div className="col-sm-3 border p-3 m-3 bg-light d-none">
                        <div className="media">
                            <img src={imagefaq} alt={imagefaq} className="align-self-center mr-3" />
                            <div className="media-body">
                                <h3>FAQs</h3>
                                <p>Questions fr&eacute;quemment pos&eacute;es</p>
                            </div>
                        </div>
                    </div>
                    { /* CONTACT US*/ }
                    <div className="col-sm-3 border p-3 m-3 bg-light d-none">
                        <div className="media">
                            <img src={imagemail} alt={imagemail} className="align-self-center mr-3" />
                            <div className="media-body">
                                <h3>Contactez-nous</h3>
                                <p>Contactez-nous et faites-nous part de vos commentaires</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}