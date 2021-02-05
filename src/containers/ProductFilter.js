// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Amplify required
import { S3Image } from 'aws-amplify-react';
import { API } from "aws-amplify";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib";
// CSS
import "../css/ProductFilter.css";
// Images 
import img1 from "../img/larissa/img1.jpg"
import img2 from "../img/larissa/img2.jpg"
import img3 from "../img/larissa/img3.jpg"
// -------------- Application Begins Bellow ------------ //

export default function ProductFilter() { 
    // Loading the search bar
    const [search, setSearch] = useState("Search");
    const { isAuthenticated } = useAppContext();
    // Loading posts
    const [posts, setPosts] = useState([{
        userId: "",
        productId: "",
        storeId: "",
        storeName: "",
        productName: "",
        postImages: [{
            image1: ""
        }],
        postCost: {
            priceYours: 1500,
            priceRetail: 1500
        },
        storeLocation: {
            storeProvince: ""
        },
        accountType: ""
    }]);
    const [postsService, setPostsService] = useState([{
        userId: "",
        productId: "",
        storeId: "",
        storeName: "",
        productName: "",
        postImages: [{
            image1: ""
        }],
        postCost: {
            priceYours: 1500,
            priceRetail: 1500
        },
        storeLocation: {
            storeProvince: ""
        },
        accountType: ""
    }]);
    //console.log(posts);
    const [isLoading, setIsLoading] = useState(true);

    // Handling submitted Data - Search Data
    async function handleSearch(event) {
        event.preventDefault();

        try {
            // if there is no data return "all" data
            window.location.href = `/department/${search === "Chercher" ? "all" : search.toLowerCase()}`;

        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        let unmounted = false;
        async function onLoad() {

            setIsLoading(false);
            try {
                const posts = await loadPosts();
                const postsService = await loadPostsService();
                // we are avoiding leaks by using if statement
                if (!unmounted) {
                    //const stored = await loadImage(); 
                    setPosts(posts);
                    setPostsService(postsService);
                }
            } catch (e) {
                alert(e);
                setIsLoading(true);
            }

        }

        onLoad();
        // unmounting our state
        return () => {
            unmounted = true;
            setPostsService([]);
            setPosts([]);
        };

    }, [isAuthenticated]);
    // Loading products from Dynamodb
    function loadPosts() {
        return API.get("posts", "/post/items8");
    }
    function loadPostsService() {
        return API.get("posts", "/post/public");
    }
    async function handleSubmit(event) {
        event.preventDefault();

        try {

            //props.history.push(`/department/${search === "" ? "all" : search.toLowerCase()}`); 
            window.location.href = `/department/${search === "Chercher" ? "all" : search.toLowerCase()}`;
            //window.location.reload();

        } catch (e) {
            alert(e);
        }
    } 
    return (
        <main id="ProductFilter"> 
            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} />
            <SectionA/>             
        </main>
        );
}
// Header
function Header({ handleSearch, setSearch, search }) {
    return (
        <header id="Header" className="container-fluid border-top border-bottom row m-0 bg-white">
            <nav class="navbar navbar-expand-md">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    Filter <span class="navbar-toggler-icon"></span>
                </button>
                 

                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <Search />
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown border rounded mr-3">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Price
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">$100k</a>
                                <a class="dropdown-item" href="#">$300k</a>
                                <a class="dropdown-item" href="#">$500k</a>
                                <a class="dropdown-item" href="#">$700k</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown border rounded mr-3">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Property Type
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Any</a>
                                <a class="dropdown-item" href="#">Single Family Home</a>
                                <a class="dropdown-item" href="#">Townhome</a>
                                <a class="dropdown-item" href="#">Condo</a>
                            </div>
                        </li> 
                        <li class="nav-item dropdown border rounded">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Listing Status
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Any</a>
                                <a class="dropdown-item" href="#">Existing Homes</a>
                                <a class="dropdown-item" href="#">New Construction</a>
                                <a class="dropdown-item" href="#">Foreclosures</a>
                            </div>
                        </li> 
                    </ul>
                </div>
            </nav>
        </header>
        );
}
// Search input
function Search({ handleSearch, setSearch, search }) {
    return (
        <div className="nav-item pr-5">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group">

                    { /* Input - Start */}
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        name="search"
                        id="search"
                        value={search}
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
function SectionA() {
    return (
        <section id="SectionA" className="container-fluid row py-5 bg-white border-bottom m-0">
            <div className="col-sm-12 pb-5">
                <h2>Atlanta, GA Real Estate & Houses for Sale</h2>
                <p>5,848 Homes</p>
            </div>
            <div className="col-sm-4  p-2">
                <a href="/view/999000">
                    <div className="card shadow-sm">
                        <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                        <div className="card-img-overlay text-white">
                            <div className="overlay-top">
                                <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                            </div>
                            <div className="overlay-bottom">
                                <p className="m-0"><small>Multi-Family Home</small></p>
                                <p><b>$3,550,000</b></p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">5 bed - 2.5 bath - 9,148 sqft lot</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-sm-4 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">5 bed - 2.5 bath - 9,148 sqft lot</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4  p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">5 bed - 2.5 bath - 9,148 sqft lot</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4  p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">5 bed - 2.5 bath - 9,148 sqft lot</p>
                    </div>
                </div>
            </div> 
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
