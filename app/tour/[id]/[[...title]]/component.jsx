"use client"
import { get_session, host, set_session, check_class, date, position, parse, print } from "@/public/script/public";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Calendar from "@/app/component/calendar";
import Footer from "@/app/component/footer";
import Tours from "@/app/component/tours";
import Stars from "@/app/component/stars";
import Reviews from "@/app/component/reviews";
import Viewer from "@/app/component/viewer";
import { Fragment, useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/navigation";
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Tour({ data, tours, settings }) {

    const [swiper, setSwiper] = useState('');
    const [swiper1, setSwiper1] = useState('');
    const router = useRouter();
    const [adults, setAdults] = useState(2);
    const [time, setTime] = useState('');
    const [favore, setFavore] = useState(false);
    let discount = Math.round((data.old_price - data.new_price) / data.old_price * 100);
    discount = discount < 10 ? `0${discount}` : discount;

    const check = _ => {

        // if ( $(window).width() < 1025 ) $('.main-container').scrollTop(400);
        // else $('.main-container').scrollTop(0);
        $('.main-container').scrollTop(600);
        $(".button").addClass('active');
        $(".info-data .availability").show();
        $(".info-data .availability .loader").css("display", "flex");
        setTimeout( _ => {
            $(".info-data .availability .loader").hide();
            $(".main-container").find(".check-availability").hide();
            $(".main-container").find(".book-now").show();
        }, 700);

    }
    const book = () => {

        data.book_date = $(".tour .check .date").attr('date');
        data.book_time = time || (data.times ? JSON.parse(data.times)[0] : '00:00');
        data.adults = adults;
        data.cancellation = 'Free Cancellation in 24 hours.';
        data.pick_up = '';
        set_session('tour', data, false);
        $(".main-container").find(".input-loader").css("display", "flex");
        router.push('/checkout');

    }
    const add_favore = () => {

        let favorites_ = get_session('wishlist') || [];
        favorites_.push(data.id);
        favorites_ = favorites_.filter((item, index) => favorites_.indexOf(item) === index);
        set_session('wishlist', favorites_);
        if ( !favorites_.length ) $('nav .wishlist-count').hide().find('div').text(0);
        else $('nav .wishlist-count').css('display', 'flex').find('div').text(favorites_.length);
        setFavore(true);

    }
    const del_favore = () => {

        let favorites_ = get_session('wishlist') || [];
        favorites_ = favorites_.filter(_ => _ !== data.id);
        set_session('wishlist', favorites_);
        if ( !favorites_.length ) $('nav .wishlist-count').hide().find('div').text(0);
        else $('nav .wishlist-count').css('display', 'flex').find('div').text(favorites_.length);
        setFavore(false);
        
    }
    const change_slide = ( index, move=true ) => {

        if ( move ) swiper.slideTo(index);
        $(".left").find('.image').removeClass('active');
        $($(".left").find(".image")[index]).addClass('active');
        $("video").each(function(){ this.pause(); });

    }
    useEffect(() => {

        $(".availability").on("click", ".time-div:not(.none)", function(){
            $(".availability .time-div").removeClass("active");
            $(this).addClass("active");
        });
        $(".show .check .show-adult").on("click", function(){
    
            let width = $(this).outerWidth();
            $(".tour .adult").css({"width": width});
            $(".tour .adult").css({"top": position(this, "top") + $(this).outerHeight() + 2});
            if ( $(window).width() < 1024 ) {
                $(".tour .adult").css({"left": position(this, "left")});
                $(".main-container").scrollTop(400);
            }
            if ( $(window).width() < 600 ) {
                $(".tour .adult").css({"left": 0});
                $(".main-container").scrollTop(400);
            }
            $(".tour .adult").css({"transform": "scale(0)", "transition": "all .2s linear"});
            $(".tour .adult").css("display", "flex");
            setTimeout( _ => $(".tour .adult").css("transform", "scale(1)"));
    
        });
        $(".info-data .left").on("click", ".first", function(){
    
            if ( $(this).parents(".section").hasClass("active") ) {
                $(this).parents(".section").find("ul").slideUp(200);
                setTimeout( _ => {
                    $(this).parents(".section").find("ul").hide();
                    $(this).parents(".section").removeClass("active");
                }, 200);
            }
            else {
                $(this).parents(".section").addClass("active");
                $(this).parents(".section").find("ul").slideDown(200).css("display", "flex");
            }
    
        });
        $(".tour .adult .apply").on("click", function(){
            $(".tour .adult").css("transform", "scale(0)");
            setTimeout( _ => { $(".tour .adult").hide(); }, 150);
        });
        $(document).on('click', function(e){
            if ( !check_class(e.target, "show-adult") && !check_class(e.target, "adult") ){
                $(".tour .adult").css("transform", "scale(0)");
                setTimeout( _ => { $(".tour .adult").hide(); }, 150);
            }
        });
        $(".main-container").on("scroll", function(){
            if ( $(this).scrollTop() > 600 ) $(".fixed-check-button").fadeIn(200).css('display', 'flex');
            else $(".fixed-check-button").fadeOut(200);
        });
        $(".show .left").on("click", ".more", function(){
            $('.show .right .more').click();
        });

        let all_favorites = get_session('wishlist') || [];
        if ( all_favorites.includes(data.id) ) setFavore(true);

    }, []);

    return (

        <Fragment>

            <Nav searchbox settings={settings}/> <Chat settings={settings}/>

            <Viewer images={data.images} title={parse(data.name)} swiper={swiper1} setSwiper={setSwiper1}/>

            <div className="main-container relative">

                <main className="flex-column tour">

                    <div className="keys full-width flex-space flex-wrap align-start">

                        <div className="keywords">

                            <Link href="/">Home</Link>
                            <Link href="/">Ethiopia</Link>
                            <Link href="/">Addis Ababa</Link>
                            <Link href="/">Ababa Tours</Link>
                            <Link href="/">Sightseeing - Cruises</Link>

                        </div>

                        <div className="contact flex-column">

                            <div className="phone flex-start full-width">
                            <span className="material-symbols-outlined icon">live_help</span>
                                <p className="default">
                                    Book online or call : &nbsp;
                                    <a className="pointer phone-number" href={`tel:${data.phone}`}>{data.phone}</a>
                                </p>
                            </div>

                            <div className="message flex-start full-width show-chat">
                                <span className="material-symbols-outlined icon">chat</span>
                                <span className="chat pointer">Chat Now</span>
                            </div>

                        </div>

                    </div>

                    {
                        data.pay_later ? 
                        <div className="banner-offer full-width flex flex-start">
                            <p>Reverse Now & Pay Later</p>
                        </div> : ''
                    }

                    <div className="title full-width flex-start">{parse(data.name)}</div>

                    <div className="actions full-width flex-space">

                        <div className="flex flex-start">

                            <div className="replys flex-start pointer" onClick={_ => $(".reviews")[0].scrollIntoView()}>

                                <Stars count={data.rate || 5}/>

                                <span>{data.reviews} Reviews</span>

                            </div>

                            <div className="attraction">
                                <span>{parse(data.location)}</span>
                            </div>

                        </div>

                        {
                            favore ?
                            <div className="add-wishlist flex-end pointer favor del" onClick={del_favore}>
                                <i className="fa fa-heart"></i>
                                <span>Saved</span>
                            </div> :
                            <div className="add-wishlist flex-end pointer favor add" onClick={add_favore}>
                                <i className="fa fa-heart-o"></i>
                                <span>Favore</span>
                            </div>
                        }

                    </div>

                    <div className="show flex-space full-width">

                        <div className="slider relative">

                            <div className="left tour-pagination">
                                {
                                    data.images.slice(0, 5).map((image, index) =>

                                        <div key={index} className={`image ${index === 0 && 'active'}`} onClick={_ => change_slide(index)}>

                                            {
                                                image.type === "image" ? <img src={`${host}${image.url}`}/> : 
                                                image.type === "iframe" ? <iframe src={image.url} allowFullScreen></iframe> : 
                                                <video src={`${host}${image.url}`} controls></video>
                                            }

                                            <div className="div"></div>

                                            { index === 4 && data.images.length > 5 ? <div className="more"><span>See More</span></div> : null }

                                        </div>

                                    )
                                }
                                {
                                    data.images.length < 5 && 
                                    Array.from(Array(5 - data.images.length)).map((item, index) => <div key={index} className="image none"></div>)
                                }
                            </div>

                            <div className="right relative">

                                <Swiper modules={[Navigation, Pagination, Autoplay]} speed={500} navigation={true} 
                                    onSwiper={setSwiper} onSlideChange={_ => change_slide(_.realIndex, false)}>
                                    {
                                        data.images.slice(0, 5).map((image, index) =>
                                            <SwiperSlide key={index} onClick={_ => { image.type === "image" && $(".media-show").fadeIn(100).css("display", "flex"); swiper1.slideTo(index) }}>
                                                {
                                                    image.type === "image" ? <img src={`${host}${image.url}`}/> : 
                                                    image.type === "iframe" ? <iframe src={image.url} allowFullScreen></iframe> : 
                                                    <video src={`${host}${image.url}`} controls></video>
                                                }
                                                { index == 4 && data.images.length > 5 ? <div className="more"><button>See More</button></div> : null }
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>

                                {
                                    data.old_price > data.new_price &&
                                    <div className="discount1">
                                        <img src="/media/image/public/coupon.png"/>
                                        <div>
                                            <span>Hot</span>
                                            <span>{discount}%</span>
                                        </div>
                                    </div>
                                }
                            
                            </div>

                        </div>

                        <div className="check flex-column relative">

                            <Calendar />

                            <div className="price full-width flex-start">
                                From <span>${data.new_price}</span>
                                { data.old_price > data.new_price && <span className="old-price">${ data.old_price }</span> }
                            </div>

                            <hr className="full-width flex"/>

                            <h1 className="full-width flex-start">Select Date and Travelers</h1>

                            <div className="inputs full-width flex-start">

                                <div className="input pointer full-width flex-start date-input show-calendar">
                                    <span className="material-symbols-outlined icon small">calendar_today</span>
                                    <p className="full-width flex-start date date_"></p>
                                </div>

                                <div className="input pointer full-width flex-start number-input show-adult">
                                    <span className="material-symbols-outlined icon">person</span>
                                    <p className="full-width flex-start">{adults} Adults</p>
                                </div>

                                <div className="full-width relative hide availability">

                                    <select className="input pointer full-width flex-start avialable-times" onChange={_ => setTime(_.target.value)}>
                                        {
                                            data.times ? JSON.parse(data.times)?.map((item, index) =>
                                                <option key={index} value={item}>{item}</option> 
                                            ) : ''
                                        }
                                    </select>

                                    <div className="loader fill input-loader"></div>

                                </div>

                                <div className="button full-width flex relative">
                                    <button className="full-width pointer check-availability" onClick={check}>Check Availability</button>
                                    <button className="full-width pointer hide book-now" onClick={book}>Book Now</button>
                                    <div className="loader fill input-loader small hide"></div>
                                </div>

                            </div>

                            <div className="full-width flex-column tell">

                                {
                                    data.allow_cancel ?
                                    <div className="full-width flex-start align-start">
                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.35 8.35a.5.5 0 00-.7-.7L9 11.29 7.35 9.65a.5.5 0 10-.7.7l2 2c.2.2.5.2.7 0l4-4z"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-7 8a7 7 0 1114 0 7 7 0 01-14 0z"></path>
                                        </svg>
                                        <p className="full-width left-text">
                                            <span>Free cancellation</span> up to 24 hours before the experience starts (local time)
                                        </p>
                                    </div> : ''
                                }
                                {
                                    data.pay_later ?
                                    <div className="full-width flex-start align-start">
                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 12.45V7h13v.6c.36.18.7.4 1 .66v-3.7C17 3.67 16.28 3 15.42 
                                                3H3.58C2.72 3 2 3.68 2 4.55v7.9c0 .87.72 1.55 1.58 1.55H8.2c-.1-.32-.16-.66-.19-1H3.58a.57.57 0 01-.58-.55zM3.58 
                                                4a.57.57 0 00-.58.55V6h13V4.55c0-.3-.25-.55-.58-.55H3.58z">
                                            </path>
                                            <path d="M4.5 10a.5.5 0 000 1h3a.5.5 0 000-1h-3zM13.5 10c.28 0 .5.22.5.5V12h1.5a.5.5 0 010 1h-2a.5.5 0 01-.5-.5v-2c0-.28.22-.5.5-.5z"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9 12.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM13.5 9a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path>
                                        </svg>
                                        <p className="full-width left-text">
                                            <span>Reserve Now & Pay Later</span> Secure your spot while staying flexible
                                        </p>
                                    </div> : ''
                                }

                            </div>

                            <div className="adult absolute flex-column hide">

                                <h6 className="full-width flex-start">Up to {data.max_persons} travelers in total.</h6>

                                <div className="flex-space full-width">

                                    <div className="flex-column full-width">
                                        <p className="full-width flex-start">Adults</p>
                                        <p className="full-width flex-start">Minimum: 0, Maximum: {data.max_persons}</p>
                                    </div>

                                    <div className="input-num flex no-select">

                                        <div className="flex pointer decrease" onClick={_ => adults > 1 ? setAdults(adults-1) : null}>
                                            <span className="material-symbols-outlined go-icon">remove</span>
                                        </div>

                                        <label className="flex">{adults}</label>

                                        <div className="flex pointer increase" onClick={_ => adults < data.max_persons ? setAdults(adults+1) : null}>
                                            <span className="material-symbols-outlined go-icon">add</span>
                                        </div>

                                    </div>

                                </div>

                                <button className="apply pointer" onClick={check}>Apply</button>

                            </div>

                        </div>

                    </div>

                    <div className="info-data flex-start align-start full-width">

                        <div className="left flex-column">

                            <div className="flex-column full-width section">

                                <div className="first full-width flex-space pointer">

                                    <h1 className="full-width flex-start">Addis Ababa Tours</h1>

                                    <i className="fa fa-angle-down"></i>

                                </div>

                                <ul className="full-width flex-column">

                                    <a href="/tour" className="pointer">All Addis Ababa Tours</a>
                                    <a href="/tour" className="pointer">Art & Culture</a>
                                    <a href="/tour" className="pointer">Audio Guides</a>
                                    <a href="/tour" className="pointer">Classes & Workshops</a>
                                    <a href="/tour" className="pointer">Food & Drink</a>
                                    <a href="/tour" className="pointer">Outdoor Activities</a>

                                </ul>

                            </div>

                            <div className="flex-column full-width section">

                                <div className="first full-width flex-space pointer">

                                    <h1 className="full-width flex-start">Attractions</h1>

                                    <i className="fa fa-angle-down"></i>

                                </div>

                                <ul className="full-width flex-column">

                                    <a href="/tour" className="pointer">All Addis Ababa Tours</a>
                                    <a href="/tour" className="pointer">Art & Culture</a>
                                    <a href="/tour" className="pointer">Audio Guides</a>
                                </ul>

                            </div>

                            <div className="flex-column full-width section">

                                <div className="first full-width flex-space pointer">

                                    <h1 className="full-width flex-start">Recommendations</h1>

                                    <i className="fa fa-angle-down"></i>

                                </div>

                                <ul className="full-width flex-column">

                                    <a href="/tour" className="pointer">All Addis Ababa Tours</a>
                                    <a href="/tour" className="pointer">Art & Culture</a>
                                    <a href="/tour" className="pointer">Audio Guides</a>
                                </ul>

                            </div>

                            <div className="flex-column full-width section no-border">

                                <div className="first full-width flex-space pointer no-border">

                                    <h1 className="full-width flex-start">Nearby</h1>

                                    <i className="fa fa-angle-down"></i>

                                </div>

                                <ul className="full-width flex-column">

                                    <a href="/tour" className="pointer">All Addis Ababa Tours</a>
                                    <a href="/tour" className="pointer">Art & Culture</a>
                                    <a href="/tour" className="pointer">Audio Guides</a>
                                </ul>

                            </div>

                        </div>

                        <div className="right flex-column">

                            <div className="availability full-width flex relative hide">

                                <ul className="list flex-column full-width">

                                    <li className="full-width flex-space align-start">
                                    
                                        <div className="flex-column full-width">
                                            <h1 className="full-width flex-start left-text title">{parse(data.name)}</h1>
                                            <div className="times full-width flex-wrap flex-start">
                                                {
                                                    data.times ? JSON.parse(data.times)?.map((item, index) =>
                                                        <div key={index} className={`time-div flex pointer no-select ${!index ? 'active' : ''}`} onClick={_ => setTime(item)}>
                                                            <span>{parseInt(item.split(":")[0]) > 12 ? `${item} PM`: `${item} AM`}</span>
                                                        </div>

                                                    ) : ''
                                                }
                                            </div>
                                        </div>

                                        <div className="flex-column">
                                            <div className="full-width flex-end prices">
                                                <h1 className="price">${parseFloat(data.new_price * adults).toFixed(2)}</h1>
                                                <p className="adults">{adults} Adults x ${data.new_price}</p>
                                            </div>
                                            <div className="buttons full-width flex-column relative">
                                                <button className="book-now flex pointer" onClick={book}>Book Now</button>
                                                <div className="loader fill input-loader small hide"></div>
                                            </div>
                                        </div>

                                    </li>

                                </ul>

                                <div className="loader full-width flex"><div className="load"></div></div>

                            </div>

                            <div className="offers flex-space full-width">

                                <p className="flex">
                                    <svg width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 6.75a.75.75 0 00-1.5 0v5.5c0 .41.34.75.75.75h4.75a.75.75 0 000-1.5h-4V6.75z"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM3.5 12a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z"></path>
                                    </svg>
                                    <span>Today's (approx.)</span>
                                </p>

                                <p className="flex">
                                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.75 2A2.75 2.75 0 006 4.75v14.5A2.75 2.75 0 008.75 22h6.5A2.75 2.75 
                                            0 0018 19.25V4.75A2.75 2.75 0 0015.25 2h-6.5zm7.75 14.5V4.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 
                                            1.25V16.5h9zm-9 1.5h9v1.25c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25V18z">
                                        </path>
                                    </svg>
                                    <span>Mobile ticket</span>
                                </p>

                                <p className="flex">
                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 13a.5.5 0 100-1 .5.5 0 000 1zM11 12.5a.5.5 0 11-1 0 .5.5 0 011 0zM6.5 13a.5.5 0 100-1 .5.5 0 000 1z"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 2a2.5 2.5 0 00-2.45 2H4a2 2 0 00-2 2v8c0 1.1.9 2 2 
                                            2h1v1.5a.5.5 0 00.75.43L9.13 16H14a2 2 0 002-2v-1.05a2.5 2.5 0 002-2.45v-6A2.5 2.5 0 
                                            0015.5 2h-9zM14 4H5.09c.2-.58.76-1 1.41-1h9c.83 0 1.5.67 1.5 1.5v6c0 .65-.42 1.2-1 1.41V6a2 2 0 00-2-2zM4 5a1 1 
                                            0 00-1 1v8a1 1 0 001 1h2v1.64L8.87 15H14a1 1 0 001-1V6a1 1 0 00-1-1H4z">
                                        </path>
                                    </svg>
                                    <span>Offered in English</span>
                                </p>
                                {
                                    data.pay_later ? 
                                    <p className="flex">
                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 12.45V7h13v.6c.36.18.7.4 1 .66v-3.7C17 3.67 16.28 3 15.42 
                                                3H3.58C2.72 3 2 3.68 2 4.55v7.9c0 .87.72 1.55 1.58 1.55H8.2c-.1-.32-.16-.66-.19-1H3.58a.57.57 0 01-.58-.55zM3.58 
                                                4a.57.57 0 00-.58.55V6h13V4.55c0-.3-.25-.55-.58-.55H3.58z">
                                            </path>
                                            <path d="M4.5 10a.5.5 0 000 1h3a.5.5 0 000-1h-3zM13.5 10c.28 0 .5.22.5.5V12h1.5a.5.5 0 010 1h-2a.5.5 0 01-.5-.5v-2c0-.28.22-.5.5-.5z"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9 12.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM13.5 9a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path>
                                        </svg>
                                        <span>Reserve - Pay Later</span>
                                    </p> : ''
                                }

                            </div>
                            
                            {
                                data.details !== '<p><br></p>' &&
                                <div className="overview full-width flex-column">
                                    <h1 className="full-width flex-start">Overview</h1>
                                    <div className="data full-with left-text" dangerouslySetInnerHTML={{ __html: parse(data.details) }}></div>
                                </div>
                            }
                            {
                                data.includes ?
                                <div className="include full-width flex-column">

                                    <h1 className="full-width flex-start">What's Included</h1>

                                    <ul className="full-width flex-wrap">
                                        {
                                            typeof(parse(data.includes)) === 'object' && parse(data.includes)?.map((item, index) =>
                                                <li key={index} className="full-width flex-start">
                                                    <i className="fa fa-check"></i>
                                                    <span dangerouslySetInnerHTML={{ __html: item }}></span>
                                                </li>
                                            )
                                        }
                                    </ul>

                                </div> : ''
                            }
                            {
                                data.expected ?
                                <div className="expect full-width flex-column">

                                    <h1 className="full-width flex-start"> What To Expect </h1>

                                    <ul className="full-width flex-column">
                                        {
                                            typeof(parse(data.expected)) === 'object' && parse(data.expected)?.map((item, index) =>

                                                <li key={index} className="flex-column full-width">

                                                    <div className="head flex-start full-width">

                                                        <div className="count flex circle default no-select">{index+1}</div>

                                                        <h2 className="flex-start left-text default">{item.title}</h2>

                                                    </div>

                                                    <div className={`content ${index === parse(data.expected).length - 1 ? "no-border": null}`}>

                                                        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>

                                                        <span>{item.date}</span>

                                                    </div>

                                                </li>

                                            )
                                        }
                                    </ul>

                                </div> : ''
                            }
                            {
                                data.meeting !== '<p><br></p>' &&
                                <div className="meeting full-width flex-column">
                                    <h1 className="full-width flex-start">Meeting & Pick up</h1>
                                    <div className="data full-with left-text" dangerouslySetInnerHTML={{ __html: parse(data.meeting) }}></div>
                                </div>
                            }
                            {
                                data.policy !== '<p><br></p>' &&
                                <div className="policy full-width flex-column">
                                    <h1 className="full-width flex-start">Cancellation Policy</h1>
                                    <div className="data full-with left-text" dangerouslySetInnerHTML={{ __html: parse(data.policy) }}></div>
                                </div>
                            }
                            {
                                data.more_info !== '<p><br></p>' &&
                                <div className="additional full-width flex-column">
                                    <h1 className="full-width flex-start">Additional Info</h1>
                                    <div className="data full-with left-text" dangerouslySetInnerHTML={{ __html: parse(data.more_info) }}></div>
                                </div>
                            }

                            <Reviews stars={data.rate || 5} length={data.reviews} />

                            {
                                tours.length > 0 &&
                                <div className="main flex-column full-width no-border">
                    
                                    <h1 className="title full-width flex-start">Recommended</h1>
                        
                                    <Tours data={tours} cards={3}/>
                        
                                </div>
                            }
                                
                        </div>

                    </div>

                </main>

                <div className="fixed-check-button">

                    <main className="flex flex-end">

                        <div className="flex flex-column">
                            <div className="adults">{adults} Adults x ${data.new_price}</div>
                            <div className="price"><span>${parseFloat(data.new_price * adults).toFixed(2)}</span></div>
                        </div>

                        <div className="flex relative button">
                            <button className="check-availability" onClick={check}>Check Availability</button>
                            <button className="book-now hide" onClick={book}>Book Now</button>
                            <div className="loader fill input-loader small hide"></div>
                        </div>

                        <div className="flex">
                            {
                                favore ?
                                <div className="favor del" onClick={del_favore}><i className="fa fa-heart"></i></div> :
                                <div className="favor add" onClick={add_favore}><i className="fa fa-heart-o"></i></div>
                            }
                        </div>

                    </main>

                    <main className="flex flex-column for-mobile">

                        <div className="full-width flex flex-start">

                            <div className="flex">
                                {
                                    favore ?
                                    <div className="favor del" onClick={del_favore}><i className="fa fa-heart"></i></div> :
                                    <div className="favor add" onClick={add_favore}><i className="fa fa-heart-o"></i></div>
                                }
                            </div>

                            <div className="flex flex-column">
                                <div className="adults">{adults} Adults x ${data.new_price}</div>
                                <div className="price"><span>${parseFloat(data.new_price * adults).toFixed(2)}</span></div>
                            </div>
                            
                        </div>

                        <div className="full-width flex flex-start">
                            <div className="flex relative button">
                                <button className="check-availability" onClick={check}>Check Availability</button>
                                <button className="book-now hide" onClick={book}>Book Now</button>
                                <div className="loader fill input-loader small hide"></div>
                            </div>
                        </div>

                    </main>

                </div>

                <Footer page="Tour" settings={settings}/>

            </div>

        </Fragment>

    )

}
