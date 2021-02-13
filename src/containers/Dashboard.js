// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Amplify required
import { API } from "aws-amplify";
import { S3Image } from 'aws-amplify-react'; 
import { useAppContext } from "../libs/contextLib";
// CSS
import "../css/Dashboard.css"
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function Dashboard() {

    // Important variables 
    const { isAuthenticated, userId, userEmail, userFirstName, signedupDate, userLastName} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // Retreiving data from database
    useEffect(() => {

        // Cleanup variable
        let unmounted = false;

        async function onLoad() {

            setIsLoading(true);

            // Loading products from Dynamodb
            function loadPosts() {
                // Note: "posts" is the [API] -> [endpoint] -> [name] in src -> index.js
                return API.get("posts", "/posts");
            } 

            try {

                // Important variable
                const posts = await loadPosts();

                if (!unmounted) {
                    // Saving retreived data into posts variable
                    setPosts(posts);
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
            setPosts([]);
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
                signedupDate={signedupDate}
                userLastName={userLastName} 
                posts={posts && posts}
            /> 
            {/* Header - End */}

            {/* Posts - Start */}
            <Posts posts={posts} isLoading={isLoading} /> 
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
                    const { streetState, streetCity } = post.address;
                    const { postId, userId, postStatus } = post;
                    const convertDate = new Date(post.createdAt);
                    const postedOn = convertDate.toDateString();
                    const price = Number(post.postPrice).toLocaleString();


                    // Return UI
                    return (
                        <div className="col-sm-6 col-md-4 text-white p-2" key={i++}>

                            <div className="card shadow-sm">

                                { /* Image - Start */}
                                <S3Image level="protected" identityId={userId} imgKey={image1} />
                                { /* Image - End */}
                                 
                                { /* Overlay - Start */}
                                <div className="card-img-overlay">

                                    { /* Top Overlay */}
                                    <div className="overlay-top">
                                        <span className="badge badge-primary rounded">
                                            {postStatus} - {postedOn}
                                        </span>
                                    </div>

                                    { /* Bottom Overlay */}
                                    <div className="overlay-bottom">
                                        <p className="m-0"><small>{streetCity}, {streetState}</small></p>
                                        <p className="m-0"><b>${price}</b></p>
                                    </div>

                                </div> 
                                { /* Overlay - End */} 

                                { /* Body card - Start */} 
                                <div className="card-body bg-white text-center">
                                    <div className="btn-group" style={{ zIndex: "1" }}>  

                                        <Link to={`/postedit/${postId}`} className="btn btn-danger">
                                            <i className="fa fa-minus-square"></i> Edit
                                        </Link>  

                                        <Link to={`/view/${postId}`} className="btn btn-info">
                                            <i className="fa fa-external-link-square"></i> View
                                        </Link>  
                                    </div>
                                </div>
                                { /* Body card - End */} 

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