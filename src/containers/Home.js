// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
// Amplify required
import { S3Image } from 'aws-amplify-react';
import { API } from "aws-amplify";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib"; 
// Dummy Images 
import img1 from "../img/imgmain.jpg"
import img2 from "../img/imgcc.jpg"
import img3 from "../img/imgbb.jpg"
// CSS
import "../css/Home.css"
// Dummy data
import { data as dummyPosts} from "../DummyData/data"
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function Home() { 

    // Important variables
    const [search, setSearch] = useState("");
    const { isAuthenticated } = useAppContext();
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

            try {

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

        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true;
            setPosts([]);
        };

    }, [isAuthenticated]); 

    // Function getting data from database
    function loadPosts() {
        return API.get("posts", "/publicposts");
    } 

    // Return UI
    return (
        <main id="Home" className="border-bottom"> 

            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} />

            <SectionA posts={posts} isLoading={isLoading} />

            <SectionB />

            <SectionC/>
            
        </main>
        );
}

// Header & Search field block
function Header(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (

        <header  id="Header" className="container-fluid row m-0" style={{ backgroundImage: `url(${img1})` }} >

            <div className="col-sm-9 mx-auto align-self-center text-center text-white">

                <h1 className="text-white"> Let's find the best home for you </h1>

                <p> Search our inventory on thousands of homes, a click away. </p>

                { /* Search field block - Start */}
                <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />
                { /* Search field block - End */}

            </div>

        </header>
        );
}

// Search field
function Search(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (
        <div className="display-large nav-item pr-5">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group input-group-lg">

                    { /* Input - Start */}
                    <input
                        id="search"
                        type="search"
                        name="search"
                        value={search}
                        placeholder="search"
                        className="form-control"
                        onChange={e => setSearch(e.target.value)}
                    />
                    { /* Input - End */}

                    { /* Button - Start */}
                    <div className="input-group-append">

                        <button className="btn btn-danger" type="submit">
                            Search <i className='fa fa-search' role="img" aria-label="search"></i>
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
function SectionA({ posts, isLoading }) {

    // Return UI
    return (
        <section id="SectionA" className="container-fluid row py-5 bg-white border-bottom m-0">

            {/* Heading - Start */}
            <div className="col-sm-12 pb-5">
                <h2>New Listings in Metro Atlanta, GA</h2>
                <p><a href="#">View All New Listings</a></p>
            </div>
            {/* Heading - End */}

            {/* Posts - Start */}
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
                        <div className="col-sm-6 col-md-4 col-lg-3 text-white p-2" key={i++}>

                            <a href={`/view/${postId}`} className="text-white link-card">
                                <div className="card shadow-sm">

                                    { /* Image */ }
                                    <S3Image level="protected" identityId={userId} imgKey={image1} />

                                    { /* Overlay - Start */ }
                                    <div className="card-img-overlay">

                                        { /* Top */ }
                                        <div className="overlay-top">
                                            <span className="badge badge-primary rounded">
                                                {postStatus} - {postedOn}
                                            </span>
                                        </div>

                                        { /* Bottom */ }
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
            {/* Posts - End */}

            {/* Heading - Start */}
            <div className="col-sm-12 py-5">
                <h2>Pending Listings in Metro Atlanta, GA</h2>
                <p><a href="#">View All New Listings</a></p>
            </div>
            {/* Heading - End */}

            {/* Dummy Posts - Start */}
            {
                dummyPosts.map((post, i) => {


                    // Important variables
                    const { imageA } = post.images;
                    const { postState } = post.address;
                    const { postId, userId, postStatus } = post;
                    const convertDate = new Date(post.createdAt);
                    const postedOn = convertDate.toDateString();
                    const price = Number(post.postPrice).toLocaleString();


                    // Return UI
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3 text-white p-2" key={i++}>

                            <a href={`/view/${postId}`} className="text-white link-card">
                                <div className="card border-0 shadow-sm">

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
                                            <p className="m-0"><small>{postState}</small></p>
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
            {/* Dummy Posts - End */}
             
            <div className="col-sm-12 pt-5">
                <h2>What's happening in Metro Atlanta, GA</h2>
            </div> 
            <div className="col-sm-3 p-2">
                <h3 className="m-0">1,627</h3>
                <p>Homes for sale</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3 className="m-0">50</h3>
                <p>Open Homes</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3 className="m-0">3,709</h3>
                <p>Recently Sold</p>
            </div> 
            <div className="col-sm-3 p-2">
                <h3 className="m-0">159</h3>
                <p>Price reduced</p>
            </div>

        </section>
        );
}

function SectionB() {
    return (
        <header id="SectionB" className="container-fluid row m-0 vh-100" style={{ backgroundImage: `url(${img3})` }}>
            <div className="col-sm-12 col-md-9 col-lg-6 mx-auto align-self-center text-center text-white">
                <h2 className="border-bottom pb-3">Trends</h2>
                <h3 className="pb-3">Looking for the cheapest place to rent? Here are some properites for you. </h3> 
                <button type="button" className="btn btn-outline-light">Read More</button>
            </div>
        </header>
    );
}

function SectionC() {
    return (
        <section className="container-fluid row mx-auto py-5">
            <div className="col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">HOME IMPORVEMENT</span>
                        </div>
                    </div>
                    <div className="card-body"> 
                        <p className="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">BUY</span>
                        </div>
                    </div>
                    <div className="card-body"> 
                        <p className="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">HOME IMPORVEMENT</span>
                        </div>
                    </div>
                    <div className="card-body"> 
                        <p className="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">SPONSORED CONTENT</span>
                        </div>
                    </div>
                    <div className="card-body"> 
                        <p className="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
        </section>
        );
}