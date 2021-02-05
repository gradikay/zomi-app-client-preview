// This file is exported to --->  src/App.js
// React required
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Amplify required - see ---> src/index.js
import { Auth } from "aws-amplify";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib";
// -------------- Application Begins Bellow ------------ //


// Tab Block for links
// Example: <Tab name="About" link="/about" />
function Tab(props) {
    return (
        <div className="nav-item">
            <Link className="nav-link" to={props.link}>
                {props.name}
            </Link>
        </div>
        );
}

// Main function
export default function Navigation() {
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [search, setSearch] = useState("Chercher");

    // Handling Logout Function
    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);

        window.location.href = '/login';
    }

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

    return (
        <nav className="App navbar navbar-expand-md bg-white">

            { /* Brand - Start */}
            <Link className="navbar-brand bg-danger text-white p-2" to="/">Larissa</Link>
            { /* Brand - End */}

            { /* Toggler/collapsibe Button - Start */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <i className='fa fa-server' role="img" aria-label="menu"></i>
            </button>
            { /* Toggler/collapsibe Button - End */}
             
            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <div className="navbar-nav">


                    { /* Other Links - Start */}
                    <AppliedLinks/>
                    { /* Other Links - End */}

                    { /* Return Tabs whenever the user is Logged In or Logged Out - Start */}
                    {isAuthenticated ? (
                        <AuthenticatedLinks handleLogout={handleLogout} />
                    ) : ( 
                        <UnauthenticatedLinks/> 
                    )}
                    { /* Return Tabs whenever the user is Logged In or Logged Out - Start */}

                    { /* Search - Start */}
                    <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />
                    { /* Search - End */}

                </div>
            </div>

        </nav>
        );
}
// Search input
function Search({ handleSearch, setSearch, search }) {
    return (
        <div className="nav-item pr-5">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group border-left pl-3">

                    { /* Input - Start */}
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Chercher"
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
// Links for both public and logged in users
function AppliedLinks() {
    return (
        <> 
            { /* Sell - Start */}
            <Tab name="Sell" link="/sell" />
            { /* Sell - End */}
             
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Buy
                </a>
                <div class="dropdown-menu px-3">
                    <Tab name="Home for Sale" link="/buy" />
                    <Tab name="New Constructions" link="/buy" />
                    <Tab name="Senior Homes" link="/buy" />
                    <div class="dropdown-header">Homes Values</div>
                    <Tab name="Housing Market" link="/buy" />
                    <Tab name="Property Records" link="/buy" />
                </div>
            </li>

            { /* Sell - Start */}
            <Tab name="News & Insight" link="/sell" />
            { /* Sell - End */}
        </>
        );
}
// Links for logged in users
function AuthenticatedLinks({ handleLogout }) {
    return (
        <>
            { /* Messages - Start */}
            <Tab name={<i className='fas fa-bell'></i>} link="/messages" />
            { /* Messages - End */}

            { /* Compte - Start */}
            <Tab name="Compte" link="/settings" />
            { /* Compte - End */}

            { /* Logout - Start */}
            <div className="nav-item dropdown">
                <span
                    className="nav-link"
                    onClick={handleLogout}
                > Logout</span>
            </div>
            { /* Logout - End */}
        </>
        );
}
// Links for public users
function UnauthenticatedLinks() {
    return (
        <>
            { /* Register - Start */}
            <Tab name="Signup" link="/register" />
            { /* Register - End */}

            { /* Sign In - Start */}
            <Tab name="Login" link="/login" />
            { /* Sign In - End */}

        </>
        );
}