// This file is exported to --->  src/Routes.js
import React from "react";
// -------------- Application Begins Bellow ------------ //


export default function AboutUs() {
    return (
        // Make sure that the user has authenticated before returning
        <>
            <main className="AboutUs bg-white">
                <div className="about-section-1 row shadow-sm pl-5 mx-auto justify-content-center "> 
                    <div className="col-sm-6 align-content-center d-flex flex-wrap align-content-center">
                        <h2>L'avenir du commerce au Congo</h2>
                        <p>Nous changeons la fa&ccedil;on dont les gens vendent au congo. Nous offrons aux entreprises, aux entrepreneurs et aux particuliers une plate-forme pour publier leurs produits et services en ligne afin d'atteindre plus de clients et d'accro&icirc;tre leur activit&eacute;.</p>
                    </div>
                    <div className="col-sm-6 with-background"></div>
                </div>
                <div className="about-section-2 row pl-5 mx-auto justify-content-center ">
                    <div className="col-sm-6 align-content-center d-flex flex-wrap align-content-center">
                        <h2>Opportunit&eacute;s &eacute;conomiques </h2>
                        <p>Nous autonomisons les gens et cr&eacute;ons des opportunit&eacute;s &eacute;conomiques. Nous voulons connecter des millions d'acheteurs et de vendeurs &agrave; travers l'Afrique.</p>
                    </div>
                    <div className="col-sm-6 with-background"></div>
                </div>
                <div className="about-section-3 row mx-auto m-3">
                    <div className="col-sm-6 hero-container" >
                        <div class="hero-image-1">
                            <div class="hero-text p-3">
                                <h2>Commer&ccedil;ant</h2>
                                <p>Nous offrons aux vendeurs, aux entreprises et aux particuliers un endroit pour promouvoir leurs produits et services gratuitement.</p><p> Nous gagnons quand vous gagnez. Nous ne sommes jamais en concurrence avec vos produits et services propri&eacute;taires d'entreprise.</p> 
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 hero-container">
                        <div class="hero-image-2">
                            <div class="hero-text p-3">
                                <h2>Acheteur</h2>
                                <p>Cette plateforme vous permet de trouver plus facilement les produits et services les plus proches de chez vous avec une simple recherche. Vous avez la possibilit&eacute; de comparer les prix et de faire le choix qui vous convient le mieux.</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </main> 
        </>
    );
}