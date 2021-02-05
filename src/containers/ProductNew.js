// This file is exported to ---> src/Routes.js
// React required
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// uuid for Unique Ids 
import uuid from "react-uuid";
// Amplify required
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import config from "../config";
// Components
import LoaderButton from "../components/LoaderButton";
// Libs
import { s3Upload } from "../libs/awsLib"; 
// CSS
import "../css/PostNew.css";
// -------------- Application Begins Bellow ------------ //

export default function ProductNew() {
    const [user, setUser] = useState({});
    const [city, setCity] = useState("");
    const [storeDescription, setStoreDescription] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [storeWeb, setStoreWeb] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeEmail, setStoreEmail] = useState("");
    const [storeManager, setStoreManager] = useState("");
    const [storeDepartment, setStoreDepartment] = useState("");
    const [storePhoneNumber, setStorePhoneNumber] = useState("");
    // use effect
    useEffect(() => {
        let unmounted = false;
        async function onLoad() {
            try {
                if (!unmounted) {
                    // bypassCache set to "true" will update the page with update cognito data
                    let user = await Auth.currentAuthenticatedUser({ bypassCache: true });
                    let { attributes } = user;
                    let city = decodeURIComponent(user.attributes['custom:city']);
                    let province = decodeURIComponent(user.attributes['custom:province']);
                    let address = decodeURIComponent(user.attributes['custom:address']);
                    let storeManager = decodeURIComponent(user.attributes['custom:storeManager']);
                    let storeDepartment = decodeURIComponent(user.attributes['custom:storeDepartment']);
                    let storeDescription = decodeURIComponent(user.attributes['custom:storeDescription']);
                    let storeName = decodeURIComponent(user.attributes['custom:storeName']);
                    let storeEmail = decodeURIComponent(user.attributes['custom:storeEmail']);
                    let storeWeb = decodeURIComponent(user.attributes['custom:storeWeb']);
                    let storePhoneNumber = decodeURIComponent(user.attributes['custom:storePhoneNumber']);

                    setUser(attributes);
                    setCity(city);
                    setAddress(address === "undefined" ? "" : address);
                    setProvince(province);
                    setStoreManager(storeManager === "undefined" ? "" : storeManager);
                    setStoreDepartment(storeDepartment === "undefined" ? "" : storeDepartment);
                    setStoreWeb(storeWeb === "undefined" ? "" : storeWeb);
                    setStoreDescription(storeDescription === "undefined" ? "" : storeDescription);
                    setStoreName(storeName === "none" ? "none" : storeName);
                    setStoreEmail(storeEmail === "undefined" ? "" : storeEmail);
                    setStorePhoneNumber(storePhoneNumber === "undefined" ? "" : storePhoneNumber);
                }

            }
            catch (e) {
                if (e !== 'No current user') {
                    alert(e); 
                }
            }
            //setIsAuthenticating(false);

        }
        onLoad();
        return () => {
            unmounted = true; 
            //console.log("unmounted in ProductNew");
        };
    }, []);
    // holds image from input
    const file = useRef(null);
    const file2 = useRef(null);
    const file3 = useRef(null);
    const file4 = useRef(null);
    const file5 = useRef(null);
    // display the image
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    // display image name
    const [imageName, setImageName] = useState("");
    const [imageName2, setImageName2] = useState("");
    const [imageName3, setImageName3] = useState("");
    const [imageName4, setImageName4] = useState("");
    const [imageName5, setImageName5] = useState("");
    // other constant 
    const storeId = user["custom:storeId"]; 
    const [quantity, setQuantity] = useState(0);
    const [priceYours, setPriceYours] = useState(1500);
    const [priceRetail, setPriceRetail] = useState(1500);
    const [postDescription, setPostDescription] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [department, setDepartment] = useState(""); 
    const [isNew, setIsNew] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    const [tag4, setTag4] = useState("");
    const [tag5, setTag5] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            productName.length > 0 &&
            postDescription.length > 0
        );
    }

    function handleImage1(event) {
        // Getting the current file
        file.current = event.target.files[0];
        // Setting up file to be seen image
        setImage(URL.createObjectURL(file.current));
        // Setting up file to be seen image name
        setImageName(file.current);
    }
    function handleImage2(event) {
        // Getting the current file 
        file2.current = event.target.files[0];
        // Setting up file to be seen image 
        setImage2(file2.current != null ? URL.createObjectURL(file2.current) : null);
        // Setting up file to be seen image name 
        setImageName2(file2.current);
    }
    function handleImage3(event) {
        // Getting the current file 
        file3.current = event.target.files[0];
        // Setting up file to be seen image 
        setImage3(file3.current != null ? URL.createObjectURL(file3.current) : null);
        // Setting up file to be seen image name 
        setImageName3(file3.current);
    }
    function handleImage4(event) {
        // Getting the current file 
        file4.current = event.target.files[0];
        // Setting up file to be seen image 
        setImage4(file4.current != null ? URL.createObjectURL(file4.current) : null);
        // Setting up file to be seen image name 
        setImageName4(file4.current);
    }
    function handleImage5(event) {
        // Getting the current file 
        file5.current = event.target.files[0];
        // Setting up file to be seen image 
        setImage5(file5.current != null ? URL.createObjectURL(file5.current) : null);
        // Setting up file to be seen image name 
        setImageName5(file5.current);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Veuillez selectionner un fichier plus petit que ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 1`
            );
            return;
        }
        if (file2.current && file2.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Veuillez selectionner un fichier plus petit que ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 2`
            );
            return;
        }
        if (file3.current && file3.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Veuillez selectionner un fichier plus petit que ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 3`
            );
            return;
        }
        if (file4.current && file4.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Veuillez selectionner un fichier plus petit que ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 4`
            );
            return;
        }
        if (file5.current && file5.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Veuillez selectionner un fichier plus petit que ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 5`
            );
            return;
        }

        setIsLoading(true);

        try {
            const image1 = file.current
                ? await s3Upload(file.current)
                : null;
            const image2 = file.current
                ? await s3Upload(file2.current)
                : null;
            const image3 = file.current
                ? await s3Upload(file3.current)
                : null;
            const image4 = file.current
                ? await s3Upload(file4.current)
                : null;
            const image5 = file.current
                ? await s3Upload(file5.current)
                : null;

            await createPost({
                productId: uuid(),
                priceRetail: Number(priceRetail),
                priceYours: Number(priceYours),
                quantity: Number(quantity),
                'postDescription': encodeURIComponent(postDescription),
                productName: productName.toLowerCase(),
                storePhoneNumber: (storePhoneNumber == null ? null : storePhoneNumber),
                storeDescription: (storeDescription == null ? null : storeDescription),
                storeDepartment: (storeDepartment == null ? null : storeDepartment),
                storeManager: (storeManager == null ? null : storeManager),
                productCategory,
                department,
                storeEmail: (storeEmail == null ? null : storeEmail),
                storeName,
                storeWeb: (storeWeb == null ? null : storeWeb),
                province,
                address: (address == null ? null : address),
                storeId,
                image1,
                image2,
                image3,
                image4,
                image5,
                isNew,
                city,
                'tag1': (tag1 === "" ? null : tag1.toLowerCase()),
                'tag2': (tag2 === "" ? null : tag2.toLowerCase()),
                'tag3': (tag3 === "" ? null : tag3.toLowerCase()),
                'tag4': (tag4 === "" ? null : tag4.toLowerCase()),
                'tag5': (tag5 === "" ? null : tag5.toLowerCase())
            });

            //props.history.push(`/account/products/?status=${message}`);
            window.location.href = `/productuser`;

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createPost(post) {
        return API.post("posts", "/post/create", {
            body: post
        });
    }

    return (
        <div className="bg-white">
        <main className="ProductNew container">
            { /* HEADER */ }
            <div className="row mx-auto justify-content-center ">
                <div className="col-sm-12 bg-light border m-3 p-3">
                    <h3>Ajouter un produit</h3>
                    <hr />
                    { /* HEADER - WARNINGS */}
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
                    { /* CARD */}
                    <div className="card">
                        { /* Image upload 1 - Before Upload */}
                        <span className={image === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                        { /* Image upload 1 */}
                        <img title={image === null ? null : imageName.name} src={image === null ? null : image} alt={image === null ? null : imageName.name} className="align-self-center  " />
                        <div className="card-body">
                            <div className="form-group">
                                <p><label htmlFor="file" className="color-red">Image d'affichage</label></p>
                                { /* Input Field */}
                                <input required="required" form="formNew" accept=".png, .jpg, .jpeg" type="file" id="file" name="file" onChange={handleImage1} />
                            </div>
                        </div>
                    </div>
                </div>
                { /* IMAGE 2 */}
                <div className="col-sm image-container">
                    { /* CARD */}
                    <div className="card">
                        { /* Image upload 2 - Before Upload */}
                        <span className={image2 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                        { /* Image upload 2 */}
                        <img title={image2 === null ? null : imageName2.name} src={image2 === null ? null : image2} alt={image2 === null ? null : imageName2.name} className="align-self-center  " />
                        <div className="card-body">
                            <div className="form-group">
                                <p><label htmlFor="file2" className="color-red">Image 2</label></p>
                                <input required="required" form="formNew" accept=".png, .jpg, .jpeg" type="file" id="file2" name="file2" onChange={handleImage2} />
                            </div>
                        </div>
                    </div>
                </div>
                { /* IMAGE 3 */}
                <div className="col-sm image-container">
                    { /* CARD */}
                    <div className="card">
                        { /* Image upload 3 - Before Upload */}
                        <span className={image3 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                        { /* Image upload 3 */}
                        <img title={image3 === null ? null : imageName3.name} src={image3 === null ? null : image3} alt={image3 === null ? null : imageName3.name} className="align-self-center  " />
                        <div className="card-body">
                            <div className="form-group">
                                <p><label htmlFor="file3" className="color-red">Image 3</label></p>
                                <input required="required" form="formNew" accept=".png, .jpg, .jpeg" type="file" id="file3" name="file3" onChange={handleImage3} />
                            </div>
                        </div>
                    </div>
                </div>
                { /* IMAGE 4 */}
                <div className="col-sm image-container">
                    { /* CARD */}
                    <div className="card">
                        { /* Image upload 4 - Before Upload */}
                        <span className={image4 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                        { /* Image upload 4 */}
                        <img title={image4 === null ? null : imageName4.name} src={image4 === null ? null : image4} alt={image4 === null ? null : imageName4.name} className="align-self-center  " />
                        <div className="card-body">
                            <div className="form-group">
                                <p><label htmlFor="file4" className="color-red">Image 4</label></p>
                                <input required="required" form="formNew" accept=".png, .jpg, .jpeg" type="file" id="file4" name="file4" onChange={handleImage4} />
                            </div>
                        </div>
                    </div>
                </div>
                { /* IMAGE 5 */}
                <div className="col-sm image-container">
                    { /* CARD */}
                    <div className="card">
                        { /* Image upload 5 - Before Upload */}
                        <span className={image5 === null ? "d-flex" : "d-none"}><i className='far fa-image'></i></span>
                        { /* Image upload 5 */}
                        <img title={image5 === null ? null : imageName5.name} src={image5 === null ? null : image5} alt={image5 === null ? null : imageName5.name} className="align-self-center  " />
                        <div className="card-body">
                            <div className="form-group">
                                <p><label htmlFor="file5" className="color-red">Image 5</label></p>
                                <input required="required" form="formNew" accept=".png, .jpg, .jpeg" type="file" id="file5" name="file5" onChange={handleImage5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            { /* DETAILS */}
            <div className="row mx-auto justify-content-center ">
                { /* DETAILS - RIGHT */}
                <div className="col-sm bg-light border mr-3 mt-3 p-3">
                    <form onSubmit={handleSubmit} id="formNew">
                        { /* Store Name */}
                        <div className="form-group">
                            { /* LABEL */ }
                                <label htmlFor="storeName" className="color-red">Nom du business:</label>

                            { /* INPUT */ }
                            {storeName === "none" ?
                                <div className="alert alert-danger">
                                        <strong>Attention!</strong> Entrez le "nom de votre magasin" pour publiez. <Link className="nav-link" to="/storeinformation"><i className='fas fa-cog pr-3'> </i>Param&eacute;tre</Link>
                                </div> :
                                <input
                                    type="text"
                                    disabled="disabled"
                                    value={storeName}
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
                                placeholder="un mot (e.g.: bio)"
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
                                    placeholder="un mot (e.g.: billet)"
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
                        {
                                storeName === "none" ?
                                <div className="alert alert-danger">
                                        <strong>Attention!</strong> Entrez le "nom de votre magasin" pour publiez. <Link className="nav-link" to="/storeinformation"><i className='fas fa-cog pr-3'> </i>Param&eacute;tre</Link>
                                </div> :
                                <LoaderButton
                                    type="submit"
                                    className="btn-primary"
                                    isLoading={isLoading}
                                    disabled={!validateForm()}
                                >
                                    Publier
                               </LoaderButton>
                        }
                    </form>
                </div>
                { /* DETAILS - LEFT */}
                <div className="col-sm bg-light border mt-3 p-3">
                    <article className="w-75 mx-auto shadow rounded bg-white" style={{ position: "sticky", top: "0" }}>
                        { /* IMAGE */}
                        <div className="w-100 text-center">
                            <Link to="/product">
                                <img title={image === null ? null : imageName.name} src={image === null ? null : image} alt={image === null ? null : imageName.name} />
                            </Link>
                        </div>
                        { /* USERNAME - PRODUCT NAME */}
                        <div className="w-100 p-3 bg-white">
                                <h4>{storeName === "none" ? "" : decodeURIComponent(storeName)}</h4>
                            <h3>{productName}</h3>
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
            <option value="sac">Sacs</option>
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