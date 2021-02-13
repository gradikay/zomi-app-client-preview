// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// uuid for Unique Ids
// Amplify required
import { API } from "aws-amplify";
// Components
import LoaderButton from "../components/LoaderButton";
import { S3Image } from 'aws-amplify-react'; 
// Libs
import { Storage } from "aws-amplify";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostEdit() {

    // Important variables
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Post Description
    const [postStatus, setPostStatus] = useState("");
    const [postType, setPostType ] = useState("");
    const [postStyle, setPostStyle] = useState("");
    const [postPrice, setPostPrice] = useState(10);
    const [postAcreage, setPostAcreage] = useState(1);
    const [numberOfBaths, setNumberOfBaths] = useState(1);
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
    const [postDescription, setPostDescription] = useState("");
    // Seller Information
    const [userId, setUserId] = useState("");
    const [sellerFirstName, setSellerFirstName] = useState("");
    const [sellerLastName, setSellerLastName] = useState("");
    const [sellerPhoneNumber, setSellerPhoneNumber] = useState(99999999);
    // Post Location
    const [streetAddress, setStreetAddress] = useState("");
    const [streetAddressLine2, setStreetAddressLine2] = useState("");
    const [streetCity, setStreetCity] = useState("");
    const [streetState, setStreetState] = useState("");
    const [streetCountry, setStreetCountry] = useState("");
    const [streetZipcode, setStreetZipcode] = useState(0);
    // display the image
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    // Retreiving data from database
    useEffect(() => {

        // Cleanup variable
        let unmounted = false;

        // Loading post from Dynamodb
        function loadPost() {
            return API.get("posts", `/posts/${id}`);
        }

        async function onLoad() {

            try {

                if (!unmounted) {

                    // Important variables
                    const post = await loadPost();
                    const { postStatus, postPrice, postType, postStyle, postDescription, userId, postAcreage, numberOfBaths, numberOfBedrooms } = post;

                    const { firstName, lastName, phoneNumber } = post.seller;

                    const { streetZipcode, streetAddress, streetAddressLine2, streetCity, streetState, streetCountry } = post.address;

                    const { image1, image2, image3, image4, image5 } = post.images;

                    // Important variables
                    // Post Description
                    setPostType(postType);
                    setPostStyle(postStyle);
                    setPostPrice(postPrice);
                    setPostStatus(postStatus);
                    setPostAcreage(postAcreage);
                    setNumberOfBaths(numberOfBaths);
                    setNumberOfBedrooms(numberOfBedrooms);
                    // Seller Information
                    setUserId(userId);
                    setSellerLastName(lastName);
                    setSellerFirstName(firstName);
                    setSellerPhoneNumber(phoneNumber);
                    // Post Location
                    setStreetCity(streetCity);
                    setStreetState(streetState);
                    setStreetCountry(streetCountry);
                    setStreetAddress(streetAddress);
                    setStreetZipcode(streetZipcode);
                    setPostDescription(postDescription);
                    setStreetAddressLine2(streetAddressLine2);
                    // Images
                    setImage1(image1);
                    setImage2(image2);
                    setImage3(image3);
                    setImage4(image4);
                    setImage5(image5);
                }

            } catch (e) {
                if (!unmounted) {
                    alert(e);
                }
            }
        }

        // Returning onLoad Function
        onLoad();

        // Avoid data leaks by cleaning up useEffect : unmounted
        return () => {
            unmounted = true; 
        };
    }, [id]);

    // Validation and Loading
    function validateForm() {
        return (
            postPrice > 0 &&
            postDescription.length > 0
        );
    }

    // Handling Submitted Form
    async function handleSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {

            // Note: making your data lowercase will help with your perform search 
            // on your dynamodb table -- use .toLowerCase()
            // Dynamodb is case sensitive. Example: a user searching for "Home" in the search bar
            // will only get results for "Home" not "HOME", "home", or any other combination
            await updatePost({
                // Post Description 
                postStatus: postStatus.toLowerCase(),
                postType: postType.toLowerCase(),
                postStyle: postStyle.toLowerCase(),
                postPrice: Number(postPrice),
                postAcreage: Number(postAcreage),
                numberOfBaths: numberOfBaths,
                numberOfBedrooms: numberOfBedrooms,
                postDescription: postDescription,
                // Seller Informations 
                sellerPhoneNumber: sellerPhoneNumber,
                // Post Location
                streetCity: streetCity.toLowerCase(),
                streetState: streetState.toLowerCase(),
                streetCountry: streetCountry.toLowerCase(),
                streetZipcode: streetZipcode,
                streetAddress: streetAddress.toLowerCase(),
                streetAddressLine2: streetAddress.toLowerCase(),
            });

            // Redirect us to dashboard after update is complete
            window.location.href = `/dashboard`;

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }
     
    // Updating Post
    function updatePost(post) {
        return API.put("posts", `/posts/${id}`, {
            body: post
        });
    }

    // Deleting Post
    function deletePost() {
        return API.del("posts", `/posts/${id}`);
    }

    // Handling Delete Post
    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await Storage.remove(image1, { level: 'protected' });
            await Storage.remove(image2, { level: 'protected' });
            await Storage.remove(image3, { level: 'protected' });
            await Storage.remove(image4, { level: 'protected' });
            await Storage.remove(image5, { level: 'protected' });
            await deletePost();
            window.location.href = `/dashboard`;
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }


    // Returing UI
    return (
        <main id="PostEdit" className="container-fluid border-top border-bottom pb-5 p-0">

            { /* Header - block & props - Start */}
            <Header id={id}/>
            { /* Header - block & props - End */}

            { /* Images - block & props - Start */}
            <div className="container row mx-auto p-0">
                <Images
                    image1={image1}
                    image2={image2}
                    image3={image3}
                    image4={image4}
                    image5={image5} 
                    userId={userId}
                />
            </div>
            { /* Images - block & props - End */}

            { /* Post info & Post preview - block & props - Start */}
            <div className="container row mx-auto p-0">

                { /* Post Info - RIGHT Section - Start */}
                <PostInfo
                     
                    // Important variable
                    isLoading={isLoading}
                    isDeleting={isDeleting}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    validateForm={validateForm}
                    // Post Description
                    postStatus={postStatus} setPostStatus={setPostStatus}
                    postType={postType} setPostType={setPostType}
                    postStyle={postStyle} setPostStyle={setPostStyle}
                    postPrice={postPrice} setPostPrice={setPostPrice}
                    postAcreage={postAcreage} setPostAcreage={setPostAcreage}
                    numberOfBaths={numberOfBaths} setNumberOfBaths={setNumberOfBaths}
                    numberOfBedrooms={numberOfBedrooms} setNumberOfBedrooms={setNumberOfBedrooms}
                    postDescription={postDescription} setPostDescription={setPostDescription}
                    // Seller Information 
                    sellerFirstName={sellerFirstName}
                    sellerLastName={sellerLastName}
                    sellerPhoneNumber={sellerPhoneNumber} setSellerPhoneNumber={setSellerPhoneNumber}
                    // Post Location
                    streetAddress={streetAddress} setStreetAddress={setStreetAddress}
                    streetAddressLine2={streetAddressLine2} setStreetAddressLine2={setStreetAddressLine2}
                    streetCity={streetCity} setStreetCity={setStreetCity}
                    streetState={streetState} setStreetState={setStreetState}
                    streetCountry={streetCountry} setStreetCountry={setStreetCountry}
                    streetZipcode={streetZipcode} setStreetZipcode={setStreetZipcode}

                /> 
                { /* Post Info - RIGHT Section - End */}

                { /* Post Preview - LEFT Section - Start */}
                <Preview
                    image1={image1} 
                    userId={userId}
                    postType={postType}
                    postPrice={postPrice}
                    postStatus={postStatus}
                />
                { /* Post Preview - LEFT Section - End */}

            </div>
            { /* Post info & Post preview - block & props - End */}

        </main>
    );
}

