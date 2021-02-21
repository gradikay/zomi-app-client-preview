// This file is exported to --->  src/App.js
// React required
import React from "react";
// -------------- Application Begins Bellow ------------ //

export default function Footer() { 
    return ( 
        <footer id="Footer" className="container-fluid bg-white">
             <SectionA/> 
             <SectionB/> 
        </footer> 
    );
}
function SectionA() {
    return (
        <div className="row py-5 bg-light border-bottom">
            <section className="col">
                <div className="border-bottom mb-3 pb-3">
                    <p><b>Zomi</b></p>
                    <p>Connecting decision makers to a dynamic network of information, people and ideas, quiclky and accurately delivers business and financial information, news and insight around the world</p>

                </div>
                <div className="border-bottom mb-3 pb-3">
                    <p><b>For Customers</b></p>
                    <p>Zomi Anywhere Remote Login</p>
                    <p>Software Updates</p>
                    <p>Manage Products and Account Information</p>

                </div>
                <div className="border-bottom mb-3 pb-3">
                    <p><b>Support</b></p>
                    <ul>
                        <li>Americas +000 000 0000</li>
                        <li>EMEA + 000 00 000 0000 </li>
                        <li>Asia Pacific +00 0 00 0 00</li>
                    </ul>
                </div>
            </section>
            <section className="col">
                <div className="mb-3 pb-3">
                    <p className="border-bottom">COMPANY</p>
                    <ul>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Diversity and Inclusion</li>
                        <li>Innovation</li>
                        <li>Philanthropy</li>
                        <li>Sustainability</li>
                    </ul>
                </div>
                <div className="mb-3 pb-3">
                    <p className="border-bottom">Communications</p>
                    <ul>
                        <li>Press Announcements</li>
                        <li>Press contacts</li>
                    </ul>
                </div>
                <div className="mb-3 pb-3">
                    <p className="border-bottom">Follow</p>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                        <li>Instagram</li>
                    </ul>
                </div>

            </section>
            <section className="col">
                <div className="mb-3 pb-3">
                    <p className="border-bottom">Products</p>
                    <ul>
                        <li>Zomi Terminal</li>
                        <li>Execution and Order Managment</li>
                        <li>Content and Data</li>
                        <li>Financial Data Management</li>
                        <li>Integration and Distribution</li>
                        <li>Tradebook</li>
                    </ul>
                </div>
                <div className="mb-3 pb-3">
                    <p className="">Industry Products</p>
                    <ul>
                        <li>Zomi Law</li>
                        <li>Zomi Tax</li>
                        <li>Zomi Governement</li>
                        <li>ZomiNEF</li>
                    </ul>
                </div>
            </section>
            <section className="col">
                <div className="mb-3 pb-3">
                    <p className="">MEDIA</p>
                    <ul>
                        <li>Zomi Markets</li>
                        <li>Zomi Technology</li>
                        <li>Zomi Pursuits</li>
                        <li>Zomi Politics</li>
                        <li>Zomi Politics</li>
                        <li>Zomi Opinion</li>
                        <li>Zomi Businessweek</li>
                        <li>Zomi Live Conferences</li>
                        <li>Zomi Live Apps</li>
                        <li>Zomi Live Radio</li>
                        <li>Zomi Television</li>
                        <li>News Bureaus</li>
                        <li>ZomiNEF</li>
                    </ul>
                </div>
                <div className="mb-3 pb-3">
                    <p className="">Media Services</p>
                    <ul>
                        <li>Zomi Media Distribution</li>
                        <li>Advertising</li>
                    </ul>
                </div>
            </section>
        </div> 
        );
}
function SectionB() {
    return (
        <div className="row p-2 bg-light">
            <div className="col text-center">
                <p className="m-0">2021 Fiberabbit. All Rights Reserved</p>
            </div>
        </div>
        );
}