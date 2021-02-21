// This file is exported to ---> src/Routes.js
// React required
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// uuid for Unique Ids 
// Components
import LoaderButton from "../components/LoaderButton"; 
import img1 from "../img/img2.jpg";
// -------------- Application Begins Bellow ------------ //

// Main Application
export default function PostEdit() {

    // Important variables
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Post Description
    const [postTitle, setPostTitle ] = useState("");
    const [postSection, setPostSection] = useState(""); 
    const [postStatus, setPostStatus] = useState("");
    const [newsNetwork, setNewsNetwork] = useState("");
    const [article, setArticle] = useState("");
    // Writer
    const [userId, setUserId] = useState("");
    const [writerName, setWriterName] = useState("");
    const [writerName2, setWriterName2] = useState(""); 
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

        async function onLoad() {

            try {

                if (!unmounted) { 

                    // Important variables
                    // Post Description
                    setPostTitle("Man pleads guilty to breaking quarantine to meet up with others");
                    setPostSection("sport");
                    setPostStatus("current");
                    setNewsNetwork("Newsman");
                    setArticle(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus at ultrices mi tempus imperdiet nulla malesuada. 

Ut sem nulla pharetra diam sit amet. Senectus et netus et malesuada fames ac. Nisi scelerisque eu ultrices vitae auctor. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Vivamus arcu felis bibendum ut tristique et egestas. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Sodales neque sodales ut etiam sit amet nisl. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Condimentum id venenatis a condimentum vitae sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at. Fermentum leo vel orci porta non pulvinar neque.

`);
                    // Writer
                    setUserId("0000");
                    setWriterName("Mansa" + " " + "Gradi");
                    setWriterName2("Dodly Doo");
                    // Images
                    setImage1(img1);
                    setImage2(img1);
                    setImage3(img1);
                    setImage4(img1);
                    setImage5(img1);
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
            article.length > 0
        );
    }

    // Handling Submitted Form
    async function handleSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {

            // Redirect us to dashboard after update is complete
            window.location.href = `/dashboard`;

        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    // Handling Delete Post
    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        // If User click "ok" on the - alert popover - continue with deleting
        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try { 

            // Removing from images from S3
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

                { /* Images and Post Info - Start */}
                <div class="tab-pane container mx-auto p-0 active" id="post">
                    <div class="row">

                        { /* Images - block & props - Start */} 
                        <Images
                            image1={image1}
                            image2={image2}
                            image3={image3}
                            image4={image4}
                            image5={image5}
                            userId={userId}
                        /> 
                        { /* Images - block & props - End */}

                        { /* Post Info - RIGHT Section - Start */}
                        <PostInfo
                            isLoading={isLoading}
                            isDeleting={isDeleting}
                            handleSubmit={handleSubmit}
                            handleDelete={handleDelete}
                            validateForm={validateForm}
                            // Post Description
                            postTitle={postTitle} setPostTitle={setPostTitle}
                            postSection={postSection} setPostSection={setPostSection}
                            postStatus={postStatus} setPostStatus={setPostStatus}
                            newsNetwork={newsNetwork} setNewsNetwork={setNewsNetwork}
                            article={article} setArticle={setArticle}
                            // writer
                            writerName={writerName}
                            writerName2={writerName2} setWriterName2={setWriterName2}
                        />
                        { /* Post Info - RIGHT Section - End */}

                    </div>
                </div>
                { /* Images and Post Info - End */}

                { /* Post Preview - Start */}
                <div class="tab-pane container fade" id="preview">

                    { /* Preview - Start */}
                    <Preview
                        image1={image1}
                        postTitle={postTitle}
                        postSection={postSection}
                        newsNetwork={newsNetwork}
                        article={article}
                        userId={userId}
                        writerName={writerName}
                        writerName2={writerName2}
                    />
                    { /* Preview - Start */}

                </div>
                { /* Post Preview - Start */}

            </div>
            { /* Post info & Images & preview - block & props - End */}

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
        <div className="col-sm-4">
            <div className="row">

                { /* Image1 - Start */}
                <div className="col-sm-12 image-container my-3 p-0"> 

                    <div className="card">
                        <img src={img1} />
                    </div>
                
                </div>
                { /* Image1 - End */}
              
                { /* Image2 - Start */}
                <div className="col-sm-6 mb-3 p-0">

                    <div className="card">
                        <img src={img1} />
                    </div>

                </div>
                { /* Image2 - End */}
             
                { /* Image3 - Start */}
                <div className="col-sm-6 mb-3 p-0">

                    <div className="card">
                        <img src={img1} />
                    </div>

                </div>
                { /* Image3 - End */}
              
                { /* Image4 - Start */}
                <div className="col-sm-6 mb-3 p-0">

                    <div className="card">
                        <img src={img1} />
                    </div>

                </div>
                { /* Image4 - End */}
             
                { /* Image5 - Start */}
                <div className="col-sm-6 mb-3 p-0">

                    <div className="card">
                        <img src={img1} />
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

        isLoading,
        handleDelete,
        handleSubmit,
        isDeleting,
        validateForm,
        // Post Description
        postTitle, setPostTitle, 
        postSection, setPostSection, 
        postStatus, setPostStatus,
        newsNetwork, setNewsNetwork, 
        article, setArticle,
        // Writer 
        writerName,
        writerName2, setWriterName2
        // Post Location

    } = props;

    // Return UI
    return (
        <div className="col-sm-7 mt-3">

            { /* writer, News Network & Post Information - Start */}
            <div className="row">

                { /* Writer & News Network - Start */}
                <div className="col-sm-6 m-0">
                    <div className="border p-3 mb-3 shadow-sm ">

                        { /* Heading */}
                        <h3 className="mb-4">Publisher</h3>

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
                                onChange={e => setNewsNetwork(e.target.value)}
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
                                onChange={e => setWriterName2(e.target.value)}
                            />
                            { /* Helper */}
                            <small className="text-secondary">Enter your Co-writer's Name </small>

                        </div>
                        { /* CoWriter - End */}

                    </div>
                </div>
                { /* Writer & News Network - End */}

                { /* Post Information - Start */}
                <div className="col-sm-6 m-0">
                    <div className="border p-3 mb-3 bg-white shadow-sm">

                        { /* Heading */}
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
                                onChange={e => setPostStatus(e.target.value)}
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
                                onChange={e => setPostSection(e.target.value)}
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

            { /* form, Title, Post Description, Submit Button - Start */}
            <div className="col-sm-12 m-0">
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
                            onChange={e => setPostTitle(e.target.value)}
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
                            onChange={e => setArticle(e.target.value)}
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
                        Update
                    </LoaderButton>
                    { /* Submit Button - End */}

                    {/* Delete Button - Start */}
                    <LoaderButton
                        onClick={handleDelete}
                        isLoading={isDeleting}
                        className="btn btn-outline-danger ml-3"
                    >
                        Delete
                    </LoaderButton>
                    {/* Delete Button - End */}

                </form>
            </div>
            { /* form, Title, Post Description, Submit Button - End */}

        </div>
    );
}

// Preview
function Preview(props) {

    // Important variable
    const {

        image1,
        userId,
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

                    <img src={img1} />

                </div>
                { /* Image - End */}

                { /* Body - Start */}
                <div className="col-md-4">
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item px-0 bg-light pt-0">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item border-0 bg-light text-center"><b>{postTitle}</b></li>
                            </ul>
                        </li>
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-dark border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-newspaper-o"></i> Writer </small>
                                </li>
                                <li class="list-group-item border-0 bg-light">{newsNetwork}</li>
                            </ul>
                        </li>
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
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-secondary border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-calendar-check-o"></i> Published</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><small>{published}</small></li>
                            </ul>
                        </li>
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-secondary border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-calendar-plus-o"></i>  Updated</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><small>{updated}</small></li>
                            </ul>
                        </li>
                        <li class="list-group-item pl-0 bg-light">
                            <ul class="list-group list-group-horizontal">
                                <li class="list-group-item list-group-item-dark border-0 rounded pr-3" style={{ width: "110px" }}>
                                    <small><i class="fa fa-object-group"></i> Section</small>
                                </li>
                                <li class="list-group-item border-0 bg-light"><b>{postSection}</b></li>
                            </ul>
                        </li>
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
                    <img src={img1} />
                </div>

            </article>
            { /* Article - End */}

        </div>
    );
}