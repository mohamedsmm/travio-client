"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { Fragment } from "react";
import { host, parse } from "@/public/script/public";
import Link from "next/link";

export default function Home ({ data, settings }) {

    return (

        <Fragment>

            <Nav settings={settings}/>
            
            <Chat settings={settings}/>

            <div className="main-container">

                <main>
                    {
                        data.destinations &&
                        <div className="main flex-column destinations">

                            <div className="titles full-width flex-start">
                                <p className="full-width flex-start">All Destinations</p>
                                <p className="full-width flex-start">Your list of destinations and activities for your travel research</p>
                            </div>

                            <ul className="flex flex-start flex-wrap full-width feat6 for-mobile relative">
                                {
                                    data.destinations?.map((item) =>

                                        <li key={item.id} className="flex">

                                            <Link href={`destination/${item.id}/${parse(item.name).replace(/\//g, "")}`}>

                                                <img src={`${host}${item.image}`} fill sizes="100%" alt=""/>

                                                <div className="info">
                            
                                                    <div className="name">
                                                        <div>{parse(item.name)}</div>
                                                    </div>

                                                    <div className="foot">
                                                        
                                                        <p>
                                                            <span>{parse(item.description)}</span>
                                                        </p>

                                                        <div>

                                                            <div>{item.products} tours</div>

                                                            <div>Read more</div>

                                                        </div>

                                                    </div>
                            
                                                </div>
                            
                                            </Link>

                                        </li>

                                    )
                                }
                                
                            </ul>

                        </div>
                    }
                </main>

                <Footer settings={settings}/>

            </div>

        </Fragment>

    )

}
