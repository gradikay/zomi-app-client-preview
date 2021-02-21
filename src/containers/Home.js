// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib"; 
// Dummy Images 
import img1 from "../img/imgmain.jpg"
import img2 from "../img/img0.jpg"
import img3 from "../img/img3.jpg"
import img4 from "../img/img00.jpg"
// CSS
import "../css/Home.css"
// Dummy data
import { data as dummyPosts } from "../DummyData/data";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function Home() { 

    // Important variables
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false); 

    // Retreiving data from database
    useEffect(() => {

        // Cleanup variable
        let unmounted = false;

        async function onLoad() {

            setIsLoading(true);

            try {


                if (!unmounted) {

                }
                setIsLoading(false);

            } catch (e) {
                alert(e);
                setIsLoading(false);
            }
        }

        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
        };

    }, [isAuthenticated]); 

    // Return UI
    return (
        <main id="Home" className="border-bottom"> 

            <Header />

            <Banner />

            <div className="container-fluid row mx-auto pt-3 border-bottom">

                <SectionOpinion  />
                <SectionBusiness  />
                <SectionSport />

            </div>

            <div className="container-fluid row mx-auto py-3 border-bottom">

                <SectionTravel />
                <SectionTravel />

            </div>

            <div className="container-fluid row mx-auto pt-3 border-bottom">

                <SectionOpinion />
                <SectionBusiness />
                <SectionSport />

            </div>

            
        </main>
        );
}

// Header block
function Header() {

    // Return UI
    return (

        <header  id="Header" className="container-fluid row m-0">

            {/* Image filter display only - Start -
             * - NOTE: Filter helps you sort your DynamoDB data
             * - Choose to dislplay your post filters using images
             * - Use className "moveForward" to slide icons forward
             */}
            <div className="col-md-6 col-lg-4 border py-3">
                <div className="row"> 

                    {/* Image 1 - Start */}
                    <div className="col-sm-12 mb-3">
                        <div className="card">

                            <a className="text-dark" href={`/filter/opinion`}>

                                {/* Image */}
                                <img src={img1} alt="opinion" className="border shadow-sm" />

                                <div className="card-img-overlay">

                                    {/* Title */}
                                    <h3 className="moveForward my-2 bg-warning py-2 px-5 border border-dark rounded">
                                        <b> Opinion <i className="fa fa-bullhorn" role="img" aria-label="bullhorn"></i></b>
                                    </h3>

                                </div>
                            </a>

                        </div> 
                    </div> 
                    {/* Image 1 - End */}

                    {/* Image 2 - Start */}
                    <div className="col-sm-12">
                        <div className="card">
                            <a className="text-white" href={`/filter/travel`}>

                                {/* Image */}
                                <img src={img2} alt="travel" className="border shadow-sm" />

                                <div className="card-img-overlay">

                                    {/* Title */}
                                    <h3 className="moveForward my-2 bg-dark py-2 px-5 border border-light rounded">
                                        <b> Travel <i className="fa fa-fighter-jet" role="img" aria-label="fighter-jet"></i></b>
                                    </h3>

                                </div>

                            </a>
                        </div> 
                    </div> 
                    {/* Image 2 - End */}
                </div>
            </div>
            {/* Image filter display only - End */}

            {/* Image filter display with Post Lists - Start -
             * - NOTE: Filter helps you sort your DynamoDB data
             * - Choose to dislplay your post filters using images in combination with Post List
             * - Use className "moveBackward" to slide icons backward
             */}
            <div className="col-md-6 col-lg-4 border py-3">
                <div className="row">

                    {/* Image - Start */}
                    <div className="col-sm-12">
                        <div className="card">

                            <a className="text-dark" href={`/filter/Sport`}>

                                {/* Image */}
                                <img src={img4} className="border shadow-sm" />

                                <div className="card-img-overlay">

                                    {/* Title */}
                                    <h3 className="moveForward my-2 bg-warning py-2 px-5 border border-dark rounded">
                                        <b> Sport <i className="fa fa-futbol-o" role="img" aria-label="futball"></i> </b>
                                    </h3>

                                </div>
                            </a>

                        </div>
                    </div> 
                    {/* Image - End */}

                    {/* Post List - Start */}
                    <div className="col-sm-12">
                        <ul className="list-group list-group-flush">

                            {/* Dummy Posts - Start */}
                            {
                                dummyPosts.slice(0,5).map((post, i) => {

                                    const { postTitle, postId } = post;
                                    const title = postTitle.substr(0, 50)

                                    // Return UI
                                    return (
                                        <li className="moveBackward list-group-item list-group-item-action text-dark" key={i++}>

                                            <a className="text-dark" href={`/view/${postId}`}>

                                                {/* Icon */}
                                                <i className="fa fa-newspaper-o" role="img" aria-label="news"></i>

                                                {/* Title */}
                                                <small>
                                                    { /* - we are returning only 50 characters, 
                                                       * if the character is equal to 50; return the title and add "..." after it
                                                       * */ }
                                                    <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                                </small>
                                            </a>

                                        </li>
                                    );
                                })
                            }
                            {/* Dummy Posts - End */}

                        </ul>
                    </div>
                    {/* Post List - End */}

                </div>
            </div>
            {/* Image filter display with Post Lists - End */}

            {/* Post Lists  only - Start -
             * - NOTE: Filter helps you sort your DynamoDB data
             * - Choose to dislplay your post filters using Post List
             * - Use className "moveBackward" to slide icons backward
             */}
            <div className="col-md-12 col-lg-4 py-3 border">
                <div className="row">
                    <div className="col-sm-12">

                        <ul className="list-group list-group-flush">

                            {/* Title */}
                            <li className="list-group-item text-danger">
                                <i>Breaking News ...</i>
                            </li>

                            {/* Dummy Posts - Start */}
                            {
                                dummyPosts.map((post, i) => {

                                    // Important variables
                                    const { postTitle, postId } = post;
                                    const title = postTitle.substr(0, 50)

                                    // Return UI
                                    return (
                                        <li className="moveBackward list-group-item list-group-item-action  text-dark">

                                            <a className="text-dark" href={`/view/${postId}`}>

                                                { /* Icon */}
                                                <i className="fa fa-newspaper-o" role="img" aria-label="news"></i>

                                                { /* Title */}
                                                <small>
                                                    { /* - we are returning only 50 characters, 
                                                       * if the character is equal to 50; return the title and add "..." after it
                                                       * */ }
                                                    <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                                </small>
                                            </a>

                                        </li>
                                    );
                                })
                            }
                            {/* Dummy Posts - End */}

                        </ul>

                    </div>
                </div>
            </div>
            {/* Post Lists only - End */}

        </header>
        );
}

