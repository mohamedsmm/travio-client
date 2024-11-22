"use client";
import { host, parse } from "@/public/script/public";
import Image from 'next/image';

export default function Sidebar ({ tour, coupon, setCoupon, price, check_coupon, show_coupon }) {

    return (
         
        <div className="col__TB11 nogutter__1VXx sidebar-checkout">

            <div className="rightHandRail__jF9L1">

                <div className="container__3NQR">

                    <div className="container__qcyS">
                    
                        <div className="container__i2F7">

                            <div className="headerContainer__2qUH">

                                <div className="layer relative">
                                        
                                    {/* <Image className="image__3r17 tour-image" src={`${host}${tour.image}`} width={48} height={48} sizes="100%" alt=""/> */}
                                    <img className="image__3r17 tour-image" src={`${host}${tour.image}`} width={48} height={48}/>

                                </div>

                                <div className="titleContainer__1_0w">
                                    <span className="title__1Wwg title__2NjH title6__28O- title">
                                        {parse(tour.name)}
                                    </span>
                                </div>

                                <span className="title__1Wwg price__1V6m title6__28O-">
                                    <span className="moneyView__2HPx defaultColor__1NL9 price">${parseFloat(tour.new_price).toFixed(2)}</span>
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

                                    <div className="formInput__2IHK">

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

                                <span className="moneyView__2HPx defaultColor__1NL9 total-price">${parseFloat(price).toFixed(2)}</span>
                            
                            </div>

                        </div>

                    </div>

                    <div className="bookWithConfidenceContainer__1QYT">

                        <span className="title__1Wwg title__itNV title5__XmMG">Book with confidence</span>

                        <div className="rowContainer__3GFH">

                            <svg width="41" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__ci11">
                                <path
                                    d="M37.528 3.523c7.33 7.508 1.178 8.818-5.401 15.242-6.579 6.423-11.171 10.177-18.422 
                                    8.018-7.25-2.158-18.268-12.047-11.69-18.47 6.579-6.424 28.182-12.299 35.513-4.79z"
                                    fill="#00B67A">
                                </path>
                                <path
                                    d="M20 2.427l2.879 8.86.168.519h9.862l-7.537 5.476-.441.32.168.518 2.879 8.86-7.537-5.475-.441-.32-.44.32-7.538 
                                    5.476 2.879-8.86.168-.519-.44-.32-7.538-5.476h9.862l.168-.518L20 2.426z"
                                    fill="#fff" stroke="#2A2D32" strokeWidth="1.5">
                                </path>
                            </svg>

                            <div className="rowRightHandContent__3HVk">

                                <span className="title__1Wwg title6__28O-">Great Trustpilot score</span>

                                <div className="childContainer__t60j">

                                    <small>With more than 110,000 traveler reviews, you can get the full picture before you go.</small>

                                </div>

                            </div>

                        </div>

                        <div className="rowContainer__3GFH">

                            <svg width="41" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__ci11">
                                <path
                                    d="M37.528 3.523c7.33 7.508 1.178 8.818-5.401 15.242-6.579 6.423-11.171 10.177-18.422 
                                    8.018-7.25-2.158-18.268-12.047-11.69-18.47 6.579-6.424 28.182-12.299 35.513-4.79z"
                                    fill="#F6ECBB">
                                </path>
                                <mask id="svg-53230343a" fill="#fff">
                                    <rect x="5.869" y="4.224" width="28" height="17" rx="1"></rect>
                                </mask>
                                <rect x="5.869" y="4.224" width="28" height="17" rx="1" fill="#fff"
                                    stroke="#2A2D32" strokeWidth="3.4" mask="url(#svg-53230343a)">
                                </rect>
                                <path
                                    d="M22.39 17.956h3.285c.705 0 1.17-.491 1.17-1.123 0-.73.2-.911 1.13-.911.647 0 1.176-.505 
                                    1.176-1.208v-3.649c0-.703-.529-1.208-1.176-1.208-.93 0-1.13-.182-1.13-.911 0-.632-.465-1.123-1.17-1.123H22.33a.47.47 
                                    0 100 .94h3.346c.172 0 .228.06.228.183 0 1.271.641 1.851 2.071 1.851.137 0 .235.094.235.268v3.649c0 
                                    .173-.098.267-.235.267-1.43 0-2.072.58-2.072 1.852 0 .123-.055.182-.227.182H22.39a.47.47 0 100 .94zM16.392 
                                    7.823h-3.286c-.704 0-1.168.49-1.168 1.122 0 .73-.201.911-1.132.911-.646 0-1.175.506-1.175 1.209v3.648c0 
                                    .703.528 1.208 1.175 1.208.931 0 1.132.182 1.132.911 0 .632.464 1.123 1.168 1.123h3.345a.47.47 0 
                                    100-.94h-3.345c-.172 0-.228-.06-.228-.183 0-1.27-.641-1.851-2.072-1.851-.136 
                                    0-.234-.094-.234-.268v-3.648c0-.174.098-.268.234-.268 1.43 0 2.072-.58 2.072-1.852 
                                    0-.123.056-.182.228-.182h3.286a.47.47 0 000-.94z"
                                    fill="#2A2D32" stroke="#2A2D32" strokeWidth=".7">
                                </path>
                                <path
                                    d="M22.119 12.99c0 1.892-1.322 3.25-2.75 3.25s-2.75-1.358-2.75-3.25 1.322-3.25 2.75-3.25 2.75 1.358 
                                    2.75 3.25z"
                                    fill="#fff" stroke="#2A2D32" strokeWidth="1.5">
                                </path>
                            </svg>

                            <div className="rowRightHandContent__3HVk">

                                <span className="title__1Wwg title6__28O-">Exceptional flexibility</span>

                                <div className="childContainer__t60j">

                                    <small>
                                        You&#x27;re in control
                                        with free cancellation. to
                                        satisfy <br/> any plan or budget.
                                    </small>

                                </div>

                            </div>

                        </div>

                        <div className="rowContainer__3GFH">

                            <svg width="42" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__ci11">
                                <path
                                    d="M37.813 3.75C45.2 11.74 39 13.133 32.371 19.97c-6.628 6.837-11.256 10.832-18.562 8.535C6.503 
                                    26.207-4.598 15.683 2.031 8.846 8.659 2.01 30.426-4.242 37.813 3.749z"
                                    fill="#F5B8C3">
                                </path>
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M28.07 11.407V4.198H11.634V11.407h.113c.652 2.922 4.032 5.149 8.104 5.149 4.072 0 7.452-2.227 
                                    8.104-5.15h.113zm-8.218 11.706s2.054.515 5.136.515c0-2.275-2.3-4.12-5.136-4.12-2.836 0-5.136 
                                    1.845-5.136 4.12 3.082 0 5.136-.515 5.136-.515z"
                                    fill="#fff">
                                </path>
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M14.268 24.468a.666.666 0 01-.626-.887 6.621 6.621 0 014.047-4.058 6.647 6.647 0 011.549-.349v-1.387a9.274 
                                    9.274 0 01-8.627-9.293v-.535a.68.68 0 01-.023 0H7.246c-.165 1.287-.079 2.442.292 3.328.405.966 1.162 1.657 
                                    2.473 1.873a.668.668 0 01-.216 1.317c-1.77-.29-2.908-1.29-3.488-2.674-.562-1.34-.583-2.99-.29-4.63a.668.668 
                                    0 01.657-.55h3.914a.68.68 0 01.023 0V5.167c0-1.102.893-1.997 1.991-1.997H27.21c1.098 0 1.991.895 1.991 
                                    1.997v.77h3.829c.323 0 .6.233.657.551.292 1.638.272 3.289-.29 4.629-.58 1.385-1.718 2.384-3.488 2.674a.668.668 0 
                                    11-.217-1.317c1.311-.215 2.069-.907 2.473-1.873.371-.886.458-2.041.292-3.328H29.2v1.222a9.272 9.272 0 01-8.634 
                                    9.293v1.386a6.6 6.6 0 012.198.62 6.604 6.604 0 013.398 3.789.666.666 0 01-.626.886H14.268zM12.602 4.5H27.21c.366 
                                    0 .663.298.663.666v3.328c0 4.404-3.573 7.987-7.966 7.987-4.394 
                                    0-7.967-3.583-7.967-7.987V5.166c0-.368.297-.666.663-.666zm11.903 18.637a5.236 5.236 0 00-2.314-2.143 5.249 
                                    5.249 0 00-2.236-.523h-.004a.482.482 0 01-.092.001 5.308 5.308 0 00-1.728.306 5.26 5.26 0 00-2.831 2.36h9.205z"
                                    fill="#2A2D32">
                                </path>
                            </svg>

                            <div className="rowRightHandContent__3HVk">

                                <span className="title__1Wwg title6__28O-">24/7 global support</span>

                                <div className="childContainer__t60j">

                                    <small>

                                        Our support team is here to help, 24/7.

                                        <div className="helpOptions__2fIE contacts">

                                            <a className="callLink__2xHD phone-chat" href={`tel:${tour.phone}`}>

                                                <div className="helpOption__2lgT">

                                                    <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                                        className="icon__3A1i icon__ci11">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M6.03 3c-.63-.03-1.22.25-1.76.77A4.3 4.3 0 003 6.8c0 2 1.17 4.2 3.53 6.66C8.96 
                                                            15.9 11.15 17 13.13 17h.02c1.16 0 2.27-.47 
                                                            3.1-1.29l.01-.01c.5-.45.76-1.09.74-1.75-.1-.44-.43-.8-.87-.95h-.02l-2.19-1a.87.87 0 
                                                            00-.94.2l-.71.67c-.45.42-1.14.55-1.7.22-.78-.45-1.5-1-2.13-1.64-.6-.61-1.13-1.29-1.58-2.02a1.44 
                                                            1.44 0 01.23-1.77l.69-.7h.01c.26-.24.34-.6.18-.92l-.98-2.2v-.02A1.37 1.37 
                                                            0 006.02 3zm-2.45.05a3.33 3.33 0 012.55-1.04h.07c.77.17 1.41.7 1.7 1.43l.98 
                                                            2.17c.34.7.17 1.56-.41 2.08l-.67.68a.44.44 0 00-.09.54c.41.66.9 1.28 1.44 
                                                            1.83.57.59 1.21 1.08 1.91 1.49.15.08.36.06.52-.09l.7-.65c.53-.53 1.33-.7 
                                                            2.03-.4h.01l2.16.97c.77.27 1.34.92 1.5 1.72l.01.04v.04c.06.97-.33 1.91-1.05 
                                                            2.57A5.43 5.43 0 0113.15 18h-.02c-2.37 0-4.8-1.31-7.31-3.84C3.37 11.64 2 
                                                            9.18 2 6.8a5.3 5.3 0 011.58-3.75z">
                                                        </path>
                                                    </svg>

                                                    <span className="contact-phone">{tour.phone}</span>

                                                </div>

                                            </a>

                                            <a type="button" className="button__2dWp contact-chat show-chat">

                                                <div className="helpOption__2lgT">

                                                    <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                                        className="icon__3A1i icon__ci11">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M10 3a7 7 0 00-6.06 10.5.5.5 0 01.05.39l-.78 2.9 2.9-.79a.5.5 0 
                                                            01.38.05A7 7 0 1010 3zm-8 7a8 8 0 114.17 7.02l-3.54.96a.5.5 0 01-.61-.61l.95-3.54A7.97 
                                                            7.97 0 012 10z">
                                                        </path>
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M7 8.5c0-.28.22-.5.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7 11.5c0-.28.22-.5.5-.5h3a.5.5 
                                                            0 010 1h-3a.5.5 0 01-.5-.5z">
                                                        </path>
                                                    </svg>

                                                    Chat now

                                                </div>

                                            </a>

                                        </div>

                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}
