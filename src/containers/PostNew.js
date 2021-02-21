// This file is exported to ---> src/Routes.js
// React required
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// uuid for Unique Ids  
import config from "../config";
// Components 
import LoaderButton from "../components/LoaderButton"; 
import { useFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostNew() {

    // Important variables
    const { userFirstName, userLastName } = useAppContext();
    const [fields, handleFieldChange] = useFields({
        // Post Description
        postTitle: "",
        postSection: "",
        postStatus: "",
        newsNetwork: "",
        article: "",
        // writer
        writerName2: "", 
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
            fields.article.length > 0
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

            // Redirect us to dashboard after data have been submitted
            window.location.href = `/dashboard`;

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    // Returing UI
    return ( 
        <main id="PostNew" className="container-fluid border-top border-bottom pb-5 p-0"> 

            { /* Header - block - Start */ }
            <Header />
            { /* Header - block - End */ } 

            { /* Tabs - Start */}
            <div class="container mx-auto py-3 border-bottom">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="pill" href="#post">Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#preview">Preview</a>
                    </li> 
                </ul>
            </div>
            { /* Tabs - End */}

            { /* Post info & Images & Preview - block & props - Start */}
            <div class="tab-content ">
                <div class="tab-pane container mx-auto p-0 active" id="post">
                    <div class="row">

                        { /* Images - block & props - Start */ } 
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
                        { /* Images - block & props - End */}

                        { /* Post Info - Start */}
                        <PostInfo 
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                            validateForm={validateForm}
                            userLastName={userLastName}
                            userFirstName={userFirstName}
                            handleFieldChange={handleFieldChange}
                            // Post Description
                            postTitle={fields.postTitle}
                            postSection={fields.postSection}
                            postStatus={fields.postStatus}
                            newsNetwork={fields.newsNetwork}
                            article={fields.article}
                            // writer
                            writerName={userFirstName + " " + userLastName}
                            writerName2={fields.writerName2}
                        />
                        { /* Post Info - End */}

                    </div>
                </div>
                <div class="tab-pane container fade" id="preview">

                    { /* Post Preview - Start */}
                    <Preview
                        image1={image1}
                        postTitle={fields.postTitle}
                        postSection={fields.postSection} 
                        newsNetwork={fields.newsNetwork}
                        article={fields.article}
                        writerName={userFirstName + " " + userLastName}
                        writerName2={fields.writerName2}
                    />
                    { /* Post Preview - Start */}

                </div>
            </div>
            { /* Post info & Images & preview - block & props - End */}

            

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
        <div className="col-sm-4">
            <div className="row">

                { /* Image1 - Start */}
                <div className="col-sm-12 image-container my-3 p-0">
                    <div className="card">

                        { /* Image upload 1 */}
                        <img  src={image1 === null ? null : image1} className="align-self-center" />

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
                <div className="col-sm-6 image-container mb-3 p-0">
                 
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
                <div className="col-sm-6 image-container mb-3 p-0">
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
                <div className="col-sm-6 image-container mb-3 p-0">

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
                <div className="col-sm-6 image-container mb-3 p-0"> 

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
        handleFieldChange,
        // Post Description
        postTitle,
        postSection,
        postStatus,
        newsNetwork,
        article,
        // writer
        writerName,
        writerName2,

    } = props;

    // Return UI
    return ( 
        <div className="col-sm-7 mt-3">

            { /* writer, News Network & Post Information - Start */}
            <div className="row">

                { /* Writer & News Network - Start */}
                <div className="col-sm-6"> 
                    <div className="border p-3 mb-3 shadow-sm ">

                        { /* Heading */ }
                        <h3 className="mb-4">Writer</h3>

                        { /* News Network's Name - Start */}
                        <div className="form-group">
                            <label htmlFor="newsNetwork" className="color-red">News Network</label>
                            <input
                                type="text"
                                form="form"
                                required="required"
                                id="newsNetwork"
                                name="newsNetwork"
                                className="form-control"
                                value={newsNetwork}
                                placeholder="news network's name"
                                onChange={handleFieldChange}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your News Network's name </small>

                        </div>
                        { /* News Network's Name - End */}

                        { /* Writer - Start */}
                        <div className="form-group">
                            <label htmlFor="writerName" className="color-red">Writer</label>
                            <input
                                form="form"
                                type="text"
                                disabled="disabled"
                                className="form-control"
                                value={writerName}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Your name can't be changed</small>
                        </div>
                        { /* Writer - End */}

                        { /* CoWriter - Start */}
                        <div className="form-group">
                            <label htmlFor="writerName2" className="color-red">Co-writer</label>
                            <input
                                type="text"
                                form="form"
                                required="required"
                                id="writerName2"
                                name="writerName2"
                                className="form-control"
                                value={writerName2}
                                placeholder="co-writer's name (optional)"
                                onChange={handleFieldChange}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your Co-writer's Name </small>

                        </div>
                        { /* CoWriter - End */}

                    </div>
                </div>
                { /* Writer & News Network - End */}

                { /* Post Information - Start */}
                <div className="col-sm-6">
                    <div className="border p-3 mb-3 bg-white shadow-sm">

                        { /* Heading */ }
                        <h3 className="mb-4">Post Information</h3>

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
                                <option value="breaking">Breaking</option>
                                <option value="current">Current</option>
                            </select>
                            <small className="text-secondary">Enter post status</small>

                        </div>
                        { /* Status - End */}

                        { /* Section - Start */}
                        <div className="form-group ">
                            <label htmlFor="postSection" className="color-red">Section</label>
                            <select
                                form="form"
                                id="postSection"
                                name="postSection"
                                value={postSection}
                                required="required"
                                className="form-control"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select Post Section</option>
                                <option value="travel">Travel</option>
                                <option value="entertainment">Entertainmnet</option>
                                <option value="world">World</option>
                                <option value="style">Style</option>
                                <option value="sport">Sport</option>
                            </select>
                            <small className="text-secondary">Enter post type</small>

                        </div>
                        { /* Section - End */}
                        
                    </div>
                </div>
                { /* Post Information - End */}

            </div>
            { /* writer, News Network & Post Information - End */}

            { /* form, article, Title, Submit Button - Start */}
            <div className="col-sm-12 m-0 p-0">
                <form onSubmit={handleSubmit} id="form">

                    { /* Post Title - Start */}                        
                    <div className="form-group">
                        <label htmlFor="comment" className="color-red">Title</label>
                        <textarea
                            rows="1"
                            required="required"
                            id="postTitle"
                            name="postTitle"
                            value={postTitle}
                            className="form-control"
                            onChange={handleFieldChange}
                            placeholder="Title"
                        ></textarea>
                    </div>  
                    { /* Post Title - End */} 

                    { /* Post Description - Start */}                        
                    <div className="form-group">
                        <label htmlFor="comment" className="color-red">Article</label>
                        <textarea
                            rows="4"
                            required="required"
                            id="article"
                            name="article"
                            value={article}
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
                        className="btn btn-outline-primary"
                        disabled={!validateForm()}
                    >
                        Publish
                    </LoaderButton>
                    { /* Submit Button - End */}

                </form>
            </div>
            { /* form, article, Title, Submit Button - End */}

        </div> 
        );
}

// Preview
function Preview(props) {

    // Important variable
    const {

        image1, 
        article,
        postTitle,
        writerName, 
        postSection,
        writerName2,
        newsNetwork,

    } = props;
    // Dates
    const publishednew = new Date();
    const published = publishednew.toLocaleDateString();
    const updatednew = new Date();
    const updated = updatednew.toLocaleDateString();
    // Writer
    const lowerCaseWriterName = writerName.toLowerCase();

    // Return UI
    return (
        <div className="col-sm border mt-3">

            { /* Image and Post Description - Start */}
            <section className="row bg-light pt-3">

                { /* Image - Start */}
                <div className="col-md-8">

                    <img
                        src={image1 === null ? null : image1}
                        style={{ minHeight: "250px" }}
                        className="w-100 bg-dark"
                    /> 

                </div>
                { /* Image - End */}

                { /* Body - Start */}
                <div className="col-md-4">
                    <ul class="list-group list-group-flush ">

                        { /* Title - Start */}
                        <li class="list-group-item px-0 bg-light pt-0">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item border-0 bg-light text-center"><b>{postTitle}</b></li>
                            </ul>
                        </li>
                        { /* Title - End */}

                        { /* News Network - Start */}
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-dark border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-newspaper-o"></i> Writer </small>
                                </li>
                                <li class="list-group-item border-0 bg-light">{newsNetwork}</li>
                            </ul>
                        </li>
                        { /* News Network - End */}

                        { /* Writers - Start */}
                        <li class="list-group-item px-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-danger border-0 rounded pr-3" style={{
                                    minWidth: "110px"
                                }}>
                                    <small><i class="fa fa-bullhorn"></i> Author(s)</small>
                                </li>
                                <li class="list-group-item border-0 bg-light text-capitalize">
                                    {lowerCaseWriterName}
                                    {writerName2 === "" ? "" : " & " + writerName2}
                                </li>
                            </ul>
                        </li>
                        { /* Writers - End */}

                        { /* Published Date - Start */}
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-secondary border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-calendar-check-o"></i> Published</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><small>{published}</small></li>
                            </ul>
                        </li>
                        { /* Published Date - End */}

                        { /* Updated Date - Start */}
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-secondary border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-calendar-plus-o"></i>  Updated</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><small>{ updated }</small></li>
                            </ul>
                        </li>
                        { /* Updated Date - End */}

                        { /* Post Section - Start */}
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-dark border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-object-group"></i> Section</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><b>{postSection}</b></li>
                            </ul>
                        </li>
                        { /* Post Section - End */}

                    </ul>
                </div>
                { /* Body - End */}

            </section>
            { /* Image and Post Description - End */}

            { /* Article - Start */}
            <article className="row bg-white border-top pt-3"> 

                { /* Article */}
                <div className="col-md-8 p-3">
                    <pre style={{ whiteSpace: "pre-wrap" }}>{article}</pre>
                </div>

                { /* Image */}
                <div className="col-md-4">
                    <img src={image1 === null ? null : image1} className="w-100 bg-dark" />
                </div>
                 
            </article>
            { /* Article - End */}

        </div>
        );
}