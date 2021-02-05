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
        <main id="ProductFilter" className="bg-white"> 
            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} />
            <SectionA/>             
            <SectionB/>             
            <SectionC/>             
            <SectionD/>             
            <SectionE/>             
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
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#"> <i class="fa fa-reply"></i> Back</a>
                        </li>
                    </ul>
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
        <div className="nav-item border-left border-right px-3 mr-3">

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
        <section id="SectionA" className="container mx-auto row py-5 border-bottom">
            <div className="col-sm-8 p-0"> 
                <img src={img2} alt={`Home ${img1}`} />                    
            </div>
            <div className="col-sm-4 p-0 border bg-light text-center p-3">
                <p>More about this property</p>
                <form>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-user-circle"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Full Name"/>
                    </div> 
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-envelope-o"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Email"/>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-phone"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Phone"/>
                    </div>
                    <div class="form-group">
                        <label for="comment">Comment:</label>
                        <textarea class="form-control" rows="5" id="comment"></textarea>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox"/>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Get pre-approved by a lender"/>
                    </div>
                    <button type="button" class="btn btn-danger">Email Agent</button>
                    <p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>

                </form>
            </div> 
        </section>
        );
}
function SectionB() {
    return (
        <section className="container row py-5 mx-auto border-bottom">
            <div className="col-sm-12">
                <h1>$364,499</h1>
                <p>3 bed - 2 bath - 1,582 sqft - 0.24 acre lot</p>
                <h2>1870 Sylvan Ridge Dr SW, Atlanta, GA, 30310</h2>
            </div>
        </section>
        );
}
function SectionC() {
    return (
        <section className="container row py-5 mx-auto border-bottom">
            <div className="col-sm-4 border-right">
                <p>Property Type <span className="float-right"> Single Family Home</span></p> 
                <p>Price per sqft <span className="float-right"> $240</span></p> 
            </div>
            <div className="col-sm-4 border-right">
                <p>Days on Realtor.com <span className="float-right"> 3 hours</span></p>
                <p>Style <span className="float-right"> Ranch</span></p> 
            </div>
            <div className="col-sm-4">
                <p>Year Built <span className="float-right"> 1950</span></p>
                <p>Status <span className="float-right"> For Sale</span></p> 
            </div>
        </section>
        );
}
function SectionD() {
    return (
        <section className="container row mx-auto py-5 border-bottom">
            <section className="col-sm-12">
                <div id="accordion">

                    <div class="card mb-2">
                        <div class="card-header bg-white py-4">
                            <a class="card-link text-dark" data-toggle="collapse" href="#collapseOne">
                                <h3>Open Houses <i class="fa fa-caret-down"></i></h3>
                            </a>
                        </div>
                        <div id="collapseOne" class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="card-header bg-white py-4">
                            <a class="card-link text-dark" data-toggle="collapse" href="#collapseOne">
                                <h3>Property Details <i class="fa fa-caret-down"></i></h3>
                            </a>
                        </div>
                        <div id="collapseOne" class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header bg-white py-4">
                            <a class="card-link text-dark" data-toggle="collapse" href="#collapseOne">
                                <h3>Property History <i class="fa fa-caret-down"></i></h3>
                            </a>
                        </div>
                        <div id="collapseOne" class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div> 

                </div>
            </section>
        </section>
        );
}
function SectionE() {
    return (
        <section className="container-fluid bg-light row m-0 py-5 border-bottom">
            <div className="col-sm-6">
                <p>Presented by:</p>
                <p>Gradi Kayamba</p>
                <br/>
                <p>Brokered by:</p>
                <p>Kayamba Realty</p>
                <p>(000) 000-000-0000</p>
            </div>
            <div className="col-sm-6">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-light">Broker Location:
                        <span className="float-right">Atlanta, GA</span>
                    </li>
                    <li class="list-group-item bg-light">Data Source:
                        <span className="float-right">GeorgiaMLS</span>
                    </li>
                    <li class="list-group-item bg-light">Source's Property Id:
                        <span className="float-right">5678909876</span>
                    </li>
                    <li class="list-group-item bg-light">Data Source Copy right:
                        <span className="float-right">2021 Fiberabbit MLS. All rights reserved.</span>
                    </li>
                </ul>
            </div>
        </section>
        );
}