// Header
function Header({id}) {

    // Return UI
    return (
        <header className="container-fluid border-bottom py-3 mb-3 text-center bg-light">
            <h1>Edit Post</h1>
            <Link to="/dashboard" className="btn btn-primary"><i className="fa fa-reply"></i> Dashboard</Link>
            <p className="text-secondary p-2 m-2">Id: <small>{id}</small></p>
        </header>
    );
}

// Image function
function Images(props) {

    // Important variable
    const {

        image1,
        image2,
        image3,
        image4,
        image5,
        userId

    } = props; 

    return (
        <div className="row mx-auto justify-content-center ">

            { /* Image1 - Start */}
            <div className="col-sm image-container p-0"> 

                <div className="card">
                    <S3Image level="protected" identityId={userId} imgKey={image1} /> 
                </div>
                
            </div>
            { /* Image1 - End */}
              
            { /* Image2 - Start */}
            <div className="col-sm image1-container p-0">

                <div className="card">
                    <S3Image level="protected" identityId={userId} imgKey={image2} />
                </div>

            </div>
            { /* Image2 - End */}
             
            { /* Image3 - Start */}
            <div className="col-sm image1-container p-0">

                <div className="card">
                    <S3Image level="protected" identityId={userId} imgKey={image3} />
                </div>

            </div>
            { /* Image3 - End */}
              
            { /* Image4 - Start */}
            <div className="col-sm image1-container p-0">

                <div className="card">
                    <S3Image level="protected" identityId={userId} imgKey={image4} />
                </div>

            </div>
            { /* Image4 - End */}
             
            { /* Image5 - Start */}
            <div className="col-sm image1-container p-0">

                <div className="card">
                    <S3Image level="protected" identityId={userId} imgKey={image5} />
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

        isLoading,
        handleDelete,
        handleSubmit,
        isDeleting,
        validateForm,
        // Post Description
        postStatus, setPostStatus,
        postType, setPostType, 
        postStyle, setPostStyle,
        postPrice, setPostPrice,
        postAcreage, setPostAcreage,
        numberOfBaths, setNumberOfBaths,
        numberOfBedrooms, setNumberOfBedrooms,
        postDescription, setPostDescription,
        // Seller Information 
        sellerFirstName,
        sellerLastName,
        sellerPhoneNumber, setSellerPhoneNumber,
        // Post Location
        streetAddress, setStreetAddress,
        streetAddressLine2, setStreetAddressLine2,
        streetCity, setStreetCity,
        streetState, setStreetState,
        streetCountry, setStreetCountry,
        streetZipcode, setStreetZipcode,

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

                        { /* Heading */}
                        <h3 className="mb-4">Organization</h3>

                        { /* Seller's Name - Start */}
                        <div className="form-group">
                            <label htmlFor="publisherName" className="color-red">Seller</label>
                            <input
                                form="form"
                                type="text"
                                disabled="disabled"
                                className="form-control"
                                value={sellerFirstName + " " + sellerLastName}
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
                                onChange={e => setSellerPhoneNumber(e.target.value)}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your phone number</small>

                        </div>
                        { /* Seller's Phone Number - End */}

                    </div>
                    { /* Organization - End */}

                    { /* Property Address - Start */}
                    <div className="border p-3 mb-3 shadow-sm ">

                        { /* Heading */}
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
                                onChange={e => setStreetAddress(e.target.value)}
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
                                onChange={e => setStreetAddressLine2(e.target.value)}
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
                                onChange={e => setStreetCity(e.target.value)}
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
                                onChange={e => setStreetState(e.target.value)}
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
                                placeholder="zipcode / postal"
                                onChange={e => setStreetZipcode(e.target.value)}
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
                                onChange={e => setStreetCountry(e.target.value)}
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
                <div className="col-sm-6 m-0">

                    { /* Property Information - Start */}
                    <div className="border p-3 mb-3 bg-white shadow-sm">

                        { /* Heading */}
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
                                onChange={e => setPostStatus(e.target.value)}
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
                                onChange={e => setPostType(e.target.value)}
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
                                onChange={e => setPostStyle(e.target.value)}
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
                                onChange={e => setPostPrice(e.target.value)}
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
                                onChange={e => setPostAcreage(e.target.value)}
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
                                name="numberOfBaths"
                                value={numberOfBaths}
                                placeholder="baths"
                                className="form-control"
                                onChange={e => setNumberOfBaths(e.target.value)}
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
                                onChange={e => setNumberOfBedrooms(e.target.value)}
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
                            placeholder="Some description"
                            onChange={e => setPostDescription(e.target.value)}
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
                        Update
                    </LoaderButton>
                    { /* Submit Button - End */}

                    {/* Delete Button - Start */}
                    <LoaderButton
                        onClick={handleDelete}
                        isLoading={isDeleting}
                        className="btn btn-danger ml-3"
                    >
                        Delete
                    </LoaderButton>
                    {/* Delete Button - End */}

                </form>
            </div>
            { /* form, Post Description, Submit Button - End */}

        </div>
    );
}

// Preview 
function Preview(props) {

    // Important variables
    const {

        image1,
        userId,
        postStatus,
        postPrice,
        postType,

    } = props;

    // Return UI
    return (
        <div className="col-sm bg-light border mt-3 py-3">
            <article className="shadow rounded bg-white" style={{ position: "sticky", top: "0" }}>
                <div className="card border-0">

                    { /* Image */}
                    <S3Image level="protected" identityId={userId} imgKey={image1} /> 

                    { /* Body */}
                    <div className="card-body">
                        <span className="badge badge-primary rounded">{postStatus} - 4 HOURS AGO</span>
                        <p className="m-0"><small>{postType}</small></p>
                        <p><b>${postPrice}</b></p>
                        <p className="card-text">5 bed - 2.5 bath - 9,148 sqft lot</p>
                    </div>

                </div>
            </article>
        </div>
    );
}