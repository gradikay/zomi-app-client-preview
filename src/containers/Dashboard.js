// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useAppContext } from "../libs/contextLib";
// CSS
import "../css/Dashboard.css";
import { data as dummyPosts } from "../DummyData/data";

// -------------- Application Begins Bellow ------------ //

// Main Application
export default function Dashboard() {

    // Important variables 
    const { isAuthenticated, userId, userEmail, userFirstName, userLastName} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

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

        // Return onLoad function
        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
        };

    }, [isAuthenticated]);

    // Return UI
    return (
        <main id="Dashboard" className="border-bottom">

            {/* Header - Start */}
            <Header
                userId={userId}
                userEmail={userEmail}
                userFirstName={userFirstName} 
                userLastName={userLastName}
                posts={dummyPosts}
            /> 
            {/* Header - End */}

            {/* Posts - Start */}
            <Posts posts={dummyPosts} isLoading={isLoading} /> 
            {/* Posts - End */}

        </main>
    );
}

// Header
function Header(props) {

    // Important variables 
    const { userId, userEmail, userFirstName, userLastName, posts } = props

    // Return UI
    return (
        <header className="container-fluid border-bottom py-3 bg-light">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-3 text-center">
                    <h1>Dashboard </h1>
                    <Link to="/postnew" className="btn btn-warning"> + NEW POST <i className="fa fa-share"></i></Link> 
                </div>
                <div className="col-sm-3">
                    <ul className="list-group list-group-flush"> 
                        <li className="list-group-item bg-light">User Id: {userId} </li>
                        <li className="list-group-item bg-light">Post Count: { posts.length}</li>
                    </ul>
                </div>
                <div className="col-sm-3">
                    <ul className="list-group list-group-flush"> 
                        <li className="list-group-item bg-light">First Name: {userFirstName} </li> 
                        <li className="list-group-item bg-light">Last Name: {userLastName}</li>
                        <li className="list-group-item bg-light">Email: {userEmail}</li>
                    </ul>
                </div>
            </div>
        </header>
        );
}

// User Posts Function
function Posts({ posts, isLoading }) {

    // Return UI
    return (
        <div className="container row mx-auto py-5">
            {!isLoading ?

                // Display after we have loaded our data
                posts.map((post, i) => {


                    // Important variables
                    const { image1 } = post.images;
                    const { postId, postTitle } = post;


                    // Return UI
                    return (
                        <div className="col-md-6 col-lg-4 p-3" key={i++}> 
                            <div className="card border-0">

                                { /* Image */}
                                <img src={image1} />

                                { /* Overlay - Start */}
                                <div className="card-body p-0">

                                    <p className="p-0 m-0" style={{ fontSize: "1.3rem" }}><b>{postTitle}</b></p>

                                </div>
                                { /* Overlay - End */}

                            </div> 
                            <div className="mt-3">
                                <a href={`/view/${postId}`} className="btn btn-outline-dark mr-3">
                                    <i className="fa fa-low-vision" role="img" aria-label="view"></i>
                                    <span> View </span>
                                </a>
                                <a href={`/postedit/${postId}`} className="btn btn-outline-danger">
                                    <i className="fa fa-edit" role="img" aria-label="edit"></i>
                                    <span> Edit </span>
                                </a> 
                            </div>

                        </div>
                    );
                })
                    :
                // Display while Loading data
                "Loading"
            }           
        </div>
        );
} 