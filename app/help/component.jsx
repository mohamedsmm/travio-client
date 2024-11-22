"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import Terms from "@/app/component/terms";
import { Fragment } from "react";

export default function Help ({ settings }) {

    return (

        <Fragment>

            <Nav searchbox settings={settings}/>
            
            <Chat settings={settings}/>

            <div className="main-container">

                <Terms settings={settings} help/>

                <Footer page="Help Center" settings={settings}/>

            </div>

        </Fragment>

    )

}
