// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Amplify required
import { API } from "aws-amplify";
import { S3Image } from 'aws-amplify-react'; 
import { useAppContext } from "../libs/contextLib";
// CSS
import "../css/UserPosts.css";
// -------------- Application Begins Bellow ------------ //

export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // set variable for clean up
        let unmounted = false;
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            // wait for our loadPosts to retrieve data
            try {
                const posts = await loadPosts();
                if (!unmounted) {
                //const stored = await loadImage();
                setPosts(posts); 
                }
            } catch (e) {
                alert(e);
            }
            setIsLoading(false);
        }

        onLoad();
        return () => {
            unmounted = true;
            setPosts([]);
            //console.log("cleaned product user");
        };
    }, [isAuthenticated]);

    // Loading products from Dynamodb
    function loadPosts() {
        return API.get("posts", "/post/returnall");
    }

    function renderPostsList(posts) {

        return [{}].concat(posts).map((post, i) =>
            i !== 0 ? ( 
                <article className="col-sm-4 border p-3" key={post.productId}>
                    { /* Key={i + a} sets a unique key for each image */ }
                    <div className="media">
                        { /* Post Image */ }
                        <Link to={`/posts/${post.productId}`}>
                            <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image1} className="align-self-center mr-3" />
                        </Link>
                        { /* Post Content */ }
                        <div className="media-body">
                            { /* Post Name */ }
                            <h3>
                                <Link to={`/product/${post.productId}`}> {decodeURIComponent(post.productName)} </Link>
                            </h3>
                            { /* Post Store Name */ }
                            <p>{post.storeName}</p>
                            { /* Post Ratings */ }
                            <p>
                                <i className='far fa-star'></i>
                                <i className='far fa-star'></i>
                                <i className='far fa-star'></i>
                                <i className='far fa-star'></i>
                                <i className='far fa-star'></i>
                                <small> 0 critiques </small>
                            </p>
                            { /* Post Price */ }
                            <h3>
                                <b>{post.postCost.priceYours.toLocaleString()}<small className="align-text-bottom">F</small> </b>
                                <small className="align-text-top" style={{ color: "#B71C1C" }}><del>{post.postCost.priceRetail.toLocaleString()}</del><small className="align-text-bottom">F</small></small>
                                <br/> <span className="badge badge-warning">{post.storeLocation.storeProvince}</span>
                            </h3>
                            { /* Post Edit Button */ }
                            <Link to={`productedit/${post.productId}`} className="btn btn-warning w-100">
                                <i className='far fa-edit pr-3'></i> Modifier
                            </Link>
                        </div>
                    </div>
                </article>
            ) : (
                <span key={i}></span> 
                )
        );
    }

    function renderLander() {
        return (
            <section className="UserPosts-disconnect d-flex align-items-center justify-content-center vh-100-minus-nav w-50 mx-auto flex-column">
                <header className="p-2 text-center w-100">
                    <h1>Bozindo</h1>
                    <p>Vous devez &ecirc;tre connect&eacute; pour acc&eacute;der &agrave; votre boutique.</p>
                </header>
                <nav className="btn-group w-100">
                    <Link to="/login" className="btn btn-info" role="button">
                        Se Connecter &emsp;
                        <span role="img" aria-label="key">&#x1F511;</span>
                    </Link>
                    <Link to="/register" className="btn border" role="button">
                        S'Inscrire &emsp;
                        <span role="img" aria-label="lock">&#x1F512;</span>
                    </Link>
                </nav>
            </section>
        );
    }

    function renderPosts() {
        return (
            <>
                <section className="userposts bg-white">
                    <div className="row mx-auto justify-content-center ">
                        <header className="col-sm-12 bg-light border m-3 p-3">
                            <h3>Vos Produits</h3>
                            <h3><Link to="/productnew"><span className="badge badge-warning p-3"><i className='fas fa-plus pr-3'></i> Publier un nouveau produit</span> </Link></h3>
                        </header>  
                        <>
                            {!isLoading && renderPostsList(posts)}
                        </> 
                    </div>
                </section>
                <footer>
                </footer>
            </>
        );
    }

    return (
        <>
            {isAuthenticated ? renderPosts() : renderLander()}
        </>
    );
}