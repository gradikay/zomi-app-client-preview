// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Amplify required
import { S3Image } from 'aws-amplify-react';
import { API } from "aws-amplify";
// CSS
import "../css/PostFilter.css"
// Dummy data
import { data as dummyPosts } from "../DummyData/data"
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostFilter() { 

    // Important variables 
    const { name } = useParams();
    const [search, setSearch] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // Handling search
    async function handleSearch(event) {

        event.preventDefault();

        try {

            // if there is no data return "all" data
            window.location.href = `/filter/${search === "" ? "all" : search.toLowerCase()}`;

        } catch (e) {
            alert(e);
        }
    }

    // Retreiving data from database
    useEffect(() => {

        // Cleanup variable
        let unmounted = false;

        async function onLoad() {

            setIsLoading(true);

            // Loading post from Dynamodb 
            function loadPosts() {
                // Note: "posts" is the [API] -> [endpoint] -> [name] in src -> index.js
                return API.get("posts", `/searching/all/${name}`);
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

        // Return load function
        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
            setPosts([]);
        };

    }, [name]);

    // Return UI
    return (
        <main id="PostFilter"> 
            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} />
            <SectionA posts={posts} name={name} isLoading={isLoading} />          
        </main>
        );
}

// Header
function Header(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (
        <header id="Header" className="container-fluid row m-0 bg-dark">
            <nav className="navbar navbar-expand-md">

                { /* Button - Start */ }
                <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#collapsibleLowerNavbar">
                    Filter <span className="fa fa-bars"></span>
                </button>
                { /* Button - End */ }                 

                { /* Links & Search - Start */ }
                <div className="collapse navbar-collapse" id="collapsibleLowerNavbar">

                    { /* Previous Page - Start */ }
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white border-right mr-3 pr-3" href="/"> <i className="fa fa-reply"></i> Back Home </a>
                        </li>
                    </ul>
                    { /* Previous Page - Start */ }

                    { /* Search - Start */ }
                    <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />
                    { /* Search - End */ }

                    { /* Dropdowns - Start */ }
                    <ul className="navbar-nav">

                        { /* Price Dropdown */ }
                        <li className="nav-item dropdown mr-3">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Price
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/filter/100000">+ $100K</a> 
                                <a className="dropdown-item" href="/filter/300000">+ $300K</a> 
                                <a className="dropdown-item" href="/filter/500000">+ $500K</a> 
                                <a className="dropdown-item" href="/filter/700000">+ $700K</a> 
                            </div>
                        </li> 

                        { /* Property Type Dropdown */ }
                        <li className="nav-item dropdown mr-3">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Property Type
                            </a>
                            <ul className="dropdown-menu">
                                <a className="dropdown-item" href="/filter/all">+ Any</a>
                                <a className="dropdown-item" href="/filter/single">+ Single Family Home</a>
                                <a className="dropdown-item" href="/filter/townhome">+ Townhome</a>
                                <a className="dropdown-item" href="/filter/condo">+ Condo</a>
                            </ul>
                        </li>

                        { /* Listing Status Dropdown */ }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Listing Status
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/filter/pending">+ Pending</a>
                                <a className="dropdown-item" href="/filter/sold">+ Sold</a>
                                <a className="dropdown-item" href="/filter/avalable">+ Available</a>
                                <a className="dropdown-item" href="/filter/foreclosure">+ Foreclosures</a>
                            </div>
                        </li> 
                    </ul>
                    { /* Dropdowns - End */}

                </div>
                { /* Links & Search - End */ }

            </nav>
        </header>
        );
}

// Search input
function Search(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (
        <div className="nav-item pr-3 border-right mr-3">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group">

                    { /* Input - Start */}
                    <input
                        id="search"
                        type="search"
                        name="search"
                        value={search}
                        placeholder="Search"
                        className="form-control"
                        onChange={e => setSearch(e.target.value)}
                    />
                    { /* Input - End */}

                    { /* Button - Start */}
                    <div className="input-group-append">
                        <button className="btn btn-light border" type="submit">
                            <i className='fa fa-search' role="img" aria-label="search"></i>
                        </button>
                    </div>
                    { /* Button - End */}

                </div>
            </form>
            { /* Form - End */}

        </div>
    );
}

// Other sections
function SectionA(props) {

    // Important variables
    const { posts, name, isLoading } = props;

    // Return UI
    return (
        <section id="SectionA" className="container-fluid row py-5 bg-white border-bottom m-0">

            <div className="col-sm-12">
                <h2>Searching for <i className="text-capitalize">{name}</i></h2>
                <p>{ posts.length } Results </p>
            </div>
             
            {!isLoading ?

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
                        <div className="col-md-6 col-lg-4 text-white p-2" key={i++}>

                            <a href={`/view/${postId}`} className="text-white link-card">
                                <div className="card shadow-sm">

                                    { /* Image */}
                                    <S3Image level="protected" identityId={userId} imgKey={image1} />

                                    { /* Overlay - Start */}
                                    <div className="card-img-overlay">

                                        { /* Top */}
                                        <div className="overlay-top">
                                            <span className="badge badge-primary rounded">
                                                {postStatus} - {postedOn}
                                            </span>
                                        </div>

                                        { /* Bottom */}
                                        <div className="overlay-bottom">
                                            <p className="m-0"><small>{streetCity}, {streetState}</small></p>
                                            <p><b>${price}</b></p>
                                        </div>

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
             
            {
                dummyPosts.map((post, i) => {


                    // Important variables
                    const { imageA } = post.images;
                    const { postState, postCity } = post.address;
                    const { postId, postStatus } = post;
                    const convertDate = new Date(post.createdAt);
                    const postedOn = convertDate.toDateString();
                    const price = Number(post.postPrice).toLocaleString();


                    // Return UI
                    return (
                        <div className="col-md-6 col-lg-4 text-white p-2" key={i++}>

                            <a href={`/view/${postId}`} className="text-white">
                                <div className="card shadow-sm">

                                    { /* Image */}
                                    <img src={imageA} />


                                    { /* Overlay - Start */}
                                    <div className="card-img-overlay">

                                        { /* Top */}
                                        <div className="overlay-top">
                                            <span className="badge badge-primary rounded">
                                                {postStatus} - {postedOn}
                                            </span>
                                        </div>

                                        { /* Bottom */}
                                        <div className="overlay-bottom">
                                            <p className="m-0"><small>{postCity}, {postState}</small></p>
                                            <p><b>${price}</b></p>
                                        </div>

                                    </div>
                                    { /* Overlay - End */}

                                </div>
                            </a>

                        </div>
                    );
                })
            }


            <div className="col-sm-12 pt-5">
                <h2>What's happening in Metro Atlanta, GA</h2>
            </div> 
            <div className="col-sm-3 p-2">
                <h3>1,627</h3>
                <p>Homes for sale</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3>50</h3>
                <p>Open Homes</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3>3,709</h3>
                <p>Recently Sold</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3>159</h3>
                <p>Price reduced</p>
            </div>

        </section>
        );
}
