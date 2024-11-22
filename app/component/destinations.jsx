"use client";
import { Fragment, useEffect } from "react";
import { host } from "@/public/script/public";
import Image from 'next/image';
import Link from "next/link";
import $ from "jquery";

export default function Destinations ({ data }) {

    useEffect(() => {
        
        $(".loader").fadeOut(500);

    });

    return (

        <Fragment>

            <ul className="flex-wrap full-width feat5 relative">
    
                <div className="loader fill"></div>

                {
                    data ? data.map((item) =>

                        <li key={item.id} className="flex">

                            <Link href={`destination/${item.id}/${item.name.replace(/\//g, "")}`} className="full-width flex-start relative align-start">

                                <div className="image">

                                    {/* <Image src={`${host}${item.image}`} fill sizes="100%" alt=""/> */}
                                    <img src={`${host}${item.image}`}/>

                                </div>
            
                                <div className="flex-column full-width full-height">
            
                                    <p>{item.name}</p>
            
                                    <span>{item.products} Tours and Activities</span>
            
                                </div>
            
                            </Link>

                        </li>

                    ) : null
                }
    
            </ul>

        </Fragment>
        
    )

}
