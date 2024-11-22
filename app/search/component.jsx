"use client"
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import Calendar from "@/app/component/calendar";
import Stars from "@/app/component/stars";
import { Fragment, useEffect, useState } from "react";
import { host, fix_number, api, get_session, position, parse } from "@/public/script/public";
import Link from "next/link";
import Image from "next/image";
import $ from "jquery";

export default function Search({ tours, query, date, settings }) {

    const [result, setResult] = useState(tours);
    let stars = [];
    let durations = [];
    let popularity = [];
    let specials = [];
    let calendar_date = '';
    let type = '';

    const favorites = () => {

        let all_favorites = get_session('wishlist') || [];
        all_favorites = all_favorites.filter((item, index) => all_favorites.indexOf(item) === index);
        if ( all_favorites.length ) $('nav .wishlist-count').css('display', 'flex').find('div').text(all_favorites.length);
    
        $('.tour-card').each(function(){
            if ( all_favorites.includes(parseInt($(this).attr('data-id'))) ) {
                $(this).find('.favor.add').hide();
                $(this).find('.favor.del').css('display', 'flex');
            }
        });
    
    }
    const filter = async () => {
        
        $(".result").hide();
        $(".loader").css('display', 'flex');
        setResult([]);
        let filters = {
            stars: stars,
            durations: durations,
            popularity: popularity,
            specials: specials,
            date: calendar_date,
            type: type
        };
        const data = await api('search', {text: query, date: date, filters: JSON.stringify(filters)});
        setResult(data.tours || []);
        setTimeout(favorites, 100);
        $(".loader").hide();
        $(".result").fadeIn(500);

    }
    const show_filters = () => {

        $(".chat-icon").hide();
        $(".search-box .left").fadeIn(200).css('display', 'flex');
        $(".search-box .left .side").scrollTop(0);

    }
    const hide_filters = () => {

        $(".main-container").scrollTop(0);
        $(".search-box .left").fadeOut(200);
        $(".chat-icon").show();

    }
    useEffect(() => {
        
        $("nav .search-div input").val(query);
        $(".loader").hide();
        $(".result").fadeIn(500);

        $(".left ul.filter-stars").on("click", "li", function(){
            if ( $(this).find(".checkbox").hasClass("active") ) return;
            $(".filter-stars").find("li .checkbox").removeClass("active");
            $(this).find(".checkbox").addClass("active");
            let number = parseInt($(".filter-stars .checkbox.active").parents("li").attr("id"));
            stars = [number];
            filter();
        });
        $(".left ul.filter-popularity").on("click", "li", function(){
            let id = $(this).attr("id");
            popularity = popularity.filter(_ => _ !== id);
            if ( !$(this).find(".checkbox").hasClass("active") ) popularity.push(id);
            $(this).find(".checkbox").toggleClass("active");
            filter();
        });
        $(".left ul.filter-duration").on("click", "li", function(){
            let id = $(this).attr("id");
            durations = durations.filter(_ => _ !== id);
            if ( !$(this).find(".checkbox").hasClass("active") ) durations.push(id);
            $(this).find(".checkbox").toggleClass("active");
            filter();
        });
        $(".left ul.filter-specials").on("click", "li", function(){
            let id = $(this).attr("id");
            specials = specials.filter(_ => _ !== id);
            if ( !$(this).find(".checkbox").hasClass("active") ) specials.push(id);
            $(this).find(".checkbox").toggleClass("active");
            filter();
        });
        $(".calendar").on("click", ".list-days li:not(.none):not(.active)", function(){
            calendar_date = $(".calendar").attr("base_date");
            filter();
        });
        $(".actions select").on("change", function(){
            type = $(this).val();
            filter();
        });

    }, []);

    return (

        <Fragment>

            <Nav searchbox settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">

                <main className="search-box">
                    {

                        tours.length ?

                        <div className="full-width">

                            <div className="keys full-width flex-space flex-wrap align-start">

                                <div className="keywords">

                                    <Link href="/">Home</Link>
                                    <Link href="/">Ethiopia</Link>
                                    <Link href="/">Addis Ababa</Link>
                                    <Link href="/">Ababa Tours</Link>
                                    <Link href="/">Sightseeing - Cruises</Link>

                                </div>

                            </div>

                            <div className="title full-width flex-start">
                                Showing results founded {fix_number(result.length)}&nbsp;
                                results for &nbsp; - &nbsp; {query || null} {date ? `- ${date}` : null}
                            </div>

                            <div className="main-div flex-space full-width align-start relative">

                                <div className="left flex-start relative">

                                    <div className="side flex-column">

                                        <div className="heading full-width flex-start default">

                                            <i className="fa fa-filter"></i> <span className="noselect">FILTERING</span>

                                        </div>

                                        <div className="contains full-width flex flex-column relative">

                                            <div className="filters-inputs full-width flex flex-column">
                                            
                                                <ul className="full-width flex-column no-border">

                                                    <li className="flex-start full-width cal">
                                                        <div className="input pointer full-width flex-start date-input show-calendar">
                                                            <i className="fa fa-calendar"></i>
                                                            <p className="full-width flex-start date">Select Date</p>
                                                        </div>
                                                    </li>

                                                </ul>

                                                <ul className="full-width flex-column filter-popularity">

                                                    <h2 className="full-width flex-start noselect">Populartiy</h2>

                                                    <li className="flex-start full-width" id="good">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Good for avoiding crowds</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="safety">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Taking safety measures</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="virtual">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Virtual experiences</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="kid">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Kid friendly</span>
                                                    </li>

                                                </ul>

                                                <ul className="full-width flex-column filter-duration">

                                                    <h2 className="full-width flex-start noselect">Duration</h2>

                                                    <li className="flex-start full-width" id="1h">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Up to 1 hour</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="4h">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">1 to 4 hour</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="1d">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">1 to 3 days</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="+3d">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">3+ days</span>
                                                    </li>

                                                </ul>

                                                <ul className="full-width flex-column filter-stars">

                                                    <h2 className="full-width flex-start noselect">Rating</h2>

                                                    <li className="flex-start full-width" id="5">
                                                        <div className="checkbox circle"><div></div></div>
                                                        <Stars count={5}/>
                                                    </li>
                                                    <li className="flex-start full-width" id="4">
                                                        <div className="checkbox circle"><div></div></div>
                                                        <Stars count={4}/>
                                                    </li>
                                                    <li className="flex-start full-width" id="3">
                                                        <div className="checkbox circle"><div></div></div>
                                                        <Stars count={3}/>
                                                    </li>
                                                    <li className="flex-start full-width" id="2">
                                                        <div className="checkbox circle"><div></div></div>
                                                        <Stars count={2}/>
                                                    </li>
                                                    <li className="flex-start full-width" id="1">
                                                        <div className="checkbox circle"><div></div></div>
                                                        <Stars count={1}/>
                                                    </li>

                                                </ul>

                                                <ul className="full-width flex-column no-border filter-specials">

                                                    <h2 className="full-width flex-start noselect">Specials</h2>

                                                    <li className="flex-start full-width" id="deals">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Deals & Discounts</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="free">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Free Cancellation</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="likely">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">Likely to Sell Out</span>
                                                    </li>
                                                    <li className="flex-start full-width" id="new">
                                                        <div className="checkbox"><i className="fa fa-check"></i></div>
                                                        <span className="noselect">New on Viator</span>
                                                    </li>

                                                </ul>

                                                <div className="apply fixed flex-space hide">
                                                    <button className="pointer" onClick={hide_filters}>Cancel</button>
                                                    <button className="pointer" onClick={_ => { hide_filters(); filter(); }}>Apply</button>
                                                </div>

                                            </div>

                                            <Calendar />

                                        </div>
                                        
                                    </div>

                                </div>

                                <div className="right relative">

                                    <div className="hide result full-width">

                                        <div className="actions full-width">

                                            <div className="full-width flex-space filters">

                                                <div className="flex">

                                                    <div className="show-filters" onClick={show_filters}>
                                                        <span className="material-symbols-outlined">tune</span>
                                                    </div>

                                                    <span>{fix_number(result.length)} results</span>
                                                    
                                                </div>

                                                <select name="filter">
                                                    <option value="1">Recently</option>
                                                    <option value="2">Popular</option>
                                                    <option value="3">Destinations</option>
                                                    <option value="4">Full Payment</option>
                                                </select>

                                            </div>

                                            <div className="msg full-width flex">

                                                <span className="left-text">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 11.45V6h11v.42A5 5 0 0114 
                                                            7V3.55c0-.8-.58-1.55-1.42-1.55H2.42C1.58 2 1 2.76 1 3.55v7.9c0 .8.58 1.55 1.42 1.55h4a4.96 
                                                            4.96 0 01-.32-1H2.42c-.17 0-.42-.18-.42-.55zM2.42 3c-.17 
                                                            0-.42.18-.42.55V5h11V3.55c0-.37-.25-.55-.42-.55H2.42z">
                                                        </path>
                                                        <path d="M3.5 9a.5.5 0 000 1h2a.5.5 0 000-1h-2zM11 9c.28 0 .5.22.5.5v1h1a.5.5 0 010 1H11a.5.5 
                                                            0 01-.5-.5V9.5c0-.28.22-.5.5-.5z">
                                                        </path>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7 11a4 4 0 118 0 4 4 0 01-8 0zm4-3a3 3 0 100 6 3 
                                                            3 0 000-6z">
                                                        </path>
                                                    </svg>
                                                    You can reserve your spot today and pay when you're ready.
                                                </span>

                                                <Link href="/help" className="no-select">Learn more</Link>

                                            </div>

                                        </div>

                                        <div className="tours full-width">
                                            {
                                                result ? result.map((item, index) => 

                                                    <div key={index} data-id={item.id} className="flex-start full-width align-start relative tour-card">

                                                        <div className="image relative">
                                                            <Link href={`/tour/${item.id}/${parse(item.name).replace(/\//g, "")}`}>
                                                                <img src={`${host}${item.image}`} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}/>
                                                            </Link>
                                                            {
                                                                item.old_price > item.new_price &&
                                                                <div className="discount1">
                                                                    <img src="/media/image/public/coupon.png"/>
                                                                    <div>
                                                                        <span>Hot</span>
                                                                        <span>
                                                                            {
                                                                                Math.round((item.old_price - item.new_price) / item.old_price * 100) < 10 ? 
                                                                                `0${Math.round((item.old_price - item.new_price) / item.old_price * 100)}` : 
                                                                                Math.round((item.old_price - item.new_price) / item.old_price * 100)
                                                                            }%
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="favor absolute flex pointer circle add"><i className="fa fa-heart-o"></i></div>
                                                            <div className="favor absolute flex pointer circle del hide"><i className="fa fa-heart"></i></div>
                                                        </div>

                                                        <Link href={`/tour/${item.id}/${parse(item.name).replace(/\//g, "")}`} className="info flex-column">
                                                            
                                                            <h1 className="full-width flex-start left-text" title={parse(item.name)}>
                                                                {parse(item.name)}
                                                            </h1>

                                                            <div className="review full-width flex-start">

                                                                <div className="replys flex-start">

                                                                    <Stars count={item.rate}/>

                                                                    <span>{fix_number(item.reviews)}</span>

                                                                </div>

                                                            </div>
                                                            
                                                            <p className="flex-start full-width left-text describe">{parse(item.description)}</p>

                                                            <div className="full-width flex-space pays">
                                                                <div className="flex time">
                                                                    <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 5.5a.5.5 0 00-1 0v5c0 .28.22.5.5.5H13a.5.5 0 000-1h-3V5.5z"></path>
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-7 8a7 7 0 1114 0 7 7 0 01-14 0z"></path>
                                                                    </svg>
                                                                    <span>{JSON.parse(item.times || "{}")[0] || '--'}</span>
                                                                </div>
                                                                <div className="price flex"><span>${item.new_price}</span></div>
                                                            </div>

                                                        </Link>

                                                    </div>

                                                ) : null
                                            }
                                        </div>

                                        {
                                            result.length ? 

                                            <div>

                                                <div className="pagination full-width flex">
                                                
                                                    <li className="prev">
                                                        <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.53 2.47c.3.3.3.77 0 1.06L7.06 10l6.47 6.47a.75.75 
                                                                0 11-1.06 1.06l-7-7a.75.75 0 010-1.06l7-7c.3-.3.77-.3 1.06 0z">
                                                            </path>
                                                        </svg>
                                                    </li>

                                                    <ul className="flex">
                                                        <li>1</li>
                                                        <li className="active">2</li>
                                                        <li>3</li>
                                                        <li>4</li>
                                                        <li className="none">...</li>
                                                        <li>50</li>
                                                    </ul>

                                                    <li className="next">
                                                        <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" 
                                                                d="M6.72 17.53a.75.75 0 010-1.06L13.19 10 6.72 3.53a.75.75 0 011.06-1.06l7 7c.3.3.3.77 0 
                                                                1.06l-7 7c-.3.3-.77.3-1.06 0z">
                                                            </path>
                                                        </svg>
                                                    </li>

                                                </div>

                                                <div className="sug full-width flex ">

                                                    <div className="full-width flex">

                                                        Were these results helpful ?

                                                        <div className="flex">

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" 
                                                                viewBox="0 0 21 20" alt="Thumbs Up" onClick={_ => $(_.target).parents(".sug").addClass("active")}>
                                                                <title>Thumbs Up</title>
                                                                <path fill="rgba(255, 255, 255, 1)" fillRule="evenodd" d="M5.5 17.755c.542.407 1.199.671 
                                                                    1.918.735l6.311.561a3.75 3.75 0 
                                                                    003.803-2.315l2.252-5.505c.875-2.138-.698-4.48-3.008-4.48H14.5l-.085-.001h-.797a.183.183 0 
                                                                    01-.1-.026c-.014-.009-.017-.015-.018-.021A5.857 5.857 0 0113.25 5V3A2.75 2.75 0 0010.5.25H9a.75.75 0 
                                                                    00-.75.75v3.882a3.187 3.187 0 01-2.457 3.102c-.1.024-.199.054-.293.09V8a.75.75 0 00-.75-.75h-4A.75.75 0 
                                                                    000 8v10c0 .414.336.75.75.75h4A.75.75 0 005.5 18v-.245z" clipRule="evenodd">
                                                                </path>
                                                                <path fill="rgba(24, 107, 109, 1)" fillRule="evenodd" d="M5.5 17.755c.542.407 1.199.671 
                                                                    1.918.735l6.311.561a3.75 3.75 0 
                                                                    003.803-2.315l2.252-5.505c.875-2.138-.698-4.48-3.008-4.48H14.5l-.085-.001h-.797a.183.183 
                                                                    0 01-.1-.026c-.014-.009-.017-.015-.018-.021A5.857 5.857 0 0113.25 5V3A2.75 2.75 0 0010.5.25H9a.75.75 0 
                                                                    00-.75.75v3.882a3.187 3.187 0 01-2.457 3.102c-.1.024-.199.054-.293.09V8a.75.75 0 00-.75-.75h-4A.75.75 
                                                                    0 000 8v10c0 .414.336.75.75.75h4A.75.75 0 005.5 18v-.245zM9.75 1.75v3.132a4.687 4.687 0 01-3.614 
                                                                    4.562.825.825 0 00-.636.803v4.508a2.25 2.25 0 002.05 2.241l2.991.266a2.25 2.25 0 
                                                                    01-.86-2.612l2.141-6.065c.12-.341.303-.647.533-.907a1.522 1.522 0 01-.29-.535A7.355 
                                                                    7.355 0 0111.75 5V3c0-.69-.56-1.25-1.25-1.25h-.75zM4 8.75H1.5v8.5H4v-8.5zm9.862 8.807l-.275-.024a.749.749 
                                                                    0 00-.17-.157l-2.03-1.353a.75.75 0 01-.291-.873l2.14-6.066a1.25 1.25 0 011.16-.834h2.38a1.75 1.75 
                                                                    0 011.62 2.413l-2.252 5.505a2.25 2.25 0 01-2.282 1.389z" clipRule="evenodd">
                                                                </path>
                                                            </svg>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" 
                                                                viewBox="0 0 21 20" alt="Thumbs Down" onClick={_ => $(_.target).parents(".sug").addClass("active")}>
                                                                <title>Thumbs Down</title>
                                                                <path fill="rgba(255, 255, 255, 1)" fillRule="evenodd" d="M15.5 2.245a3.736 3.736 0 
                                                                    00-1.918-.735L7.271.949a3.75 3.75 0 00-3.803 2.315L1.216 8.77c-.875 2.138.698 4.48 3.008 
                                                                    4.48H6.5l.085.001h.797c.049 0 .083.014.1.025.014.01.016.016.018.022.118.385.25.977.25 
                                                                    1.703v2a2.75 2.75 0 002.75 2.75H12a.75.75 0 00.75-.75v-3.882a3.187 3.187 0 
                                                                    012.457-3.102c.1-.024.199-.054.293-.09V12c0 .414.336.75.75.75h4A.75.75 0 
                                                                    0021 12V2a.75.75 0 00-.75-.75h-4a.75.75 0 00-.75.75v.245z" clipRule="evenodd">
                                                                </path>
                                                                <path fill="rgba(24, 107, 109, 1)" fillRule="evenodd" d="M15.207 12.015c.1-.023.198-.053.293-.089V12c0 
                                                                    .414.336.75.75.75h4A.75.75 0 0021 12V2a.75.75 0 00-.75-.75h-4a.75.75 0 00-.75.75v.126a3.737 3.737 0 
                                                                    00-1.755-.717L7.433.567a3.75 3.75 0 00-3.988 2.35L1.136 8.816c-.834 2.132.738 4.435 3.027 
                                                                    4.435h3.38c.092.284.207.823.207 1.75v2a2.75 2.75 0 002.75 2.75H12a.75.75 0 00.75-.75v-3.882a3.187 
                                                                    3.187 0 012.457-3.103zM11.25 18.25v-3.132a4.687 4.687 0 013.614-4.563.825.825 0 00.636-.803V5.126a2.25 
                                                                    2.25 0 00-1.953-2.23l-6.314-.842a2.25 2.25 0 00-2.392 1.41L2.533 9.362a1.75 1.75 0 001.63 2.388h3.423c.053 
                                                                    0 .108.002.164.008v-.064a1.25 1.25 0 00-1.044-1.233l-1.33-.222a.75.75 0 01.247-1.48l1.33.222a2.75 2.75 
                                                                    0 012.297 2.713V17c0 .69.56 1.25 1.25 1.25h.75zm5.75-7v-8.5h2.5v8.5H17z" clipRule="evenodd">
                                                                </path>
                                                            </svg>

                                                        </div>

                                                    </div>

                                                    <span> Thank you for your feedback ! </span>

                                                </div>

                                            </div> : 

                                            <div className="full-width empty flex">

                                                <div className="full-width flex-column">
                        
                                                    <svg width="200" height="150" aria-labelledby="title" role="img" viewBox="0 0 1308 872" xmlns="http://www.w3.org/2000/svg">
                                                        <g fill="none" fillRule="evenodd">
                                                            <ellipse fill="#F8F8F8" cx="720" cy="845.5" rx="444" ry="26.5"></ellipse>
                                                            <path d="M855.009 111.372c9.676-43.364 31.82-67.475 66.431-72.335 38.77-5.444 69.72 7.485 92.846 38.788 28.568-12.93 
                                                                57.136-13.95 85.704-3.062 20.554 7.833 46.933 39.808 46.933 68.389 14.025 1.12 23.888 3.502 29.589 7.145 32.81 
                                                                20.968 34.69 44.912 25.507 73.493-1.616 5.03-16.325 34.705-44.893 32.664H916.593l-61.584-145.082zM69.856 
                                                                353.286c9.242-66.408 37.81-102.974 85.703-109.699 47.893-6.724 86.124 9.247 114.692 47.915 35.29-15.972 
                                                                70.58-17.233 105.869-3.783 25.39 9.676 57.976 49.175 57.976 84.48 17.324 1.384 29.508 4.326 36.55 8.827 
                                                                40.53 25.9 42.852 55.48 31.509 90.785-1.997 6.213-20.166 42.87-55.456 
                                                                40.348H76.157c-15.24-3.855-25.742-7.217-31.508-10.087-14.092-7.013-23.246-16.934-27.728-22.696C-3.029 453.73 
                                                                1.023 429.864.537 417.592c-.54-13.588 12.549-39.333 36.55-55.48 6.31-4.246 17.234-7.188 32.769-8.826z" fill="#E3E3E3">
                                                            </path>
                                                            <g transform="translate(349)">
                                                                <circle stroke="#979797" strokeWidth="50" cx="292.27" cy="292.27" r="267.27"></circle>
                                                                <path fill="#999" d="M475.499 514.694l39.196-39.196 191.487 191.487-39.196 39.196z"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                        
                                                </div>
                        
                                            </div>

                                        }

                                    </div>

                                    <div className="loader fill"></div>

                                </div>


                            </div>

                        </div> :

                        <div className="full-width empty flex">

                            <div className="loader fill"></div>

                            <div className="full-width flex-column">

                                <svg width="200" height="150" aria-labelledby="title" role="img" viewBox="0 0 1308 872" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <ellipse fill="#F8F8F8" cx="720" cy="845.5" rx="444" ry="26.5"></ellipse>
                                        <path d="M855.009 111.372c9.676-43.364 31.82-67.475 66.431-72.335 38.77-5.444 69.72 7.485 92.846 38.788 28.568-12.93 
                                            57.136-13.95 85.704-3.062 20.554 7.833 46.933 39.808 46.933 68.389 14.025 1.12 23.888 3.502 29.589 7.145 32.81 
                                            20.968 34.69 44.912 25.507 73.493-1.616 5.03-16.325 34.705-44.893 32.664H916.593l-61.584-145.082zM69.856 
                                            353.286c9.242-66.408 37.81-102.974 85.703-109.699 47.893-6.724 86.124 9.247 114.692 47.915 35.29-15.972 
                                            70.58-17.233 105.869-3.783 25.39 9.676 57.976 49.175 57.976 84.48 17.324 1.384 29.508 4.326 36.55 8.827 
                                            40.53 25.9 42.852 55.48 31.509 90.785-1.997 6.213-20.166 42.87-55.456 
                                            40.348H76.157c-15.24-3.855-25.742-7.217-31.508-10.087-14.092-7.013-23.246-16.934-27.728-22.696C-3.029 453.73 
                                            1.023 429.864.537 417.592c-.54-13.588 12.549-39.333 36.55-55.48 6.31-4.246 17.234-7.188 32.769-8.826z" fill="#E3E3E3">
                                        </path>
                                        <g transform="translate(349)">
                                            <circle stroke="#979797" strokeWidth="50" cx="292.27" cy="292.27" r="267.27"></circle>
                                            <path fill="#999" d="M475.499 514.694l39.196-39.196 191.487 191.487-39.196 39.196z"></path>
                                        </g>
                                    </g>
                                </svg>

                                <h2 className="full-width flex">
                                    Can't find any results for “ <span> {query ? query.slice(0, 10) : null}... {date ? `- ${date}` : null} </span> “
                                </h2>

                                <p>Try searching something else</p>

                                <Link href="/" className="no-select">Back to home</Link>

                            </div>

                        </div>

                    }
                </main>

                <Footer page="Search" settings={settings}/>

            </div>

        </Fragment>

    )

}
