"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Header from "@/app/component/header";
import Features from "@/app/component/features";
import Footer from "@/app/component/footer";
import Tours from "@/app/component/tours";
import Trip from "@/app/component/trip";
import Locations from "@/app/component/locations";
import Attractions from "@/app/component/attractions";
import Banner from "@/app/component/banner";
import { Fragment } from "react";
import Link from "next/link";

export default function Home ({ data, settings }) {

    return (

        <Fragment>

            <Nav settings={settings}/>
            
            <Chat settings={settings}/>

            <div className="main-container">

                <Header settings={settings}/>

                <main>

                    <Features settings={settings}/>

                    {
                        data.destinations &&
                        <div className="main flex-column destinations">

                            <div className="title">Top Destinations</div>

                            <Locations data={data.destinations.slice(0, 3)}/>

                            <div className="full-width flex flex-start loca-button">

                                <Link href="/destinations">More Destinations</Link>

                            </div>

                        </div>
                    }

                    {
                        data.recent_tours &&
                        <div className="hr">
                            <p><span>Why you are seeing <a>recenty tours</a></span></p>
                        </div>
                    }

                    {
                        data.recent_tours &&
                        <div className="main flex-column">

                            <div className="title">Recently Viewed</div>

                            <Tours data={data.recent_tours}/>

                        </div>
                    }

                </main>

                { ( data.recommend_tours || data.destinations ) && <Banner /> }

                <main>

                    {
                        data.recommend_tours &&
                        <div className="main flex-column">
                            
                            <div className="title">Recommended</div>
                            
                            <Tours data={data.recommend_tours}/>
                            
                        </div>
                    }

                    <Trip />

                </main>

                <Banner />

                <main>
                    
                    <div className="main flex-column sml-mr1">

                        <div className="title head1">Popular Attractions</div>

                        <Attractions data={data.recent_attractions}/>

                    </div>
                
                </main>

                <Footer settings={settings}/>

            </div>

        </Fragment>

    )

}
