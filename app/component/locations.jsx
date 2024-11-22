"use client";
import { Fragment, useEffect } from "react";
import { host, parse } from "@/public/script/public";
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Locations ({ data }) {

    useEffect(() => {
        
        $(".loader").fadeOut(500);

    }, []);

    return (

        <Fragment>

            <ul className="flex flex-start flex-wrap full-width feat6 for-mobile relative">

                {
                    data ? data.map((item) =>

                        <li key={item.id} className="flex">

                            <Link href={`destination/${item.id}/${parse(item.name).replace(/\//g, "")}`}>

                                <img src={`${host}${item.image}`}/>

                                <div className="info">
            
                                    <div className="name">
                                        <div>
                                            {parse(item.name)}
                                        </div>
                                    </div>

                                    <div className="foot">
                                        
                                        <p>
                                            <span>
                                                {parse(item.description)}
                                            </span>
                                        </p>

                                        <div>

                                            <div>{item.products} tours</div>

                                            <div>Read more</div>

                                        </div>

                                    </div>
            
                                </div>
            
                            </Link>

                        </li>

                    ) : ''
                }
    
                <div className="loader fill"></div>

            </ul>

            <div className="tour-slider feat6 full-width for-mobile hide">

                <Swiper modules={[Navigation, Autoplay]} spaceBetween={15} autoplay={{delay: 5000}} speed={500} navigation={true}
                    breakpoints={{ 0: {slidesPerView: 1.2}, 500: {slidesPerView: 2}, 748: {slidesPerView: 3}, 1200: {slidesPerView: 3} }}>

                    {
                        data && data.map((item, index) => 

                            <SwiperSlide key={index}>

                                <Link href={`destination/${item.id}/${parse(item.name).replace(/\//g, "")}`}>

                                    <img src={`${host}${item.image}`}/>

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

                            </SwiperSlide>

                        )
                    }

                </Swiper>

            </div>

        </Fragment>
        
    )

}
