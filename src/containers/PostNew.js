// This file is exported to ---> src/Routes.js
// React required
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// uuid for Unique Ids 
import uuid from "react-uuid";
// Amplify required 
import { API } from "aws-amplify";
import config from "../config";
// Components 
import LoaderButton from "../components/LoaderButton";
// Libs
import { s3Upload } from "../libs/awsLib"; 
import { useFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostNew() {

    // Important variables
    const { userFirstName, userLastName } = useAppContext();
    const [fields, handleFieldChange] = useFields({
        // Post Description
        postStatus: "status",
        postType: "",
        postStyle: "",
        postPrice: 1000,
        postAcreage: 1,
        numberOfBaths: 1,
        numberOfBedrooms: 1,
        postDescription: "",
        // Seller Information
        sellerFirstName: "",
        sellerLastName: "",
        sellerPhoneNumber: 9090008888,
        // Post Location
        streetAddress: "",
        streetAddressLine2: "",
        streetCity: "",
        streetState: "",
        streetCountry: "",
        streetZipcode: "",
    });

    // display the image
    const [image1, setImage1] = useState(null); 
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    // holds image from input
    const file1 = useRef(null);
    const file2 = useRef(null);
    const file3 = useRef(null);
    const file4 = useRef(null);
    const file5 = useRef(null);     

    // Validation and Loading 
    const [isLoading, setIsLoading] = useState(false);
    function validateForm() {
        return (
            fields.postPrice > 0 &&
            fields.postDescription.length > 0
        );
    }

    // Handling Uploaded Images
    function handleImage1(event) {
        // Getting the current file
        file1.current = event.target.files[0];
        // Setting up file to be seen image1
        setImage1(URL.createObjectURL(file1.current)); 
    }
    function handleImage2(event) {
        // Getting the current file 
        file2.current = event.target.files[0];
        // Setting up file to be seen image2 
        setImage2(file2.current != null ? URL.createObjectURL(file2.current) : null);
    }
    function handleImage3(event) {
        // Getting the current file 
        file3.current = event.target.files[0];
        // Setting up file to be seen image3
        setImage3(file3.current != null ? URL.createObjectURL(file3.current) : null);
    }
    function handleImage4(event) {
        // Getting the current file 
        file4.current = event.target.files[0];
        // Setting up file to be seen image4 
        setImage4(file4.current != null ? URL.createObjectURL(file4.current) : null);
    }
    function handleImage5(event) {
        // Getting the current file 
        file5.current = event.target.files[0];
        // Setting up file to be seen image5 
        setImage5(file5.current != null ? URL.createObjectURL(file5.current) : null);
    }

    // Handling Submitted Form
    async function handleSubmit(event) {
        event.preventDefault();

        // Checking the file's size
        if (file1.current && file1.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 1`
            );
            return;
        }
        if (file2.current && file2.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 2`
            );
            return;
        }
        if (file3.current && file3.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 3`
            );
            return;
        }
        if (file4.current && file4.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 4`
            );
            return;
        }
        if (file5.current && file5.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB. Image 5`
            );
            return;
        }

        setIsLoading(true);

        try {
            const image1 = file1.current
                ? await s3Upload(file1.current)
                : null;
            const image2 = file2.current
                ? await s3Upload(file2.current)
                : null;
            const image3 = file3.current
                ? await s3Upload(file3.current)
                : null;
            const image4 = file4.current
                ? await s3Upload(file4.current)
                : null;
            const image5 = file5.current
                ? await s3Upload(file5.current)
                : null;

            // Note: making your data lowercase will help with your perform search 
            // on your dynamodb table -- use .toLowerCase()
            // Dynamodb is case sensitive. Example: a user searching for "Home" in the search bar
            // will only get results for "Home" not "HOME", "home", or any other combination
            await createPost({
                // Post Description
                postId: uuid(),
                postStatus: fields.postStatus.toLowerCase(),
                postType: fields.postType.toLowerCase(),
                postStyle: fields.postStyle.toLowerCase(),
                postPrice: Number(fields.postPrice),
                postAcreage: Number(fields.postAcreage),
                numberOfBaths: fields.numberOfBaths,
                numberOfBedrooms: fields.numberOfBedrooms,
                postDescription: fields.postDescription,
                // Seller Informations 
                sellerLastName: userLastName.toLowerCase(),
                sellerFirstName: userFirstName.toLowerCase(),
                sellerPhoneNumber: fields.sellerPhoneNumber,
                // Post Location
                streetCity: fields.streetCity.toLowerCase(),
                streetState: fields.streetState.toLowerCase(),
                streetCountry: fields.streetCountry.toLowerCase(),
                streetZipcode: fields.streetZipcode, 
                streetAddress: fields.streetAddress.toLowerCase(),
                streetAddressLine2: fields.streetAddressLine2.toLowerCase(),
                // Images
                image1,
                image2,
                image3,
                image4,
                image5
            });
             
            window.location.href = `/dashboard`;

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    // Creating New Post
    function createPost(post) {
        return API.post("posts", "/posts", {
            body: post
        });
    }

    // Returing UI
    return ( 
        <main id="PostNew" className="container-fluid border-top border-bottom pb-5 p-0"> 

            { /* Header - block - Start */ }
            <Header />
            { /* Header - block - End */ }

            { /* Images - block & props - Start */ }
            <div className="container row mx-auto p-0">
                <Images
                    image1={image1}
                    image2={image2}
                    image3={image3}
                    image4={image4}
                    image5={image5}
                    handleImage1={handleImage1}
                    handleImage2={handleImage2}
                    handleImage3={handleImage3}
                    handleImage4={handleImage4}
                    handleImage5={handleImage5}
                />
            </div>
            { /* Images - block & props - End */}

            { /* Post info & Post preview - block & props - Start */}
            <div className="container row mx-auto p-0">

                { /* Post Info - RIGHT Section - Start */}
                <PostInfo 
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    validateForm={validateForm}
                    userLastName={userLastName}
                    userFirstName={userFirstName}
                    handleFieldChange={handleFieldChange}
                    // Post Description
                    postType={fields.postType}
                    postStyle={fields.postStyle}
                    postPrice={fields.postPrice}
                    postStatus={fields.postStatus}
                    postAcreage={fields.postAcreage}
                    numberOfBaths={fields.numberOfBaths}
                    postDescription={fields.postDescription}
                    numberOfBedrooms={fields.numberOfBedrooms}
                    // Seller Information
                    sellerLastName={fields.sellerLastName}
                    sellerFirstName={fields.sellerFirstName}
                    sellerPhoneNumber={fields.sellerPhoneNumber}
                    // Post Location
                    streetCity={fields.streetCity}
                    streetState={fields.streetState}
                    streetAddress={fields.streetAddress}
                    streetCountry={fields.streetCountry}                   
                    streetZipcode={fields.streetZipcode}                   
                    streetAddressLine2={fields.streetAddressLine2}
                />
                { /* Post Info - RIGHT Section - End */}
                 
                { /* Post Preview - LEFT Section - Start */}
                <Preview
                    image1={image1}
                    postType={fields.postType}
                    postPrice={fields.postPrice}
                    postStatus={fields.postStatus}
                    postAcreage={fields.postAcreage}
                    numberOfBaths={fields.numberOfBaths}
                    numberOfBedrooms={fields.numberOfBedrooms}
                />
                { /* Post Preview - LEFT Section - Start */}

            </div>
            { /* Post info & Post preview - block & props - End */}

        </main> 
    );
}

// Header
function Header() {

    // Return UI
    return (
        <header className="container-fluid border-bottom py-3 mb-3 text-center bg-light">
            <h1>Add New Post</h1>
            <Link to="/dashboard" className="btn btn-primary"><i className="fa fa-reply"></i> Dashboard</Link>
        </header>
    );
}

// Image function
function Images(props) {

    // Important variables
    const {

        image1,
        image2,
        image3,
        image4,
        image5,
        handleImage1,
        handleImage2,
        handleImage3,
        handleImage4,
        handleImage5,

    } = props;

    // Return UI
    return (
        <div className="row mx-auto justify-content-center ">

            { /* Image1 - Start */}
            <div className="col-sm image-container mb-3">
                <div className="card">

                    { /* Image upload 1 */}
                    <img  src={image1 === null ? null : image1} className="align-self-center w-100" />

                    { /* Body */}
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="file1" className="color-red">Image 1</label>

                            { /* Input Field */}
                            <input
                                required="required"
                                form="form"
                                accept=".png, .jpg, .jpeg"
                                type="file"
                                name="file1"
                                id="file1"
                                onChange={handleImage1}
                            />
                        </div>
                    </div>
                </div>
            </div>
            { /* Image1 - End */}

            { /* Image2 - Start */}
            <div className="col-sm image-container mb-3">
                 
                <div className="card">

                    { /* Image upload 2 */}
                    <img src={image2 === null ? null : image2} className="align-self-center w-100" />

                    { /* Body */}
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="file2" className="color-red">Image 2</label>
                            <input
                                id="file2"
                                type="file"
                                name="file2"
                                form="form"
                                required="required"
                                onChange={handleImage2}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                    </div>

                </div>
            </div>
            { /* Image2 - End */}

            { /* Image3 - Start */}
            <div className="col-sm image-container mb-3">
                { /* CARD */}
                <div className="card">

                    { /* Image upload 3 */}
                    <img src={image3 === null ? null : image3} className="align-self-center w-100" />

                    { /* Body */}
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="file3" className="color-red">Image 3</label>
                            <input
                                id="file3"
                                form="form"
                                type="file"
                                name="file3"
                                required="required"
                                onChange={handleImage3}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            { /* Image3 - End */}

            { /* Image4 - Start */}
            <div className="col-sm image-container mb-3">

                <div className="card">

                    { /* Image upload 4 */}
                    <img src={image4 === null ? null : image4} className="align-self-center w-100" />

                    { /* Body */}
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="file4" className="color-red">Image 4</label>
                            <input
                                id="file4"
                                form="form"
                                type="file"
                                name="file4"
                                required="required"
                                onChange={handleImage4}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                    </div>

                </div>
            </div>
            { /* Image4 - End */}

            { /* Image5 - Start */}
            <div className="col-sm image-container mb-3"> 

                <div className="card">

                    { /* Image upload 5 */}
                    <img src={image5 === null ? null : image5} className="align-self-center w-100" />

                    { /* Body */}
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="file5" className="color-red">Image 5</label>
                            <input
                                id="file5"
                                form="form"
                                type="file"
                                name="file5"
                                required="required"
                                onChange={handleImage5}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                    </div>

                </div>
            </div>
            { /* Image5 - End */}

        </div>
        );
}

// Post Information
function PostInfo(props) {

    // Important variables
    const {

        // Important variable
        isLoading,
        handleSubmit,
        validateForm,
        userLastName,
        userFirstName,
        handleFieldChange,
        // Post Description
        postType,
        postStyle,
        postPrice,
        postStatus,
        postAcreage,
        numberOfBaths,
        numberOfBedrooms,
        postDescription,
        // Seller Information
        sellerPhoneNumber,
        // Post Location
        streetCity,
        streetState,
        streetAddress,
        streetCountry,
        streetZipcode,
        streetAddressLine2,

    } = props;

    // Return UI
    return ( 
        <div className="col-sm-7 mt-3">

            { /* Organization, Property Address, & Property Information - Start */}
            <div className="row">

                { /* Organization & Property Address - Start */}
                <div className="col-sm-6 m-0">

                    { /* Organization - Start */}
                    <div className="border p-3 mb-3 shadow-sm ">

                        { /* Heading */ }
                        <h3 className="mb-4">Organization</h3>

                        { /* Seller's Name - Start */}
                        <div className="form-group">
                            <label htmlFor="publisherName" className="color-red">Seller</label>
                            <input
                                form="form"
                                type="text"
                                disabled="disabled"
                                className="form-control"
                                value={userFirstName + " " + userLastName}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Your organization's name can't be changed</small>
                        </div>
                        { /* Seller's Name - End */}

                        { /* Seller's Phone Number - Start */}
                        <div className="form-group">
                            <label htmlFor="sellerPhoneNumber" className="color-red">Phone Number</label>
                            <input
                                type="tel"
                                form="form"
                                required="required"
                                id="sellerPhoneNumber"
                                name="sellerPhoneNumber"
                                className="form-control"
                                value={sellerPhoneNumber}
                                placeholder="phone number"
                                onChange={handleFieldChange}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your phone number</small>

                        </div>
                        { /* Seller's Phone Number - End */}

                    </div>
                    { /* Organization - End */}

                    { /* Property Address - Start */}
                    <div className="border p-3 mb-3 shadow-sm ">

                        { /* Heading */ }
                        <h3 className="mb-4">Property Address</h3> 

                        { /* Address - Start */}
                        <div className="form-group">
                            <label htmlFor="streetAddress" className="color-red">Street Address</label>
                            <input
                                form="form"
                                type="text"
                                id="streetAddress"
                                required="required"
                                name="streetAddress"
                                value={streetAddress}
                                placeholder="address"
                                className="form-control"
                                onChange={handleFieldChange}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your street address</small>

                        </div>
                        { /* Address - End */}

                        { /* Address Line 2 - Start */}
                        <div className="form-group">
                            <label htmlFor="streetAddressLine2" className="color-red">Street Address Line 2</label>
                            <input
                                form="form"
                                type="text"
                                required="required"
                                id="streetAddressLine2"
                                name="streetAddressLine2"
                                className="form-control"
                                value={streetAddressLine2}
                                placeholder="address line 2"
                                onChange={handleFieldChange}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your street address line 2</small>

                        </div>
                        { /* Address Line 2 - End */}

                        { /* City - Start */}
                        <div className="form-group">
                            <label htmlFor="streetCity" className="color-red">City</label>
                            <select
                                from="form"
                                id="streetCity"
                                name="streetCity"
                                value={streetCity}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select City</option>
                                <option value="atlanta">Atlanta</option>
                                <option value="lithonia">Lithonia</option>
                                <option value="kinshasa">Kinshasa</option>
                            </select>
                            <small className="text-secondary">Enter your organization's city</small>

                        </div>
                        { /* City - End */}

                        { /* State - Start */}
                        <div className="form-group ">
                            <label htmlFor="streetState" className="color-red">State</label>
                            <select
                                form="from"
                                id="streetState"
                                name="streetState"
                                value={streetState}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select State</option>
                                <option value="georgia">GA</option>
                                <option value="north carolina">NC</option>
                                <option value="south carolina">SC</option>
                            </select>
                            <small className="text-secondary">Enter your organization's State</small>


                        </div>
                        { /* State - End */}

                        { /* Number of bedrooms - Start */}
                        <div className="form-group">
                            <label htmlFor="streetZipcode" className="color-red">Zipcode / Postal</label>
                            <input
                                form="form"
                                type="number"
                                id="streetZipcode"
                                name="streetZipcode"
                                value={streetZipcode}
                                className="form-control"
                                onChange={handleFieldChange}
                                placeholder="zipcode / postal"
                            />
                            <small className="text-secondary">Enter the number of bedrooms </small>
                        </div>
                        { /* Number of bedrooms - End */} 

                        { /* Country - Start */}
                        <div className="form-group ">
                            <label htmlFor="streetCountry" className="color-red">Country</label>
                            <select
                                form="from"
                                id="streetCountry"
                                required="required"
                                name="streetCountry"
                                value={streetCountry}
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select Country</option>
                                <option value="usa">USA</option>
                                <option value="congo">Congo</option>
                                <option value="south africa">South Africa</option>
                            </select>
                            <small className="text-secondary">Enter your organization's Country</small>


                        </div>
                        { /* Country - End */}

                    </div>                   
                    { /* Property Address - End */}

                </div>
                { /* Organization & Property Address - End */}

                { /* Property Information - Start */}
                <div className="col-sm-6 m-0 ">

                    { /* Property Information - Start */}
                    <div className="border p-3 mb-3 bg-white shadow-sm">

                        { /* Heading */ }
                        <h3 className="mb-4">Property Information</h3>

                        { /* Status - Start */}
                        <div className="form-group">
                            <label htmlFor="postStatus" className="color-red">Status</label>
                            <select
                                form="form"
                                id="postStatus"
                                name="postStatus"
                                value={postStatus}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select a Status</option>
                                <option value="pending">Pending </option>
                                <option value="active">Active</option>
                                <option value="sold">Sold</option>
                            </select>
                            <small className="text-secondary">Enter property Status</small>

                        </div>
                        { /* Status - End */}

                        { /* Type - Start */}
                        <div className="form-group ">
                            <label htmlFor="postType" className="color-red">Type</label>
                            <select
                                form="form"
                                id="postType"
                                name="postType"
                                value={postType}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select Property Type</option>
                                <option value="single family">Single Family</option>
                                <option value="condo">Condo</option>
                                <option value="apartment">Apartment</option>
                                <option value="land">Land</option>
                                <option value="farm">Farm</option>
                            </select>
                            <small className="text-secondary">Enter property type</small>

                        </div>
                        { /* Type - End */}

                        { /* Style - Start */}
                        <div className="form-group ">
                            <label htmlFor="postStyle" className="color-red">Style</label>
                            <select
                                form="form"
                                id="postStyle"
                                name="postStyle"
                                value={postStyle}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select Property Style</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                                <option value="traditional">Traditional</option>
                            </select>
                            <small className="text-secondary">Enter property style</small>

                        </div>
                        { /* Style - End */}

                        { /* Price - Start */}
                        <div className="form-group">
                            <label htmlFor="postPrice" className="color-red">Price</label>
                            <input
                                form="form"
                                type="number"
                                id="postPrice"
                                name="postPrice"
                                value={postPrice}
                                placeholder="price"
                                className="form-control"
                                onChange={handleFieldChange}
                            />                     
                            <small className="text-secondary">Enter the property price </small> 
                        </div>
                        { /* Price - Start */}

                        { /* Acreage - Start */}
                        <div className="form-group">
                            <label htmlFor="postAcreage" className="color-red">Acreage</label>
                            <input
                                form="form"
                                type="number"
                                id="postAcreage"
                                name="postAcreage"
                                value={postAcreage}
                                placeholder="acres"
                                className="form-control"
                                onChange={handleFieldChange}
                            />
                            <small className="text-secondary">Enter the property price </small>
                        </div>
                        { /* Acreage - End */}

                        { /* Number of baths - Start */}
                        <div className="form-group">
                            <label htmlFor="numberOfBaths" className="color-red"># of Baths</label>
                            <input
                                form="form"
                                type="number"
                                id="numberOfBaths"
                                placeholder="baths"
                                name="numberOfBaths"
                                value={numberOfBaths}
                                className="form-control"
                                onChange={handleFieldChange}
                            />
                            <small className="text-secondary">Enter the number of bathrooms </small>
                        </div>
                        { /* Number of baths - End */}

                        { /* Number of bedrooms - Start */}
                        <div className="form-group">
                            <label htmlFor="numberOfBedrooms" className="color-red"># of Bedrooms</label>
                            <input
                                form="form"
                                type="number"
                                id="numberOfBedrooms"
                                placeholder="bedrooms"
                                name="numberOfBedrooms"
                                className="form-control"
                                value={numberOfBedrooms}
                                onChange={handleFieldChange}
                            />
                            <small className="text-secondary">Enter the number of bedrooms </small>
                        </div>
                        { /* Number of bedrooms - End */}                        

                        
                    </div>
                    { /* Property Information - End */}

                </div>
                { /* Property Information - End */}

            </div>
            { /* Organization, Property Address, & Property Information - Start */}

            { /* form, Post Description, Submit Button - Start */}
            <div className="col-sm-12 m-0">
                <form onSubmit={handleSubmit} id="form">

                    { /* Post Description - Start */}                        
                    <div className="form-group">
                        <label htmlFor="comment" className="color-red">Description</label>
                        <textarea
                            rows="5"
                            required="required"
                            id="postDescription"
                            name="postDescription"
                            value={postDescription}
                            className="form-control"
                            onChange={handleFieldChange}
                            placeholder="Some description"
                        ></textarea>
                    </div>  
                    { /* Post Description - End */} 
                    
                    { /* Submit Button - Start */}
                    <LoaderButton
                        type="submit"
                        isLoading={isLoading}
                        className="btn-primary"
                        disabled={!validateForm()}
                    >
                        Publish
                    </LoaderButton>
                    { /* Submit Button - End */}

                </form>
            </div>
            { /* form, Post Description, Submit Button - End */}

        </div> 
        );
}

// Preview
function Preview(props) {

    // Important variable
    const {

        image1, 
        postType,
        postPrice,
        postStatus,
        postAcreage,
        numberOfBaths,
        numberOfBedrooms,

    } = props;

    // Return UI
    return (
        <div className="col-sm bg-light border mt-3 py-3">
            <article className="shadow rounded bg-white" style={{ position: "sticky", top: "0" }}>
                <div className="card border-0">

                    { /* Image - Start */}
                    <img
                        src={image1 === null ? null : image1}
                        style={{ minHeight: "250px" }}
                        className="w-100 bg-dark"
                    /> 
                    { /* Image - End */}

                    { /* Body - Start */}
                    <div className="card-body">
                        <span className="badge badge-primary rounded">{postStatus} - 4 HOURS AGO </span>
                        <p className="m-0"><small>{postType}</small></p> 
                        <p><b>${postPrice}</b></p>
                        <p className="card-text">{numberOfBedrooms} bed - {numberOfBaths} bath - {postAcreage} sqft lot</p>
                    </div>
                    { /* Body - End */}

                </div>
            </article>
        </div>
        );
}