"use client";
import { host, parse } from "@/public/script/public";
import Image from 'next/image';
import $ from "jquery";

export default function Template2 ({ data, setData, tour }) {

    const next_step = () => {

        $(".icons .contact-icon").removeClass("opened").removeClass("none").addClass("active");
        $(".icons .details-icon").removeClass("opened").removeClass("none").addClass("active");
        $(".icons .payment-icon").addClass("opened");
        $(".contact-div").hide();
        $(".details-div").hide();
        $(".payment-div").show();
        if ( $(window).width() > 1024 ) $(".main-container").scrollTop(10000);

    }
    const edit_step = () => {

        $(".payment-div").hide();
        $(".details-div").hide();
        $(".contact-div").show();
        $(".main-container").scrollTop(0);

    }
    return (
         
        <div className="col__TB11 nogutter__1VXx details-div hide">

            <div className="contact-info">

                <div className="container__2sPS">

                    <div className="titleContainer__1Ksc">

                        <span className="title__1Wwg title4__AH0S">

                            <div className="container__q6y1">

                                <div className="iconContainer__1izA">

                                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.296 5v1.352h1.209v8.125H11V5H8.296z" fill="currentColor"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 
                                            10 10-4.477 10-10S15.523 0 10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" fill="currentColor">
                                        </path>
                                    </svg>

                                </div>

                                <div className="head">Contact details</div>

                            </div>

                        </span>

                        <button className="link__WYUw edit-contact" onClick={edit_step}>Edit</button>

                    </div>
                    
                    <div className="container__1ksl nomargin__3NWI default">

                        <div className="row__3-k3">
                            <div className="col__TB11">
                                <div className="collapsedValueContainer__2xJs hidden-text">Name : &nbsp;
                                    <span className="collapsedValue__3IIi username hidden-text">{data.name1} {data.name2}</span>
                                </div>
                            </div>
                        </div>

                        <div className="row__3-k3">
                            <div className="col__TB11">
                                <div className="collapsedValueContainer__2xJs hidden-text">E-mail : &nbsp;
                                    <span className="collapsedValue__3IIi email hidden-text">{data.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="row__3-k3">
                            <div className="col__TB11">
                                <div className="collapsedValueContainer__2xJs hidden-text">Phone : &nbsp;
                                    <span className="collapsedValue__3IIi phone hidden-text">{data.phone}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className="details-information">

                <div className="container__3RER">

                    <div className="titleContainer__1sC5">

                        <span className="title__1Wwg title4__AH0S">

                            <div className="container__q6y1">

                                <div className="iconContainer__1izA">

                                    <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14zm13.649.942a71.104 71.104 0 
                                            01-2.718 2.448l-1.296 1.116V20h8.748v-1.71h-5.706l.81-.72a40.26 40.26 0 002.304-2.178 9.93 9.93 0 
                                            001.566-2.142c.444-.804.666-1.638.666-2.502 0-1.2-.372-2.16-1.116-2.88-.732-.72-1.752-1.08-3.06-1.08-1.212 
                                            0-2.214.366-3.006 1.098-.78.72-1.188 1.764-1.224 3.132h1.98c.024-.756.228-1.356.612-1.8.396-.456.948-.684 
                                            1.656-.684.732 0 1.266.204 1.602.612.348.408.522.972.522 1.692 0 .696-.222 1.392-.666 2.088a11.135 11.135 
                                            0 01-1.674 2.016z"
                                            fill="currentColor">
                                        </path>
                                    </svg>

                                </div>

                                <div className="head">Activity details</div>

                            </div>

                        </span>

                    </div>

                    <form>

                        <div className="container__i2F7">

                            <div className="headerContainer__2qUH">

                                <div className="container_2KID3 layer">

                                    <div className="image__3r17 tour-image layer relative">
                                        
                                        {/* <Image className="" src={`${host}${tour.image}`} fill sizes="100%" alt="" style={{ borderRadius: '.3rem'}}/> */}
                                        <img className="" src={`${host}${tour.image}`} style={{ borderRadius: '.3rem', width: '100%', height: '100%'}}/>

                                    </div>
                                    
                                    <div className="titleContainer__1_0w">

                                        <span className="title__1Wwg title__2NjH title5__XmMG title">
                                            {parse(tour.name)}
                                        </span>

                                        <ul className="list__3uue big-3uue">

                                            <li className="row__2P99">
                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i person__10wY">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M8 2a2.75 2.75 0 100 5.5A2.75 2.75 0 008 2zM6.25 4.75a1.75 1.75 0 113.5 0 1.75 1.75 
                                                        0 01-3.5 0zM8 8.5c-2.76 0-5 2.17-5 5 0 .28.22.5.5.5h9a.5.5 0 00.5-.5c0-2.83-2.24-5-5-5zm0 
                                                        1a3.96 3.96 0 013.97 3.5H4.03A3.96 3.96 0 018 9.5z">
                                                    </path>
                                                </svg>
                                                <small className="adults">{tour.adults} Adults</small>
                                            </li>

                                            <li className="row__2P99">
                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i calendar__2kW4">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M5.5 1c.28 0 .5.22.5.5V2h4v-.5a.5.5 0 011 0V2h1.25c.97 0 1.75.78 1.75 1.75v8.5c0 .97-.78 
                                                        1.75-1.75 1.75h-8.5C2.78 14 2 13.22 2 12.25v-8.5C2 2.78 2.78 2 3.75 
                                                        2H5v-.5c0-.28.22-.5.5-.5zM10 3v.5a.5.5 0 001 0V3h1.25c.41 
                                                        0 .75.34.75.75V5H3V3.75c0-.41.34-.75.75-.75H5v.5a.5.5 0 001 0V3h4zM3 6v6.25c0 
                                                        .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75V6H3z">
                                                    </path>
                                                </svg>
                                                <small className="date__1psV datetime">{tour.book_date} {tour.book_time}</small>
                                            </li>

                                            <li className="row__2P99">
                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i refundableIcon__2zW3">
                                                    <path
                                                        d="M10.85 6.85a.5.5 0 00-.7-.7l-2.9 2.9-1.4-1.4a.5.5 0 00-.7.7L6.9 10.1a.5.5 0 00.7 
                                                        0l3.25-3.25z">
                                                    </path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M8 2a6 6 0 100 12A6 6 0 008 2zM3 8a5 5 0 1110 0A5 5 0 013 8z">
                                                    </path>
                                                </svg>
                                                <small className="cancel-datetime">{tour.cancellation}</small>
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="container__i2F7 small-3uue hide">

                            <div className="headerContainer__2qUH">

                                <div className="titleContainer__1_0w">

                                    <ul className="list__3uue">

                                        <li className="row__2P99">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i person__10wY">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M8 2a2.75 2.75 0 100 5.5A2.75 2.75 0 008 2zM6.25 4.75a1.75 1.75 0 113.5 0 1.75 1.75 
                                                    0 01-3.5 0zM8 8.5c-2.76 0-5 2.17-5 5 0 .28.22.5.5.5h9a.5.5 0 00.5-.5c0-2.83-2.24-5-5-5zm0 
                                                    1a3.96 3.96 0 013.97 3.5H4.03A3.96 3.96 0 018 9.5z">
                                                </path>
                                            </svg>
                                            <small className="adults">{tour.adults} Adults</small>
                                        </li>

                                        <li className="row__2P99">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i calendar__2kW4">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M5.5 1c.28 0 .5.22.5.5V2h4v-.5a.5.5 0 011 0V2h1.25c.97 0 1.75.78 1.75 1.75v8.5c0 .97-.78 
                                                    1.75-1.75 1.75h-8.5C2.78 14 2 13.22 2 12.25v-8.5C2 2.78 2.78 2 3.75 
                                                    2H5v-.5c0-.28.22-.5.5-.5zM10 3v.5a.5.5 0 001 0V3h1.25c.41 
                                                    0 .75.34.75.75V5H3V3.75c0-.41.34-.75.75-.75H5v.5a.5.5 0 001 0V3h4zM3 6v6.25c0 
                                                    .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75V6H3z">
                                                </path>
                                            </svg>
                                            <small className="date__1psV datetime">{tour.book_date} {tour.book_time}</small>
                                        </li>

                                        <li className="row__2P99">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i refundableIcon__2zW3">
                                                <path
                                                    d="M10.85 6.85a.5.5 0 00-.7-.7l-2.9 2.9-1.4-1.4a.5.5 0 00-.7.7L6.9 10.1a.5.5 0 00.7 
                                                    0l3.25-3.25z">
                                                </path>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M8 2a6 6 0 100 12A6 6 0 008 2zM3 8a5 5 0 1110 0A5 5 0 013 8z">
                                                </path>
                                            </svg>
                                            <small className="cancel-datetime">{data.cancellation}</small>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <div className="cartItemBookingQuestionsWrapper__32Ea">

                            <div className="title__2iKh">
                                <span className="title__1Wwg title5__XmMG">Other details</span>
                            </div>

                            <div className="formInput__2IHK">

                                <div className="withLabel__140n">
                                    <label className="inputLabel__276A">Picked up from ?</label>
                                </div>

                                <input type="text" value={data.pick_up || ''} onChange={_ => setData({...data, pick_up: _.target.value})} placeholder="Meeting" className="select__2SNs md__1bH6 fillWidth__2_A1"/>

                            </div>

                            <div className="otherBookingQuestionsContainer__2Lav">

                                <div className="row__3-k3">

                                    <div className="col__TB11">

                                        <div className="formInput__2IHK">

                                            <div className="withLabel__140n">
                                                <label className="inputLabel__276A">Languages</label>
                                            </div>

                                            <select onChange={_ => setData({...data, language: _.target.value})} className="select__2SNs md__1bH6 fillWidth__2_A1">
                                                <option value="en">English</option>
                                                <option value="fr">Franch</option>
                                                <option value="ar">Arabic</option>
                                            </select>

                                        </div>

                                    </div>

                                    <div className="col__TB11">

                                        <div className="formInput__2IHK no-error">
                                            
                                            <div className="withLabel__140n">
                                                <label className="inputLabel__276A">Requirements</label>
                                            </div>

                                            <input onChange={_ => setData({...data, notes: _.target.value})} placeholder="e.g. dietary needs, accessibility" className="textInput__3ljY md__1Wdq" type="text"/>
                                        
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <button className="next" type="button" onClick={next_step}>Next</button>

                    </form>

                </div>

            </div>

            <div className="next-step">

                <div className="container__2XoA no-select">

                    <span className="title__1Wwg title4__AH0S">

                        <div className="container__q6y1">

                            <div className="iconContainer__1izA">

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.894 5.676c-.563.45-.871 1.079-.923 1.885h1.443a1.47 1.47 0 01.48-.91c.27-.251.647-.377 
                                        1.132-.377.494 0 .875.126 1.144.377.269.243.403.572.403.988 0 .485-.186.84-.56 
                                        1.066-.363.225-.896.342-1.598.351h-.351v1.222h.338c.797 0 1.387.13 1.768.39.39.251.585.68.585 1.287 0 
                                        .46-.143.836-.43 1.131-.285.286-.692.429-1.221.429-.546 0-.98-.143-1.3-.429a1.646 1.646 0 
                                        01-.533-1.131H6.84c.043.901.364 1.595.962 2.08.607.477 1.378.715 2.314.715.641 0 1.192-.113 
                                        1.65-.338.46-.234.807-.55 1.04-.949.235-.399.352-.854.352-1.365 0-.641-.143-1.166-.43-1.573a2.171 2.171 0 
                                        00-1.195-.858v-.052c.399-.13.74-.386 1.027-.767.286-.381.429-.84.429-1.378 
                                        0-.468-.113-.888-.338-1.261-.225-.373-.56-.667-1.001-.884-.442-.217-.966-.325-1.573-.325-.884 
                                        0-1.612.225-2.184.676z"
                                        fill="currentColor">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM1.5 10a8.5 8.5 0 
                                        1117 0 8.5 8.5 0 01-17 0z"
                                        fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div>Payment details</div>

                        </div>

                    </span>

                </div>

            </div>

        </div>

    )

}
