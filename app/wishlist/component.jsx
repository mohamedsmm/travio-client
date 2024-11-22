"use client"
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Card from "@/app/component/card";
import Footer from "@/app/component/footer";
import { Fragment, useEffect, useState } from "react";
import { api, get_session, print } from "@/public/script/public";
import Link from "next/link";
import $ from "jquery";

export default function Wishlist({ settings }) {

    const [result, setResult] = useState([]);

    const session_data = async () => {

        let data = get_session('wishlist') || [];

        data = data.filter((item, index) => data.indexOf(item) === index);
        
        let result = await api('home/wishlist', {'ids': JSON.stringify(data.reverse())});

        if ( result.status && result.tours.length ) {

            setResult(result.tours);
            $(".loader, .empty").hide();
            $(".all-cards").fadeIn(500);

        }
        else {

            $(".loader, .all-cards").hide();
            $(".empty").fadeIn(500).css("display", "flex");

        }

    }
    useEffect(() => {

        session_data();

    }, []);

    return (

        <Fragment>

            <Nav searchbox settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">

                <main className="wishlist relative">

                    <div className="full-width all-cards hide">

                        <div className="title full-width flex-start">
                            <p className="full-width flex-start">My Wishlist</p>
                            <p className="full-width flex-start">Your list of tours and activities that you saved for your travel research</p>
                        </div>

                        <div className="tour-slider wishlist-cards full-width flex-wrap flex-start">

                            { result.map((item, index) => <Card key={index} data={item} favore/>) }
                            
                        </div>

                    </div>

                    <div className="empty flex-column full-width hide">

                        <div className="full-width flex image layer">
                            <img src="/media/image/public/wish.svg"/>
                        </div>

                        <div className="full-width flex-column info">

                            <p> Your wishlist is empty </p>
                            <span> The world is waiting for you. Fill up on amazing things to do <br/> from Paris to Sydney. </span>
                            <Link href="/">Back to Home</Link>

                        </div>

                    </div>

                    <div className="loader"></div>

                </main>

                <Footer page="Wishlist" settings={settings}/>

            </div>

        </Fragment>

    )

}