// Banner
function Banner() {
    return (
        <div className="container-fluid row bg-danger shadow-sm text-white m-0">
            <div className="col-sm-12 h-100">
                <div className="row">

                    <div className="col-sm-4 text-center">
                        <h3 className="m-0 my-2"><b>COVID 19: 480,000+ US deaths</b></h3>
                    </div>

                    <div className="col-sm-4 text-center">
                        <h3 className="m-0 my-2"><b>Prepare for your shot </b></h3> 
                    </div>

                    <div className="col-sm-4 text-center">
                        <h3 className="m-0 my-2"><b>Staying safe after vaccination </b></h3>
                    </div>

                </div>
            </div>
        </div>
        );
}

// Section Opinion
function SectionOpinion() {

    // Return UI
    return (
        <section id="SectionOpinion" className="col-sm-6 col-md-6 col-lg-4 p-2">

            {/* Image & Title - Start */}
            <a href={`/filter/opinion`} className="moveForward link-card text-dark">

                {/* Image */}
                <img src={img3} />

                {/* Title */}
                <h3 className="my-2">
                    <b> Opinion <i className="fa fa-bullhorn"></i></b>
                </h3>
            </a>
            {/* Image & Title - End */}

            {/* Post Lists - Start */}
            <div className="card border-0">                                     
                <div className="card-body border-top p-0">                                         
                    <ul className="list-group list-group-flush">

                        {/* Dummy Posts - Start */}
                        {
                            dummyPosts.slice(0,3).map((post, i) => {

                                const { postTitle, postId } = post;
                                const title = postTitle.substr(0, 50)

                                // Return UI
                                return (
                                    <li className="moveBackward list-group-item list-group-item-action text-dark">
                                        <a className="text-dark" href={`/view/${postId}`}>
                                            <i className="fa fa-bullhorn" role="img" aria-label="news"></i>
                                            <small>
                                                <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                            </small>
                                        </a>
                                    </li>
                                );
                            })
                        }
                        {/* Dummy Posts - End */}
                    </ul>
                </div>
            </div>
            {/* Post Lists - End */}

        </section>
        );
}

