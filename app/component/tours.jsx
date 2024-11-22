"use client";
import { useEffect } from "react";
import Card from "@/app/component/card";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import $ from "jquery";

export default function Tours ({ data, cards }) {

    useEffect(() => {
        
        $(".loader").fadeOut(500);

    });
    
    return (

        <div className="tour-slider relative">

            <div className="loader fill cards-loader"></div>

            <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={cards || 4}
                autoplay={{delay: 5000}} speed={500} loop={false} navigation={true}
                breakpoints={{ 0: {slidesPerView: 1.4}, 500: {slidesPerView: 2}, 748: {slidesPerView: 3}, 1200: {slidesPerView: cards || 4} }}>

                { data && data.map((item, index) => <SwiperSlide key={index}><Card data={item}/></SwiperSlide>) }

            </Swiper>

        </div>
        
    )

}
