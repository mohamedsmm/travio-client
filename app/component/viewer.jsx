"use client"
import { Fragment, useEffect, useState } from "react";
import { host } from "@/public/script/public";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from "jquery";

export default function Viewer({ images, title, swiper, setSwiper }) {

    const [index, setIndex] = useState(0);

    const change_slide = ( index, move=true ) => {

        setIndex(index+1);
        if ( move ) swiper.slideTo(index);
        let left = 160 * index - 160 * 4;
        if ( $(window).width() < 800 ) left = 160 * index - 160;
        $(".small-image").scrollLeft(left);
        $(".small-image").find('.image').removeClass('active');
        $($(".small-image").find(".image")[index]).addClass('active');
        $("video").each(function(){ this.pause(); });

    }
    return (

        <Fragment>

            <div className="media-show fixed flex-column full-width full-height hide">

                <div className="first flex-space full-width">

                    <h1 title={title}>{title || 'Media Viewer'}</h1>

                    <div className="close circle flex pointer" title="Close" 
                        onClick={_ => { $(".media-show").fadeOut(100).hide(); $("video").each(function(){ this.pause(); }); }}>
                        <span className="material-symbols-outlined go-icon">close</span>
                    </div>

                </div>

                <div className="shower full-width flex-column">

                    <div className="flex media-slider relative full-width">

                        <Swiper modules={[Navigation, Pagination, Autoplay]} speed={500} navigation={true} 
                            onSlideChange={_ => change_slide(_.realIndex, false)} onSwiper={setSwiper}>
                            {
                                images && images.map((image, index) =>
                                    <SwiperSlide key={index}>
                                        {
                                            image.type === "image" ? <img src={`${host}${image.url}`} style={{ width: 'auto', height: 'auto' }}/> : 
                                            image.type === "iframe" ? <iframe src={image.url} allowFullScreen></iframe> : 
                                            <video src={`${host}${image.url}`} controls></video>
                                        }
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>

                        <div className="count flex absolute no-select">
                            <span className="current">{index}</span> / {images ? images.length: 0}
                        </div>
                        
                    </div>

                    <div className="small-image full-width">
                        {
                            images && images.map((image, index) =>

                                <div key={index} className={`image layer ${index === 0 && 'active'}`} onClick={_ => change_slide(index)}>

                                    {
                                        image.type === "image" ? <img src={`${host}${image.url}`}/> : 
                                        image.type === "iframe" ? <iframe src={image.url} allowFullScreen></iframe> : 
                                        <video src={`${host}${image.url}`} controls></video>
                                    }

                                    <div className="div"></div>

                                </div>

                            )
                        }
                    </div>

                </div>

            </div>

        </Fragment>

    )

}
