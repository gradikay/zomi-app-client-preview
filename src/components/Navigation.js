// This file is exported to --->  src/App.js
// React required
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Amplify required - see ---> src/index.js
import { Auth } from "aws-amplify";
// Getting - user status (user login - true or false) - from useAppContext
import { useAppContext } from "../libs/contextLib";
// CSS
import "../css/Navigation.css"
// -------------- Application Begins Bellow ------------ //

// Main function
export default function Navigation() {

    // Important variables
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [search, setSearch] = useState("");

    // Handling Logout
    async function handleLogout() {

        await Auth.signOut();

        userHasAuthenticated(false);

        window.location.href = '/login';

    }

    // Handling search
    async function handleSearch(event) {

        event.preventDefault();

        try {

            // if the search field is empty return "all"
            window.location.href = `/filter/${search === "" ? "all" : search.toLowerCase()}`;

        } catch (e) {
            alert(e);
        }
    }


    // Return UI
    return (
        <nav id="Navigation" className="navbar navbar-expand-lg bg-white shadow-sm">

            { /* Brand - Start */}
            <Link className="navbar-brand p-0" to="/">Larissa</Link>
            { /* Brand - End */}

            { /* Toggler/collapsibe Button - Start */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <i className='fa fa-server' role="img" aria-label="menu"></i>
            </button>
            { /* Toggler/collapsibe Button - End */}
             
            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    
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

                </ul>
            </div>

        </nav>
        );
}

// Search input
function Search(props) {

    // Important variables
    const { handleSearch, setSearch, search } = props;

    // Return UI
    return (
        <div className="nav-item pr-5">

            { /* Form - Start */}
            <form onSubmit={handleSearch}>
                <div className="input-group border-left pl-3">

                    { /* Input - Start */}
                    <input
                        id="search"
                        type="search"
                        name="search"
                        value={search}
                        placeholder="search"
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

// Links for both public and logged in users
function AppliedLinks() {
    return (
        <> 
            { /* Condo - Start */}
            <li className="nav-item">
                <Link className="nav-link" to="/filter/condo">
                    Condo
                </Link>
            </li>
            { /* Condo - End */}

            { /* Land - Start */}
            <li className="nav-item">
                <Link className="nav-link" to="/filter/land">
                    Land
                </Link>
            </li>
            { /* Land - End */}

            { /* Sell - Start */}
            <li className="nav-item">
                <Link className="nav-link" to="/sell">
                    Sell
                </Link>
            </li> 
            { /* Sell - End */}
             
            { /* Buy - Start */}
            <li className="nav-item dropdown">

                { /* Button */ }
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Buy
                </a>

                { /* Links */ }
                <ul className="dropdown-menu px-3">

                    <li className="nav-item">
                        <Link className="nav-link" to="#nowhere">
                            + Home for Sale
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/filter/new">
                            + New Constructions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/filter/senior">
                            + Senior Homes
                        </Link>
                    </li>
                    <div className="dropdown-header">Homes Values</div>

                    <li className="nav-item">
                        <Link className="nav-link" to="#nowhere">
                            + Housing Market
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#nowhere">
                            + Property Records
                        </Link>
                    </li> 
                </ul>
            </li>
            { /* Buy - End */}

            { /* News and Insight - Start */}
            <li className="nav-item">
                <Link className="nav-link" to="#nowhere">
                    News & Insight
                </Link>
            </li>  
            { /* News and Insight - End */}
        </>
        );
}

// Links for logged in users
function AuthenticatedLinks({ handleLogout }) {
    return (
        <> 

            { /* Compte - Start */}
            <div className="nav-item dropdown">

                { /* Button */ }
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    <i className="fa fa-user-circle" role="img" aria-label="account"></i>
                </a>

                { /* Links */ }
                <ul className="dropdown-menu px-2">

                    <li className="nav-item">
                        <Link className="nav-link" to="/postnew">
                            + Add Properties
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fa fa-ban fa-spin"></i> Dashboard
                        </Link>
                    </li>  

                </ul>
            </div>
            { /* Compte - End */}

            { /* Logout - Start */}
            <div className="nav-item dropdown" style={{ cursor: "pointer" }}>
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
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </li>
            { /* Register - End */}

            { /* Sign In - Start */}
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            { /* Sign In - End */}

        </>
        );
}