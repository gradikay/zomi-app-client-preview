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
import "../css/Home.css";
// Images 
import img1 from "../img/larissa/img1.jpg"
import img2 from "../img/larissa/img2.jpg"
import img3 from "../img/larissa/img3.jpg"
// -------------- Application Begins Bellow ------------ //

export default function Home() { 
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
            window.location.href = `/filter/${search === "Chercher" ? "all" : search.toLowerCase()}`;

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
        <main id="Home"> 
            <Header handleSearch={handleSearch} setSearch={setSearch} search={search} />
            <SectionA/>
            <SectionB/>
            <SectionC/>
            
        </main>
        );
}
// Header
function Header({ handleSearch, setSearch, search }) {
    return (
        <header id="Header" className="container-fluid row m-0" style={{ backgroundImage: `url(${img1})` }}>
            <div className="col-sm-9 mx-auto align-self-center text-center text-white">
                <h1 className="text-white">Let's find the best home for you</h1>
                <p>Search our inventory on thousands of homes, a click away.</p>

                { /* Search - Start */}
                <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />
                { /* Search - End */}

            </div>
        </header>
        );
}
// Search input
function Search({ handleSearch, setSearch, search }) {
    return (
        <div className="display-large nav-item pr-5">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group input-group-lg">

                    { /* Input - Start */}
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Address, School, City, Zip or Neighborhood"
                        name="search"
                        id="search"
                        value={search}
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
function SectionA() {
    return (
        <section id="SectionA" className="container-fluid row py-5 bg-white border-bottom m-0">
            <div className="col-sm-12 pb-5">
                <h2>New Listings in Metro Atlanta, GA</h2>
                <p><a href="#">View All New Listings</a></p>
            </div>
            <div className="col-sm-3 text-white p-2">
                <a href="#">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                </div>
                </a>
            </div>
            <div className="col-sm-3 text-white p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 text-white p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 text-white p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">NEW - 4 HOURS AGO</span>
                        </div>
                        <div className="overlay-bottom">
                            <p className="m-0"><small>Multi-Family Home</small></p>
                            <p><b>$3,550,000</b></p>
                        </div>
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
function SectionB() {
    return (
        <header id="SectionB" className="container-fluid row m-0" style={{ backgroundImage: `url(${img3})` }}>
            <div className="col-sm-6 mx-auto align-self-center text-center text-white">
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
            <div className="col-sm-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">HOME IMPORVEMENT</span>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <p class="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">BUY</span>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <p class="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">HOME IMPORVEMENT</span>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <p class="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
            <div className="col-sm-3 p-2">
                <div className="card shadow-sm">
                    <img className="card-img-top" src={img2} alt={`Home ${img1}`} />
                    <div className="card-img-overlay text-white">
                        <div className="overlay-top">
                            <span className="badge badge-primary rounded">SPONSORED CONTENT</span>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <p class="card-text">The Brothers Innovations</p> 
                    </div>
                </div>
            </div>
        </section>
        );
}
function SectionX({ posts, isLoading }) {
    return (
        <div className="Home-Featured bg-white shadow-sm mb-3">
            <section className="Home-Section featured d-sm-flex pl-5 pr-5 mx-auto flex-column">
                { /* HEADER */}
                <header className="w-100 pt-sm-3 pb-sm-3 text-center">
                    { /* Title */}
                    <h3 className="mb-0"><b>Produits Populaires</b></h3>
                </header>
                { /* SECTION ITEMS */}
                <section className="Shop-Section featured d-flex mx-auto flex-column w-100">
                    { /* Wait until data is retreive then display bellow */}
                    {!isLoading ?
                        /* SECTION */
                        <section className="mw-100 bg-white d-flex flex-wrap align-content-start">
                            {posts &&
                                /* Map data from our database */
                                posts.map((post, i) => (
                                    post.accountType === "produit" ?
                                        /* ARTICLE */
                                        <article className="product-card w-25 d-inline-block border" key={i} to={`/posts/${post.productId}`}>
                                            { /* PRODUCT CONTAINER */}
                                            <div className="">
                                                { /* PRODUCT IMAGE */}
                                                <div className="product-image-box w-100">
                                                    <Link to={`/product/${post.productId}`}>
                                                        <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image1} className="p-2" />
                                                    </Link>
                                                </div>
                                                { /* PRODUCT DESCRIPTION */}
                                                <div className="product-content w-100">
                                                    { /* PRODUCT PRICE */}
                                                    <h4 className="pl-2">
                                                        <b>{post.postCost.priceYours.toLocaleString()}<small>Fc</small> </b>
                                                        <span style={{ color: "#B71C1C" }}><del>{post.postCost.priceRetail.toLocaleString()}</del><small>Fc</small></span>
                                                    </h4>
                                                    { /* PRODUCT STORE NAME */}
                                                    { /* <h4 className="store-name pl-2"><Link to={`/department/${post.storeId}`}> {post.storeName} </Link></h4> */}
                                                    { /* PRODUCT NAME */}
                                                    <h3 className="pl-2">
                                                        <Link to={`/product/${post.productId}`}>{decodeURIComponent(post.productName)}</Link>
                                                    </h3>
                                                    { /* PRODUCT LOCATION AND RATINGS */}
                                                    <p className="p-2 bg-light">
                                                        <span className="badge p-2 bg-white border rounded-lg mr-3 text-uppercase">{post.storeLocation.storeProvince} </span>
                                                        <i className='far fa-star'></i>
                                                        <i className='far fa-star'></i>
                                                        <i className='far fa-star'></i>
                                                        <i className='far fa-star'></i>
                                                        <i className='far fa-star'></i>
                                                    </p>

                                                </div>
                                            </div>
                                        </article> : ""
                                ))
                            }
                        </section>
                        /* IF IT STILL LOADING DISPLAY BELLOW */
                        : "Loading ..."
                    }
                </section>
                { /* FOOTER */}
                <footer className="w-100 mt-3 pt-3 pb-3 text-center border bg-light ">
                    { /* Title */}
                    <Link to={`/department/produit`}>
                        <h3 className="mb-0 mouse-pointer" ><b>Plus de produits ...</b></h3>
                    </Link>
                </footer>
            </section>
        </div>
        );
}