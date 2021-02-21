// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
// CSS
// import "../css/PostFilter.css"
// Dummy data
import { data as dummyPosts } from "../DummyData/data";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostFilter() { 

    // Important variables 
    const { name } = useParams();
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

        // Return load function
        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
        };

    }, [name]);

    // Return UI
    return (
        <main id="PostFilter"> 

            <Header posts={dummyPosts} name={name} />

            <Posts posts={dummyPosts} name={name} isLoading={isLoading} />  
            
        </main>
        );
}

// Header
function Header(props) {

    // Important variables
    const { posts, name } = props;

    // Return UI
    return (
        <header id="Header" className="container-fluid row py-3 border-bottom">
            <div className="col-sm-12">
                <h2>Searching for <i className="text-capitalize">{name}</i></h2>
                <p>{posts.length} Results </p>
            </div>
        </header>
        );
}

// Other sections
function Posts(props) {

    // Important variables
    const { posts, isLoading } = props;

    // Return UI
    return (
        <section id="Posts" className="container-fluid row py-5 bg-white border-bottom m-0">

            {/* Posts - Start 
              * - With - !isLoading && posts, we want only to return data if we have any
              * - If we have no data and omit "&& posts" we will get an error!
              */}
            {!isLoading && posts ?

                posts.map((post, i) => {

                    // Important variables
                    const { image1 } = post.images; 
                    const { postId, postTitle } = post;

                    // Return UI
                    return (
                        <div className="col-md-6 col-lg-4 p-2" key={i++}>

                            <a href={`/view/${postId}`} className="text-dark link-card">
                                <div className="card border-0">

                                    { /* Image */}
                                    <img src={image1} />

                                    { /* Overlay - Start */}
                                    <div className="card-body p-0">

                                        { /* Title */}
                                        <p className="p-0 m-0" style={{ fontSize: "1.3rem" }}><b>{postTitle}</b></p>

                                    </div>
                                    { /* Overlay - End */}

                                </div>
                            </a>

                        </div>
                    );
                })
                :
                "Loading"
            }
            {/* Posts Opinion - End */}

        </section>
        );
}
