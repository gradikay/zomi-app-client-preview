// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Amplify required
import { S3Image } from 'aws-amplify-react';
import { API } from "aws-amplify";
// CSS
import "../css/PostView.css"
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostView() {

    // Important variables 
    const { id } = useParams();
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState([
        {
            property: "",
            postStatus: "",
            postType: "",
            postStyle: "",
            postPrice: "",
            postAcreage: "",
            numberOfBaths: "",
            numberOfBedrooms: "",
            postDescription: "",
            seller: {
                id: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
            },
            address: {
                streetAddress: "loading",
                streetAddressLine2: "",
                streetCity: "",
                streetState: "",
                streetZipcode: "",
                streetCountry: "",
            },
            images: {
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
            },
            updatedAt: null,
            createdAt: null
        }
    ]);

    // Handling search
    async function handleSearch(event) {

        event.preventDefault();

        try {
            // if there is no data return "all" data
            window.location.href = `/department/${search === "" ? "all" : search.toLowerCase()}`;

        } catch (e) {
            alert(e);
        }
    }

    // Retreiving data from database
    useEffect(() => {

        // Cleanup variable
        let unmounted = false;

        // Loading post from Dynamodb
        function loadPosts() {
            return API.get("posts", `/publicpost/${id}`);
        } 

        async function onLoad() {

            setIsLoading(true);

            try {

                const post = await loadPosts(); 
                 
                if (!unmounted) {
                     // Saving retreived data into post variable
                    setPost(post);
                }

                setIsLoading(false);

            } catch (e) {
                alert(e);
                setIsLoading(false);
            }

        }

        // Returning onLoad Function
        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
            setPost([]);
        };

    }, [id]); 


    // Return UI
    return (
        <main id="PostView" className="bg-white"> 

            { /* Header - Start */}
            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} /> 
            { /* Header - End */}

            {!isLoading && post ?
                <>
                    <Carousel post={post[0]} />
                    <SectionA post={post[0]} />          
                    <SectionB post={post[0]} />             
                    <SectionC post={post[0]} />     
                    <SectionD post={post[0]} /> 
                </>
                :
                <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
                    <span class="spinner-border" aria-label="spinner" role="img"></span>
                </div>
            }
            
        </main>
        );
}

