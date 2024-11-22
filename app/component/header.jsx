"use client";
import Calendar from "@/app/component/calendar";
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import $ from "jquery";
import { fix_number } from "@/public/script/public";

export default function Header ({ settings }) {

    const router = useRouter();

    const reset = () => {
        $(".search-form1 .date").text("Select Date").attr("date", '');
        $(".reset-p").hide();
    }
    const search = () => {

        let query = $(".search-form1 .text").val().trim();
        let date = $(".search-form1 .date").attr('date') || '';
        if ( query && date ) router.push(`/search/?query=${query}&date=${date}`);
        else if ( query ) router.push(`/search/?query=${query}`);
        else if ( date ) router.push(`/search/?date=${date}`);

    }
    return (

        <header>

            <div className="header-sliders">
                <Swiper modules={[Pagination, Autoplay]} pagination={{clickable: true}} autoplay={{delay: 5000}} speed={500} loop={true} className="header-slider">
                    <SwiperSlide key={1}>
                        <Image src="/media/image/header/1.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                    <SwiperSlide key={2}>
                        <Image src="/media/image/header/2.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                    <SwiperSlide key={3}>
                        <Image src="/media/image/header/3.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="header-sliders smaller">
                <Swiper modules={[Pagination, Autoplay]} pagination={{clickable: true}} autoplay={{delay: 5000}} speed={500} loop={true} className="header-slider">
                    <SwiperSlide key={1}>
                        <Image src="/media/image/header/4.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                    <SwiperSlide key={2}>
                        <Image src="/media/image/header/5.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                    <SwiperSlide key={3}>
                        <Image src="/media/image/header/6.png" fill priority sizes="100%" alt=""/>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="search-form1 flex">

                <main className="flex">

                    <div className="flex-column form">

                        <h1>Do more with {settings.name}</h1>

                        <h2>One site, {fix_number(settings.tours_count)}+ experiences you'll remember.</h2>

                        <div className="data-input">

                            <div className="field" onClick={_ => $('.search-form1 .text').focus()}>

                                <span>Where to ?</span>

                                <input type="text" placeholder="Search for a place or activity" className="text" onKeyUp={_ => _.key === 'Enter' ? search() : ''}/>

                            </div>

                            <hr className="sep"/>

                            <div className="field show-calendar">

                                <span>When</span>

                                <p className="full-width flex-start date">Select Date</p>

                                <i className="fa fa-times reset-p absolute" onClick={reset}></i>

                            </div>

                            <div className="search-icon" onClick={search} title="Search">
                                <span className="material-symbols-outlined">search</span>
                            </div>

                            <Calendar />

                        </div>

                    </div>

                </main>

            </div>

        </header>

    )

}
