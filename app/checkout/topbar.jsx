"use client";
import { host, position, parse } from "@/public/script/public";
import Image from 'next/image';
import $ from "jquery";

export default function Topbar ({ tour, coupon, setCoupon, price, check_coupon, show_coupon }) {

    const show_topbar = () => {

        $(".check-promo").hide();
        $(".promo-code-button").show();
        $(".top-side").fadeIn(150);

    }
    const hide_topbar = () => {

        $("html").css("scroll-behavior", "auto");
        $(".main-container").scrollTop(0);
        $(".top-side").fadeOut(200);
        $("html").css("scroll-behavior", "smooth");

    }
    const edit_step = () => {

        if ( !$(".icons .contact-icon").hasClass('active') ) return;
        $(".payment-div").hide();
        $(".details-div").hide();
        $(".contact-div").show();
        $(".main-container").scrollTop(0);
        $(".icons .contact-icon").addClass("opened").removeClass("none active");
        $(".icons .details-icon").addClass("none").removeClass("opened active");
        $(".icons .payment-icon").addClass("none").removeClass("opened active");

    }
    const details_step = () => {

        if ( !$(".icons .details-icon").hasClass('active') ) return;
        $(".payment-div").hide();
        $(".contact-div").hide();
        $(".details-div").show();
        $(".main-container").scrollTop(position(".details-div .details-information", "top") - 80);
        $(".icons .details-icon").addClass("opened").removeClass("none active");
        $(".icons .contact-icon").addClass("active").removeClass("opened none");
        $(".icons .payment-icon").addClass("none").removeClass("opened active");

    }
    return (

        <div className="topbar full-width">

            <button type="button" className="bannerContainer__2azq show-top-side no-select hide" onClick={show_topbar}>

                <main className="titleContainer__3uZO">

                    <span className="title__2EtM">

                        <svg width="23" height="23" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3a.5.5 0 000 1h.3c.22 0 .4.13.48.32l.5 1.33 1.68 5.9A2 2 0 
                                008.38 13h5.24a2 2 0 001.92-1.45l1.5-5.28A1 1 0 0016.1 5H5.59l-.38-1.03A1.5 1.5 0 003.81 3H3.5zm2.41 3l1.51 5.27a1 1 
                                0 00.96.73h5.24a1 1 0 00.96-.73L16.08 6H5.92zM8 15.5a.5.5 0 111 0 .5.5 0 01-1 0zm.5-1.5a1.5 1.5 0 100 3 1.5 1.5 0 
                                000-3zm4.5 1.5a.5.5 0 111 0 .5.5 0 01-1 0zm.5-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z">
                            </path>
                        </svg>

                        <span>Show summary</span>

                        <svg width="17" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.97 5.97c.3-.3.77-.3 1.06 0l6.47 6.47 6.47-6.47a.75.75 0 111.06 1.06l-7 
                                7c-.3.3-.77.3-1.06 0l-7-7a.75.75 0 010-1.06z">
                            </path>
                        </svg>

                    </span>

                    <span className="amount__1OJ2">
                        <span className="moneyView__2HPx total-price">${parseFloat(tour.adults * tour.new_price).toFixed(2)}</span>
                    </span>

                </main>

            </button>

            <div className="space-button hide"></div>

            <div className="sectionStepperContainer__1L5U hide">

                <main className="icons">

                    <div className="container__COlK no-select">

                        <div className="container__1pHj contact-icon opened" onClick={edit_step}>

                            <div className="ordinal__1EYT">

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.296 5v1.352h1.209v8.125H11V5H8.296z" fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 
                                        0 10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" fill="currentColor">
                                    </path>
                                </svg>

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 
                                        10zm8.296-5v1.352h1.209v8.125H11V5H8.296z" fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div className="label__2nuX">Contact</div>

                        </div>

                        <div className="separator__2hNh">

                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.22 13.03a.75.75 0 010-1.06L9.19 8 5.22 4.03a.75.75 0 011.06-1.06l4.5 
                                    4.5c.3.3.3.77 0 1.06l-4.5 4.5c-.3.3-.77.3-1.06 0z">
                                </path>
                            </svg>

                        </div>

                        <div className="container__1pHj details-icon none" onClick={details_step}>

                            <div className="ordinal__1EYT closedOrdinal__1SCx">
                                
                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.746 10.889a51.348 51.348 0 01-1.963 1.768l-.936.806v1.079h6.318v-1.235h-4.12l.584-.52a29.079 29.079 0 
                                        001.665-1.573c.441-.46.819-.975 1.13-1.547a3.69 3.69 0 
                                        00.482-1.807c0-.867-.27-1.56-.806-2.08-.53-.52-1.266-.78-2.21-.78-.876 0-1.6.264-2.172.793-.563.52-.858 
                                        1.274-.884 2.262h1.43c.018-.546.165-.98.442-1.3.286-.33.685-.494 1.196-.494.53 0 .915.147 1.158.442.25.295.377.702.377 
                                        1.222 0 .503-.16 1.005-.481 1.508-.321.503-.724.988-1.21 1.456z" fill="currentColor">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 
                                        10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" fill="currentColor">
                                    </path>
                                </svg>

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 
                                        10S0 15.523 0 10zm9.746.889a51.348 51.348 0 01-1.963 1.768l-.936.806v1.079h6.318v-1.235h-4.12l.584-.52a29.079 29.079 
                                        0 001.665-1.573c.441-.46.819-.975 1.13-1.547a3.69 3.69 0 
                                        00.482-1.807c0-.867-.27-1.56-.806-2.08-.53-.52-1.266-.78-2.21-.78-.876 0-1.6.264-2.172.793-.563.52-.858 1.274-.884 
                                        2.262h1.43c.018-.546.165-.98.442-1.3.286-.33.685-.494 1.196-.494.53 0 .915.147 1.158.442.25.295.377.702.377 1.222 0 
                                        .503-.16 1.005-.481 1.508-.321.503-.724.988-1.21 1.456z" fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div className="label__2nuX closedLabel__11ND">Activity</div>

                        </div>

                        <div className="separator__2hNh">

                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.22 13.03a.75.75 0 010-1.06L9.19 8 5.22 4.03a.75.75 0 011.06-1.06l4.5 
                                    4.5c.3.3.3.77 0 1.06l-4.5 4.5c-.3.3-.77.3-1.06 0z">
                                </path>
                            </svg>

                        </div>

                        <div className="container__1pHj payment-icon none">

                            <div className="ordinal__1EYT closedOrdinal__1SCx">

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.894 5.676c-.563.45-.871 1.079-.923 
                                        1.885h1.443a1.47 1.47 0 01.48-.91c.27-.251.647-.377 1.132-.377.494 0 .875.126 1.144.377.269.243.403.572.403.988 0 
                                        .485-.186.84-.56 1.066-.363.225-.896.342-1.598.351h-.351v1.222h.338c.797 0 1.387.13 1.768.39.39.251.585.68.585 
                                        1.287 0 .46-.143.836-.43 1.131-.285.286-.692.429-1.221.429-.546 0-.98-.143-1.3-.429a1.646 1.646 0 
                                        01-.533-1.131H6.84c.043.901.364 1.595.962 2.08.607.477 1.378.715 2.314.715.641 0 1.192-.113 
                                        1.65-.338.46-.234.807-.55 1.04-.949.235-.399.352-.854.352-1.365 0-.641-.143-1.166-.43-1.573a2.171 2.171 0 
                                        00-1.195-.858v-.052c.399-.13.74-.386 1.027-.767.286-.381.429-.84.429-1.378 
                                        0-.468-.113-.888-.338-1.261-.225-.373-.56-.667-1.001-.884-.442-.217-.966-.325-1.573-.325-.884 
                                        0-1.612.225-2.184.676z" fill="currentColor">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 
                                        0 10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" fill="currentColor">
                                    </path>
                                </svg>

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 
                                        10-4.477 10-10 10S0 15.523 0 10zm7.894-4.324c-.563.45-.871 1.079-.923 1.885h1.443a1.47 1.47 0 
                                        01.48-.91c.27-.251.647-.377 1.132-.377.494 0 .875.126 1.144.377.269.243.403.572.403.988 0 
                                        .485-.186.84-.56 1.066-.363.225-.896.342-1.598.351h-.351v1.222h.338c.797 0 1.387.13 1.768.39.39.251.585.68.585 1.287 
                                        0 .46-.143.836-.43 1.131-.285.286-.692.429-1.221.429-.546 0-.98-.143-1.3-.429a1.646 1.646 0 
                                        01-.533-1.131H6.84c.043.901.364 1.595.962 2.08.607.477 1.378.715 2.314.715.641 0 1.192-.113 
                                        1.65-.338.46-.234.807-.55 1.04-.949.235-.399.352-.854.352-1.365 0-.641-.143-1.166-.43-1.573a2.171 2.171 0 
                                        00-1.195-.858v-.052c.399-.13.74-.386 1.027-.767.286-.381.429-.84.429-1.378 
                                        0-.468-.113-.888-.338-1.261-.225-.373-.56-.667-1.001-.884-.442-.217-.966-.325-1.573-.325-.884 
                                        0-1.612.225-2.184.676z" fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div className="label__2nuX closedLabel__11ND">Payment</div>

                        </div>

                    </div>

                </main>

            </div>

            <div className="ReactModal__Overlay ReactModal__Overlay--after-open overlay__2Lvy noOverlayPadding__3s4w dark__1FLy top-side">

                <div className="ReactModal__Content ReactModal__Content--after-open takeover__3YTV sm__1fke isOpen__2IHV">
                    
                    <div className="sm__3qWB takeover__n-j1 hasHeader__2VyY modal__1i2E">

                        <div className="header__3tX6">

                            <div className="headerText__EbWj">
                                <span className="title__1Wwg title2__C3R7">My trip summary</span>
                            </div>

                            <div className="closeBtnContainer__3Tpz">

                                <button type="button" className="closeButton__1x1d close-top-side" onClick={hide_topbar}>

                                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="closeButtonIcon__2Fyo">
                                        <circle cx="16" cy="16" r="16" fill="#F5F5F5"></circle>
                                        <path
                                            d="M17.064 15.996l4.72-4.72a.75.75 0 00-1.06-1.06l-4.72 4.72-4.72-4.72a.75.75 0 00-1.06 
                                            1.06l4.72 4.72-4.72 4.72a.75.75 0 101.06 1.06l4.72-4.72 4.72 4.72a.75.75 0 001.06-1.06l-4.72-4.72z"
                                            fill="#2A2D32">
                                        </path>
                                    </svg>

                                </button>

                            </div>

                        </div>

                        <div className="body__3Ax0">
                    
                            <div className="container__i2F7">

                                <div className="headerContainer__2qUH">

                                    <div className="flex flex-start align-start">

                                        <div className="layer relative">
                                            
                                            {/* <Image className="image__3r17 tour-image" src={`${host}${tour.image}`} width={48} height={48} sizes="100%" alt=""/> */}
                                            <img className="image__3r17 tour-image" src={`${host}${tour.image}`} width={48} height={48}/>
        
                                        </div>

                                        <div className="titleContainer__1_0w">
                                            <span className="title__1Wwg title__2NjH title6__28O- title">
                                                {parse(tour.name)}
                                            </span>
                                        </div>

                                    </div>

                                    <span className="title__1Wwg price__1V6m title6__28O-">
                                        <span className="moneyView__2HPx defaultColor__1NL9 price">${price}</span>
                                    </span>

                                </div>

                                <ul className="list__3uue">

                                    <li className="row__2P99">

                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg" className="icon__3A1i person__10wY">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M8 2a2.75 2.75 0 100 5.5A2.75 2.75 0 008 2zM6.25 4.75a1.75 1.75 0 113.5 0 1.75 1.75 0 
                                                01-3.5 0zM8 8.5c-2.76 0-5 2.17-5 5 0 .28.22.5.5.5h9a.5.5 0 00.5-.5c0-2.83-2.24-5-5-5zm0 
                                                1a3.96 3.96 0 013.97 3.5H4.03A3.96 3.96 0 018 9.5z">
                                            </path>
                                        </svg>

                                        <small className="adults">{tour.adults} Adults</small>

                                    </li>

                                    <li className="row__2P99">

                                        <svg width="16" height="16" viewBox="0 0 16 16" 
                                            xmlns="http://www.w3.org/2000/svg" className="icon__3A1i calendar__2kW4">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M5.5 1c.28 0 .5.22.5.5V2h4v-.5a.5.5 0 011 0V2h1.25c.97 0 1.75.78 1.75 1.75v8.5c0 
                                                .97-.78 1.75-1.75 1.75h-8.5C2.78 14 2 13.22 2 12.25v-8.5C2 2.78 2.78 2 
                                                3.75 2H5v-.5c0-.28.22-.5.5-.5zM10 3v.5a.5.5 0 001 0V3h1.25c.41 0 
                                                .75.34.75.75V5H3V3.75c0-.41.34-.75.75-.75H5v.5a.5.5 0 001 0V3h4zM3 6v6.25c0 .41.34.75.75.75h8.5c.41 
                                                0 .75-.34.75-.75V6H3z">
                                            </path>
                                        </svg>

                                        <small className="date__1psV datetime">{tour.book_date} {tour.book_time}</small>

                                    </li>

                                    <li className="row__2P99">
                                        
                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg" className="icon__3A1i refundableIcon__2zW3">
                                            <path
                                                d="M10.85 6.85a.5.5 0 00-.7-.7l-2.9 2.9-1.4-1.4a.5.5 0 00-.7.7L6.9 10.1a.5.5 0 
                                                00.7 0l3.25-3.25z">
                                            </path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M8 2a6 6 0 100 12A6 6 0 008 2zM3 8a5 5 0 1110 0A5 5 0 013 8z">
                                            </path>
                                        </svg>

                                        <small className="cancel-datetime">{tour.cancellation}</small>

                                    </li>

                                </ul>

                            </div>

                            <hr className="divider__HfDK"/>
                    
                            <div className="discounts__1Mi3">

                                <div className="promo-code">

                                    <button type="button" className="addPromoCode__2qUU promo-code-button" onClick={show_coupon}>Enter Promo Code</button>

                                    <div className="flex-space check-promo hide">

                                        <div className="formInput__2IHK smaller-promo">

                                            <div className="flex-space">

                                                <input type="text" value={coupon} onChange={_ => setCoupon(_.target.value)} placeholder="Add promo code" onKeyUp={_ => _.key === 'Enter' && check_coupon()} autoComplete="off" className="textInput__3ljY md__1Wdq"/>

                                                <button className="apply" type="button" onClick={check_coupon}>Apply</button>

                                            </div>
                                            
                                            <span className="hide error-span">Sorry, this promo code is expired or invalid.</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <hr className="divider__HfDK discounts__1Mi3"/>

                            <div className="total__1j3M flex-space">

                                Total price

                                <div className="totalValue__55Wl">

                                    <span className="moneyView__2HPx defaultColor__1NL9 total-price">
                                        ${parseFloat(tour.adults * price).toFixed(2)}
                                    </span>

                                </div>

                            </div>

                            <div className="continueButton__1B-s">

                                <button className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn close-top-side" onClick={hide_topbar}>

                                    <span>Continue</span>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
