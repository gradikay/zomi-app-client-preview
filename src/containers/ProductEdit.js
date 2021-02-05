// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// Amplify required
import { S3Image } from 'aws-amplify-react';
import { Auth } from "aws-amplify"; 
import { API } from "aws-amplify";
// Components
import LoaderButton from "../components/LoaderButton";
// CSS
import "../css/PostNew.css";
// -------------- Application Begins Bellow ------------ //

export default function ProductEdit() {
    let history = useHistory();
    //const { user } = props;
    //const { userHasAuthenticated } = useAppContext();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const storePhoneNumber = user["custom:storePhoneNumber"];
    const storeDescription = user["custom:storeDescription"];
    const storeDepartment = user["custom:storeDepartment"];
    const storeManager = user["custom:storeManager"];
    const storeEmail = user["custom:storeEmail"];
    const storeName = user["custom:storeName"];
    const storeWeb = user["custom:storeWeb"];
    const province = user["custom:province"];
    const address = user["custom:address"];
    const city = user["custom:city"];

    //const [message, setMessage] = useState("");
    const [post, setPost] = useState(null);
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    const [tag4, setTag4] = useState("");
    const [tag5, setTag5] = useState("");
    const [isNew, setIsNew] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [department, setDepartment] = useState("");
    const [productName, setProductName] = useState("");
    const [priceYours, setPriceYours] = useState(1500);
    const [priceRetail, setPriceRetail] = useState(1500);
    const [postDescription, setPostDescription] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // use effect
    useEffect(() => {
        let unmounted = false;
        //console.log("mounted in ProductEdit");
        function loadPost() {
            return API.get("posts", `/post/returnby/${id}`);
        }
        async function onLoad() {

            try { 
                if (!unmounted) {
                    let user = await Auth.currentAuthenticatedUser({ bypassCache: true });
                    let { attributes } = user;
                    const post = await loadPost();
                    // post.productName becomes productName
                    const { productName, department, productCategory, postDescription } = post;
                    const { priceYours, priceRetail, quantity, isNew } = post.postCost;
                    const tag1 = post.postTags[8];
                    const tag2 = post.postTags[9];
                    const tag3 = post.postTags[10];
                    const tag4 = post.postTags[11];
                    const tag5 = post.postTags[12];

                    // updating our state
                    setUser(attributes);
                    setPostDescription(decodeURIComponent(postDescription));
                    setProductName(decodeURIComponent(productName));
                    setPriceRetail(priceRetail);
                    setPriceYours(priceYours);
                    setProductCategory(productCategory);
                    setDepartment(department);
                    setQuantity(quantity);
                    setIsNew(isNew);
                    setTag1(tag1 === null ? "" : tag1)
                    setTag2(tag2 === null ? "" : tag2)
                    setTag3(tag3 === null ? "" : tag3)
                    setTag4(tag4 === null ? "" : tag4)
                    setTag5(tag5 === null ? "" : tag5)
                    setPost(post);
                }

            } catch (e) {
                if (!unmounted) {
                alert(e);
                }
            }
        }

        onLoad();
        return () => {
            unmounted = true; 
            //console.log("unmounted in ProductEdit");
        };
    }, [id]);

    // Validate Form
    function validateForm() {
        return (
            productName.length > 0 &&
            postDescription.length > 0
        );
    }

    function savePost(post) {
        return API.put("posts", `/post/update/${id}`, {
            body: post
        });
    }

    // Handle Submit
    async function handleSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {

            await savePost({
                'storePhoneNumber': (storePhoneNumber === null ? null : storePhoneNumber),
                'storeDescription': (storeDescription === null ? null : storeDescription),
                'storeDepartment': (storeDepartment === null ? null : storeDepartment),
                'storeManager': (storeManager === null ? null : storeManager),
                'productName': encodeURIComponent(productName.toLowerCase()),
                'storeEmail': (storeEmail === null ? null : storeEmail),
                'postDescription': encodeURIComponent(postDescription),
                'storeWeb': (storeWeb === null ? null : storeWeb),
                'tag1': (tag1 === "" ? null : tag1.toLowerCase()),
                'tag2': (tag2 === "" ? null : tag2.toLowerCase()),
                'tag3': (tag3 === "" ? null : tag3.toLowerCase()),
                'tag4': (tag4 === "" ? null : tag4.toLowerCase()),
                'tag5': (tag5 === "" ? null : tag5.toLowerCase()),
                'address': (address === null ? null : address),
                'province': decodeURIComponent(province),
                'productCategory': productCategory,
                'priceRetail': Number(priceRetail),
                'priceYours': Number(priceYours),
                'quantity': Number(quantity),
                'department': department,
                'isNew': isNew,
                'city': city
            });
            // Redirect
            history.push("/productuser");

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function deletePost() {
        return API.del("posts", `/post/delete/${id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Es-tu sur de vouloir supprimer cette publication?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deletePost();
            window.location.href = `/productuser`;
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="bg-white">
            <main className="ProductNew container">
                {post && (
                    <>
                        { /* HEADER */ }
                        <div className="row mx-auto justify-content-center ">
                            <div className="col-sm-12 bg-light border m-3 p-3">
                                <h3>Modifier votre produit</h3>
                                <hr />
                                { /* ALERTS */}
                                <section className="bg-white p-3 shadow-sm">
                                    { /* ALERTS 1 */}
                                    <div
                                        className={
                                            user["custom:address"] != null ?
                                                "d-block alert alert-success" :
                                                "d-block alert alert-danger"
                                        }
                                    >
                                        {
                                            user["custom:address"] != null ?
                                                <h3><strong>Super! </strong> L'adresse de votre boutique est configur&eacute;.</h3> :
                                                <h3><strong>Danger! </strong>L'adresse de votre boutique n'a pas &eacute;t&eacute; configur&eacute;e.</h3>
                                        }
                                    </div>
                                    { /* ALERTS 2 */}
                                    <div
                                        className={
                                            // if
                                            user["custom:province"] && user["custom:city"] === null ?
                                                "d-block alert alert-danger" :
                                                // else if
                                                user["custom:province"] && user["custom:city"] === "undefined" ?
                                                    "d-block alert alert-danger" :
                                                    // else
                                                    "d-block alert alert-success"
                                        }
                                    >
                                        {
                                            // if
                                            user["custom:province"] && user["custom:city"] === null ?
                                                <h3><strong>Danger! </strong>La province et la ville de votre magasin sont n&eacute;cessaires pour publier un produit, vous ne l'avez pas encore configur&eacute;.</h3> :
                                                // else if
                                                user["custom:province"] && user["custom:city"] === "undefined" ?
                                                    <h3><strong>Danger! </strong>La province et la ville de votre magasin sont n&eacute;cessaires pour publier un produit, vous ne l'avez pas encore configur&eacute;.</h3> :
                                                    // else
                                                    <h3><strong>Super! </strong>La province et la ville de votre magasin sont configur&eacute;.</h3>
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                        { /* IMAGES 1, 2, 3, 4, 5 */ }
                        <div className="row mx-auto justify-content-center ">
                            { /* IMAGE 1 */ }
                            <div className="col-sm image-container">
                                { /* ************* CARD */}
                                <div className="card">
                                    { /* Image upload 1 - Before Upload */}
                                        <span className={post.postImages[0].image1 == null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                                        <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image1} />
                                    { /* ************* BODY */}
                                    <div className="card-body">
                                        <div className="form-group">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* IMAGE 2 */}
                            <div className="col-sm image-container">
                                { /* CARD */}
                                <div className="card">
                                    { /* Image upload 2 - Before Upload */}
                                        <span className={post.postImages[0].image2 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                                        <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image2} />
                                    { /* ************* BODY */}
                                    <div className="card-body">
                                        <div className="form-group">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* IMAGE 3 */}
                            <div className="col-sm image-container">
                                { /* CARD */}
                                <div className="card">
                                    { /* Image upload 3 - Before Upload */}
                                    <span className={post.postImages[0].image3 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                                    <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image3} />
                                    { /* ************* BODY */}
                                    <div className="card-body">
                                        <div className="form-group">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* IMAGE 4 */}
                            <div className="col-sm image-container">
                                { /* CARD */}
                                <div className="card">
                                    { /* Image upload 4 - Before Upload */}
                                    <span className={post.postImages[0].image4 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                                    <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image4} />
                                    { /* ************* BODY */}
                                    <div className="card-body">
                                        <div className="form-group">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* IMAGE 5 */}
                            <div className="col-sm image-container">
                                { /* CARD */}
                                <div className="card">
                                    { /* Image upload 5 - Before Upload */}                         
                                    <span className={post.postImages[0].image5 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                                    <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image5} />
                                    { /* ************* BODY */}
                                    <div className="card-body">
                                        <div className="form-group">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        { /* DETAILS */}
                        <div className="row mx-auto justify-content-center ">
                            <div className="col-sm bg-light border mr-3 mt-3 p-3">
                                <form onSubmit={handleSubmit} id="formNew">
                                    { /* Store Name */}
                                    <div className="form-group">
                                        { /* LABEL */}
                                        <label htmlFor="storeName" className="color-red">Nom du business:</label>

                                        { /* INPUT */}
                                        {user["custom:storeName"] === "none" ?
                                            <div className="alert alert-danger">
                                                <strong>Attention!</strong> Entrez le "nom de votre magasin" pour publiez. <Link className="nav-link" to="/storeinformation"><i className='fas fa-cog pr-3'> </i>Param&eacute;tre</Link>
                                            </div> :
                                            <input
                                                type="text"
                                                disabled="disabled"
                                                value={decodeURIComponent(storeName)}
                                                className="form-control"
                                                id="storeName"
                                            />
                                        }
                                        { /* DETAIL */}
                                        <p>Le nom de votre entreprise / business ne peut pas &ecirc;tre modifi&eacute;. (requis)</p>
                                    </div>
                                    { /* Product Name */}
                                    <div className="form-group">
                                        <label htmlFor="productName" className="color-red">Nom du produit</label>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={productName}
                                            className="form-control"
                                            onChange={e => setProductName(e.target.value)}
                                            id="productName"
                                            placeholder="exemple. pomme bio, chaussure, lavage a sec, .."
                                            required="required"
                                        />
                                        { /* DETAIL */}
                                        <p>Entrez le nom du produit, le titre du service ou le nom de l'aliment. (requis)</p>
                                    </div>
                                    { /* Category */}
                                    <div className="form-group">
                                        <label htmlFor="productCategory" className="color-red">Cat&eacute;gorie</label>
                                        <select
                                            className="form-control"
                                            value={productCategory}
                                            onChange={e => setProductCategory(e.target.value)}
                                            id="productCategory"
                                            name="productCategory"
                                            required="required"
                                        >
                                            <option value="">S&eacute;lectionner votre D&eacute;partement</option>
                                            <option value="produit">Produit</option>
                                            <option value="service">Service</option>
                                            <option value="aliment">Aliment</option>
                                        </select>
                                        <p>Choisissez la cat&eacute;gorie "produit", "service" ou "aliment". (requis)</p>

                                    </div>
                                    { /* DEPARTMENT - PRODUCT - FOOD - SERVICES */}
                                    <div>
                                        {
                                            /* CATEGORY PRODUCT */
                                            productCategory === "produit" ?
                                                <div className="form-group">
                                                    <label htmlFor="product" className="color-red">Produit</label>
                                                    <select
                                                        className="form-control"
                                                        value={department}
                                                        onChange={e => setDepartment(e.target.value)}
                                                        id="storeDepartment"
                                                        name="storeDepartment"
                                                        required="required"
                                                    >
                                                        <Product />
                                                    </select>
                                                    <p>Choisissez la cat&eacute;gorie du produit. (requis)</p>
                                                </div> :
                                                /* CATEGORY FOOD */
                                                productCategory === "aliment" ?
                                                    <div className="form-group">
                                                        <label htmlFor="product" className="color-red">Aliment et boisson</label>
                                                        <select
                                                            className="form-control"
                                                            value={department}
                                                            onChange={e => setDepartment(e.target.value)}
                                                            id="storeDepartment"
                                                            name="storeDepartment"
                                                            required="required"
                                                        >
                                                            <Food />
                                                        </select>
                                                        <p>Choisissez la cat&eacute;gorie de l'aliment. (requis)</p>
                                                    </div> :
                                                    /* CATEGORY SERVICES */
                                                    productCategory === "service" ?
                                                        <div className="form-group">
                                                            <label htmlFor="product" className="color-red">Services</label>
                                                            <select
                                                                className="form-control"
                                                                value={department}
                                                                onChange={e => setDepartment(e.target.value)}
                                                                id="storeDepartment"
                                                                name="storeDepartment"
                                                                required="required"
                                                            >
                                                                <Services />
                                                            </select>
                                                            <p>Choisissez la cat&eacute;gorie du service. (requis)</p>
                                                        </div> :
                                                        <p></p>
                                        }

                                    </div>
                                    { /* Price - Yours & Retail */}
                                    <div className="input-group mb-3">
                                        {/* Price - Yours */}
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Votre prix</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="priceYours"
                                            value={priceYours}
                                            className="form-control"
                                            onChange={e => setPriceYours(e.target.value)}
                                            id="priceYours"
                                            placeholder="Entrez votre prix"
                                        />
                                        {/* Price - Retail */}
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Prix au d&eacute;tail</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="priceRetail"
                                            value={priceRetail}
                                            className="form-control"
                                            onChange={e => setPriceRetail(e.target.value)}
                                            id="priceRetail"
                                            placeholder="Entrez le prix au d&eacute;tail"
                                        />
                                    </div>
                                    { /* Quantity Available */}
                                    <div className="form-group">
                                        <label htmlFor="quantity" className="color-red">Quantit&eacute; disponible</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={quantity}
                                            className="form-control"
                                            onChange={e => setQuantity(e.target.value)}
                                            id="quantity"
                                            placeholder="Entrez quantit&eacute; disponible"
                                        />
                                        <p>Combien en vendez-vous? Si c'est un "service" entrez "1". (requis)</p>
                                    </div>
                                    { /* isNew - Condition */}
                                    <div className="form-group">
                                        <label htmlFor="storeDepartment" className="color-red">Condition</label>
                                        <select
                                            className="form-control"
                                            value={isNew}
                                            onChange={e => setIsNew(e.target.value)}
                                            id="isNew"
                                            name="isNew"
                                            required="required"
                                        >
                                            <option value="">S&eacute;lectionner la condition</option>
                                            <option value="new">Nouveau</option>
                                            <option value="used">Utilis&eacute;</option>
                                        </select>
                                        <p>Si c'est un "service" choisissez "Nouveau". (requis)</p>
                                    </div>
                                    { /* Description */}
                                    <div className="form-group">
                                        <label htmlFor="comment" className="color-red">Description du produit:</label>
                                        <textarea
                                            className="form-control"
                                            value={postDescription}
                                            onChange={e => setPostDescription(e.target.value)}
                                            rows="5"
                                            id="postDescription"
                                            name="postDescription"
                                            required="required"
                                            placeholder="Description du produit, inclure des &eacute;l&eacute;ments tels que la couleur, la taille, la dimension et d'autres"
                                        ></textarea>
                                    </div>
                                    { /* Tags - 1  */}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&eacute;tiquette</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="tag1"
                                            value={tag1}
                                            className="form-control"
                                            onChange={e => setTag1(e.target.value)}
                                            id="tag1"
                                            placeholder="un mot (e.g.: chemise)"
                                            required="required"
                                        />
                                    </div>
                                    { /* Tags - 2 */}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&eacute;tiquette </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="tag2"
                                            value={tag2}
                                            className="form-control"
                                            onChange={e => setTag2(e.target.value)}
                                            id="tag2"
                                            placeholder="un mot (e.g.: blanche)"
                                        />
                                    </div>
                                    { /* Tags - 3 */}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&eacute;tiquette </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="tag3"
                                            value={tag3}
                                            className="form-control"
                                            onChange={e => setTag3(e.target.value)}
                                            id="tag3"
                                            placeholder="un mot (e.g.: moyen)"
                                        />
                                    </div>
                                    { /* Tags - 4 */}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&eacute;tiquette </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="tag4"
                                            value={tag4}
                                            className="form-control"
                                            onChange={e => setTag4(e.target.value)}
                                            id="tag4"
                                            placeholder="un mot (e.g.: homme)"
                                        />
                                    </div>
                                    { /* Tags - 5 */}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&eacute;tiquette </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="tag5"
                                            value={tag5}
                                            className="form-control"
                                            onChange={e => setTag5(e.target.value)}
                                            id="tag5"
                                            placeholder="un mot (e.g.: femme)"
                                        />
                                    </div>
                                    { /* Submit Button */}
                                    <LoaderButton
                                        type="submit"
                                        className="btn btn-warning btn-delete-ml"
                                        isLoading={isLoading}
                                        disabled={!validateForm()}
                                    >
                                        Modifier
                                    </LoaderButton>
                                    {/* DELETE BUTTON */}
                                    <LoaderButton  
                                        className="btn btn-danger btn-delete-ml"
                                        onClick={handleDelete}
                                        isLoading={isDeleting}
                                    >
                                        Supprimer
                                    </LoaderButton>
                                </form>
                                </div>
                                { /**** PREVIEW ****/ }
                            <div className="col-sm bg-light border mt-3 p-3">
                                <article className="w-75 mx-auto shadow rounded bg-white" style={{ position: "sticky", top: "0" }}>
                                    { /* IMAGE */}
                                    <div className="w-100"> 
                                                <S3Image level="protected" identityId={post.userId} imgKey={post.postImages[0].image1} /> 
                                    </div>
                                    { /* USERNAME - PRODUCT NAME */}
                                    <div className="w-100 p-3 bg-white">
                                        { /* STORE NAME */}
                                        <h4>{user["custom:storeName"] === "none" ? "" : decodeURIComponent(user["custom:storeName"])}</h4>
                                        { /* PRODUCT NAME */}
                                        <h3>{decodeURIComponent(productName)}</h3>
                                        { /* PRODUCT PROVINCE */}
                                        <span className="badge badge-warning"> <i className='fas fa-map-marker pr-3'></i>{province}</span>
                                        <p>
                                            <i className='far fa-star'></i>
                                            <i className='far fa-star'></i>
                                            <i className='far fa-star'></i>
                                            <i className='far fa-star'></i>
                                            <i className='far fa-star'></i>
                                            <small> 0 critiques </small>
                                        </p>
                                        <h4>
                                            <span>{priceYours.toLocaleString()}<small className="align-text-bottom">F </small> </span>
                                            <span><small className="align-text-top" style={{ color: "#B71C1C" }}><del> {priceRetail.toLocaleString()}</del><small className="align-text-bottom">F </small></small></span>
                                        </h4>
                                        <p>
                                        </p>
                                    </div>
                                </article>
                            </div>
                            </div>
                    </>
                )}
            </main>
        </div>
    );
}

function Product() {

    return (
        <>
            <option value="">S&eacute;lectionner votre D&eacute;partement</option>
            <option value="accessoires">Accessoires</option>
            <option value="art">Art</option>
            <option value="auto">Auto et pi&egrave;ces</option>
            <option value="beauty">Beaut&eacute; et sant&eacute;</option>
            <option value="bijoux">Bijoux</option>
            <option value="chaussure">Chaussure</option>
            <option value="cuisine">Cuisine et salle &agrave; manger</option>
            <option value="decoration">D&eacute;coration</option>
            <option value="electronique">&Eacute;lectronique</option>
            <option value="habillement">Habillement</option>
            <option value="jouet">Jouet</option>
            <option value="livre">Livre et audio</option>
            <option value="meuble">Meuble</option>
            <option value="montre">Montre</option>
            <option value="sac">Sac</option>
            <option value="ordinateur">Ordinateur</option>
        </>
    );
}

function Food() {

    return (
        <>
            <option value="">S&eacute;lectionner votre D&eacute;partement</option>
            <option value="alimentation">Alimentation animale</option>
            <option value="animal">Animal</option>
            <option value="boisson">Boisson</option>
            <option value="boulangerie">Boulangerie</option>
            <option value="epices">&Eacute;pices</option>
            <option value="florale">Florale</option>
            <option value="fruit">Fruit</option>
            <option value="grains">Grains</option>
            <option value="legume">L&eacute;gumes</option>
            <option value="nourriture">Nourriture pr&eacute;par&eacute;e</option>
            <option value="laitier">Produits laitiers et oeufs</option>
            <option value="poisson">Poisson et autre</option>
            <option value="viande">Viande</option>
            <option value="volaille">Volaille</option>
        </>
    );
}

function Services() {

    return (
        <>
            <option value="">S&eacute;lectionner votre D&eacute;partement</option>
            <option value="avocat">Avocat</option>
            <option value="banques">Banques</option>
            <option value="bibliotheque">Biblioth&egrave;que</option>
            <option value="coiffure">Coiffure</option>
            <option value="construction">Constructions</option>
            <option value="consultation">Consultation</option>
            <option value="eglise">&Eacute;glise</option>
            <option value="electricien">&Eacute;lectricien</option>
            <option value="ecole">&Eacute;cole</option>
            <option value="hopital">Hopital</option>
            <option value="jardinier">Jardinier</option>
            <option value="lavage">Lavage a sec</option>
            <option value="logement">Logement</option>
            <option value="maison">Maisons</option>
            <option value="manucure">Manucure et p&eacute;dicure</option>
            <option value="mecanique">M&eacute;canique</option>
            <option value="photographie">Photographie</option>
            <option value="plomberie">Plomberie</option>
            <option value="securite">S&eacute;curit&eacute;</option>
            <option value="transport">Transport</option>
        </>
    );
}