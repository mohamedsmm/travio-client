"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { Fragment } from "react";
import Link from "next/link";

export default function Error ({ settings }) {

    return (

        <Fragment>

            <Nav settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">

                <div className="flex flex-wrap error-page no-select">

                    <div className="image flex layer">
                        
                        <img src="/media/image/public/error.png"/>
                    
                    </div>

                    <div className="flex flex-column">

                        <h1 className="flex flex-start">Oops...</h1>

                        <p className="flex flex-start text-left">
                            We can't find that page. <br />
                            Let's get you back on the right track. <br />
                            Try another search, or click below.
                        </p>

                        <div className="text-left flex flex-start full-width">
                            <Link href="/" className="flex">Take me home</Link>
                        </div>

                    </div>

                </div>

                {/* <Footer page="Error - 404 !" settings={settings}/> */}

            </div>

        </Fragment>

    )

}
