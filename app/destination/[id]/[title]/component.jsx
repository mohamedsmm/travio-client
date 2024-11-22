"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import Card from "@/app/component/card";
import Tours from "@/app/component/tours";
import { host, parse } from "@/public/script/public";
import { Fragment } from "react";

export default function Destination({ data, tours, recent_tours, settings }) {

    return (

        <Fragment>

            <Nav searchbox settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">

                <header className="se_header relative">

                    <div className="swiper-slide image">
                        
                        <img src={`${host}${data.image}`}/>
                        
                    </div>

                    <div className="name absolute full-width full-height flex" style={{ background: '#0003' }}>
                        <h1>{parse(data.name)}</h1>
                    </div>

                </header>

                <main className="loc">

                    <div className="main flex flex-column">

                        <div className="title heading">The top {tours.length} tours in {parse(data.name)}</div>
                        <hr />

                        <div className="flex full-width descibe">{parse(data.description)}</div>

                    </div>

                    <div className="hr no-select">
                        <p><span>Why you are seeing these <a>these recommendations</a></span></p>
                    </div>

                </main>

                <div className="destination full-width">

                    <div className="loc">

                        <main>

                            <div className="main flex-column">

                                <div className="tour-slider destination-cards full-width flex-wrap flex-start">

                                    { tours.map((item, index) => <Card key={index} data={item}/>) }

                                </div>

                            </div>

                        </main>

                    </div>

                    <main>
                        {
                            recent_tours.length &&
                            <div className="main flex flex-column full-width no-border">
                
                                <h1 className="title full-width flex flex-start">Recently Tours</h1>
                    
                                <Tours data={recent_tours} cards={4}/>
                    
                            </div>
                        }
                    </main>

                </div>

                <Footer page="Destination" settings={settings}/>

            </div>

        </Fragment>
        
    )

}