// Header & Search field bloxk
function Header(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (
        <header id="Header" className="container-fluid row m-0 bg-dark">
            <nav className="navbar navbar-expand-md">

                { /* Button - Start */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    Filter <span className="fa fa-bars"></span>
                </button>
                { /* Button - End */}

                { /* Links & Search - Start */}
                <div className="collapse navbar-collapse" id="collapsibleNavbar">

                    { /* Previous Page - Start */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white mr-3" href="/"> <i className="fa fa-reply"></i> Back Home </a>
                        </li>
                    </ul>
                    { /* Previous Page - Start */}

                    { /* Search - Start */}
                    <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />
                    { /* Search - End */}

                    { /* Dropdowns - Start */}
                    <ul className="navbar-nav">

                        { /* Price Dropdown */}
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

                        { /* Property Type Dropdown */}
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

                        { /* Listing Status Dropdown */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">
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
                { /* Links & Search - End */}

            </nav>
        </header>
    );
}

// Search input field
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

// Carousel & More about this property column
function Carousel({ post }) {

    const { userId } = post;
    const { image1, image2, image3, image4, image5 } = post.images;

    // Return UI
    return (
        <section id="Carousel" className="container-fluid row py-5 border-bottom m-0 justify-content-center align-items-start">

            {/* Image Carousel - Start */}
            <div className="col-lg-8 p-0 mb-3"> 
                
                <div id="slider" className="carousel slide" data-ride="carousel">

                    {/* Indicators - Start */}
                    <ul className="carousel-indicators">
                        <li data-target="#slider" data-slide-to="0" className="active"></li>
                        <li data-target="#slider" data-slide-to="1"></li>
                        <li data-target="#slider" data-slide-to="2"></li>
                        <li data-target="#slider" data-slide-to="3"></li>
                        <li data-target="#slider" data-slide-to="4"></li>
                    </ul>
                    {/* Indicators - End */}
                     
                    {/* The slideshow - Start */} 
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <S3Image level="protected" identityId={userId} imgKey={image1} />
                        </div>
                        <div className="carousel-item">
                            <S3Image level="protected" identityId={userId} imgKey={image2} />
                        </div>
                        <div className="carousel-item">
                            <S3Image level="protected" identityId={userId} imgKey={image3} />
                        </div>
                        <div className="carousel-item">
                            <S3Image level="protected" identityId={userId} imgKey={image4} />
                        </div>
                        <div className="carousel-item">
                            <S3Image level="protected" identityId={userId} imgKey={image5} />
                        </div>
                    </div>
                    {/* The slideshow - End */}
                                 
                    {/* Left and right controls - Start */}
                    <a className="carousel-control-prev" href="#slider" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#slider" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                    {/* Left and right controls - End */}

                </div>
            </div>
            {/* Image Carousel - End */}

            {/* More about this property - Start */}
            <div className="col-lg-3 border bg-light text-center py-3">

                { /* Title */ }
                <p>More about this property</p>

                { /* Form - Start */ }
                <form>

                    { /* Full Name Field */ }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-user-circle"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Full Name"/>
                    </div> 

                    { /* Email Field */ }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-envelope-o"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Email"/>
                    </div>

                    { /* Phone Field */ }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-phone"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Phone"/>
                    </div>

                    { /* Comment Field */ }
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="2" id="comment"></textarea>
                    </div>

                    { /* Checkbox Field */ }
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="checkbox"/>
                            </div>
                        </div>
                        <input type="text" className="form-control" placeholder="Get pre-approved by a lender"/>
                    </div>

                    { /* Button */ }
                    <button type="button" className="btn btn-danger">Email Agent</button>

                    { /* Warning */ }
                    <p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>

                </form>
                { /* Form - End */ }
            </div> 
            {/* More about this property - End */}

        </section>
        );
}

// Other sections
function SectionA({ post }) {

    // Important variables
    const { streetAddress, streetAddressLine2, streetCity, streetCountry, streetState, streetZipcode } = post.address;
    const { numberOfBaths, numberOfBedrooms, postAcreage, postPrice } = post;
    const price = Number(postPrice).toLocaleString();

    // Return UI
    return (
        <section className="container row py-3 mb-3 mx-auto border-bottom">

            <div className="col-sm-6">
                <h1 className="text-capitalize"><small>{streetAddress} {streetAddressLine2}</small></h1>
                <p className="text-capitalize">{streetCity}, {streetState} {streetZipcode}, {streetCountry}</p>
            </div>

            <div className="col-sm-4">
                <h2>${price}</h2>
                <p className="text-capitalize">{numberOfBedrooms} beds - {numberOfBaths} baths - {postAcreage} acre lot</p>
            </div>

        </section>
        );
}

function SectionB({ post }) {

    // Important variables 
    const { numberOfBaths, numberOfBedrooms, postAcreage  } = post;
    const date = new Date(post.createdAt);
    const createdAt = date.toDateString();

    // Return UI
    return (
        <section className="container row py-1 mx-auto">
            <div className="col-sm-12 mb-3">  
                <h3>Home Details</h3>
                <div className="card">
                    <div className="card-header"><i class="fa fa-bath"></i> Interior Features</div>
                    <div className="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <h4>Interior Details</h4>
                                <p className="m-0">Number of Bathrooms: {numberOfBaths}</p>
                            </li>
                            <li class="list-group-item">
                                <h4>Beds & Baths</h4>
                                <p className="m-0">Number of Bedrooms: {numberOfBedrooms}</p>
                            </li>
                            <li class="list-group-item">
                                <h4>Dimensions and Layout</h4>
                                <p className="m-0">Living Area: {postAcreage}</p>
                            </li>
                            <li class="list-group-item">
                                <h4>Fireplace & Spa</h4>
                                <p className="m-0">No Fireplace</p>
                            </li>
                            <li class="list-group-item">
                                <h4>View</h4>
                                <p className="m-0">No View</p>
                            </li>
                        </ul>
                    </div> 
                </div>
            </div>

            <div className="col-sm-12 mb-3">  
                <h3>Exterior Features</h3>
                <div className="card">
                    <div className="card-header"><i class="fa fa-bath"></i> Interior Features</div>
                    <div className="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <h4>Parking & Garage</h4>
                                <p className="m-0">No Carport</p>
                                <p className="m-0">Parking Spaces: 1</p>
                            </li>
                            <li class="list-group-item">
                                <h4>Surface & Elevation</h4>
                                <p className="m-0">Number of Bedrooms: 4</p>
                            </li> 
                        </ul>
                    </div> 
                </div>
            </div>

            <div className="col-sm-12 mb-3">   
                <div className="card">
                    <div className="card-header"><i class="fa fa-calendar-check-o"></i> Posted on : {createdAt}</div>
                    <div className="card-body p-0"> 
                        <p className="p-3">Cumulative days on market: 3 days</p> 
                    </div> 
                </div>
            </div>
        </section>
        );
}

function SectionC({ post }) {

    const { postDescription } = post;

    return (
        <section className="container row mx-auto py-3 border-bottom">
            <section className="col-sm-12">
                <h3>Description</h3>
                <p>{ postDescription }</p>
            </section>
        </section>
        );
}

function SectionD({ post }) {

    const { firstName, lastName, phoneNumber } = post.seller;
    const { postId } = post;

    return (
        <section className="container-fluid bg-light row m-0 py-5 border-bottom">
            <div className="col-sm-6">
                 <p>Brokered by:</p>
                <p className="text-capitalize">{firstName} {lastName}</p>
                <p>contact: {phoneNumber}</p>
            </div>
            <div className="col-sm-6">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">Broker Location:
                        <span className="float-right">Atlanta, GA</span>
                    </li>
                    <li className="list-group-item bg-light">Data Source:
                        <span className="float-right">GeorgiaMLS</span>
                    </li>
                    <li className="list-group-item bg-light">Source's Property Id:
                        <span className="float-right">{ postId }</span>
                    </li>
                    <li className="list-group-item bg-light">Data Source Copy right:
                        <span className="float-right">2021 Fiberabbit MLS. All rights reserved.</span>
                    </li>
                </ul>
            </div>
        </section>
        );
}