// Section Business
function SectionBusiness() {

    // Return UI
    return (
        <section id="SectionBusiness" className="col-sm-6 col-md-6 col-lg-4 p-2">

            {/* Image & Title - Start */}
            <a href={`/filter/business`} className="moveForward link-card text-dark">

                {/* Image */}
                <img src={img1} />

                {/* Title */}
                <h3 className="my-2">
                    <b> Business <i className="fa fa-briefcase"></i></b>
                </h3>

            </a>
            {/* Image & Title - End */}

            {/* Post Lists - Start */}
            <div className="card border-0">
                <div className="card-body border-top p-0">
                    <ul className="list-group list-group-flush">

                        {/* Dummy Posts - Start */}
                        {
                            dummyPosts.slice(3, 6).map((post, i) => {

                                const { postTitle, postId } = post;
                                const title = postTitle.substr(0, 50)

                                // Return UI
                                return (
                                    <li className="moveBackward list-group-item list-group-item-action  text-dark">

                                        <a className="text-dark" href={`/view/${postId}`}>

                                            { /* Icon */}
                                            <i className="fa fa-briefcase" role="img" aria-label="news"></i>

                                            { /* Title */}
                                            <small>
                                                { /* - we are returning only 50 characters, 
                                                     * if the character is equal to 50; return the title and add "..." after it
                                                     * */ }
                                                <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                            </small>
                                        </a>
                                    </li>
                                );
                            })
                        }
                        {/* Dummy Posts - End */}
                    </ul>
                </div>
            </div>
            {/* Post Lists - End */}

        </section>
        );
}

// Section Sport
function SectionSport() {

    // Return UI
    return (
        <section id="SectionSport" className="col-sm-6 col-md-6 col-lg-4 p-2">

            {/* Image & Title - Start */}
            <a href={`/filter/sport`} className="moveForward link-card text-dark">

                {/* Image */}
                <img src={img4} />

                {/* Title */}
                <h3 className="my-2">
                    <b> Sport <i className="fa fa-futbol-o" role="img" aria-label="futball"></i> </b>
                </h3>

            </a> 
            {/* Image & Title - End */}

            {/* Post Lists - Start */}
            <div className="card border-0">
                <div className="card-body border-top p-0">
                    <ul className="list-group list-group-flush">

                        {/* Dummy Posts - Start */}
                        {
                            dummyPosts.slice(5, 8).map((post, i) => {

                                const { postTitle, postId } = post;
                                const title = postTitle.substr(0, 50)

                                // Return UI
                                return (
                                    <li className="moveBackward list-group-item list-group-item-action  text-dark">

                                        <a className="text-dark" href={`/view/${postId}`}>

                                            { /* Icon */ }
                                            <i className="fa fa-futbol-o" role="img" aria-label="futball"></i>

                                            { /* Title */ }
                                            <small>
                                                { /* - we are returning only 50 characters, 
                                                     * if the character is equal to 50; return the title and add "..." after it
                                                     * */ }
                                                <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                            </small>

                                        </a>
                                    </li>
                                );
                            })
                        }
                        {/* Dummy Posts - End */}

                    </ul>
                </div>
            </div>
            {/* Post Lists - End */}

        </section>
    );
}

// Section Travel
function SectionTravel() {

    // Return UI
    return (
        <section id="SectionTravel" className="col-sm-6 col-md-6 p-2">
            <div className="row">

                {/* Image - Start */}
                <div className="col-sm-6">
                    <a href={`/filter/travel`} className="link-card text-dark">
                        <img src={img2} className="border rounded" />
                    </a>
                </div>
                {/* Image - End */}

                {/* Title & Post Lists - End */}
                <div className="col-sm-6">

                    {/* Title */}
                    <a href={`/filter/travel`} className="link-card text-dark">
                        <h3 className="moveForward my-2">
                            <b> Travel <i className="fa fa-fighter-jet" role="img" aria-label="fighter-jet"></i> </b>
                        </h3>
                    </a>

                    {/* Post Lists - Start */}
                    <div className="card-body border-top p-0">
                        <ul className="list-group list-group-flush">

                            {/* Dummy Posts - Start */}
                            {
                                dummyPosts.slice(0, 3).map((post, i) => {


                                    const { postTitle, postId } = post;
                                    const title = postTitle.substr(0, 30)

                                    // Return UI
                                    return (
                                        <li className="moveBackward list-group-item list-group-item-action  text-dark">

                                            <a className="text-dark" href={`/view/${postId}`}>

                                                { /* Icon */}
                                                <i className="fa fa-fighter-jet" role="img" aria-label="fighter-jet"></i>

                                                { /* Title */}
                                                <small>
                                                    { /* - we are returning only 50 characters, 
                                                     * if the character is equal to 50; return the title and add "..." after it
                                                     * */ }
                                                    <b> {title.length === 50 ? title + " ..." : title + ""} </b>
                                                </small>

                                            </a>
                                        </li>
                                    );
                                })
                            }
                            {/* Dummy Posts - End */}

                        </ul>
                    </div>
                    {/* Post Lists - End */}

                </div>
                {/* Title & Post Lists - End */}

            </div>
        </section>
    );
}