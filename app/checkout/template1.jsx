"use client";
import Link from "next/link";
import $ from "jquery";

export default function Template1 ({ data, setData, tour }) {

    const next_step = () => {

        $(".contact-div form input").each(function(){
            if ( !$(this).val().trim() ) {
                $(this).parents('.formInput__2IHK').addClass('error');
            }
        });

        if ( !data.name1 || !data.name2 || !data.email || !data.phone ) return;

        $(".icons .contact-icon").removeClass("opened").addClass("active");
        $(".icons .details-icon").addClass("opened").removeClass("none");
        $(".contact-div").hide();
        $(".details-div").show();
        if ( $(window).width() > 1024 ) $(".main-container").scrollTop(200);

    }
    return (
         
        <div className="contact-div nogutter__1VXx">

            <div className="container__3RER">
                
                <div className="titleContainer__1sC5">

                    <span className="title__1Wwg title4__AH0S">

                        <div className="container__q6y1">

                            <div className="iconContainer__1izA">

                                <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 
                                        14zm11.256-7v1.872h1.674v11.25H15V7h-3.744z"
                                        fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div className="head">Contact details</div>

                        </div>

                    </span>

                </div>

                <form>

                    <div className="subheading__1g0q">
                        We'll use this information to send you confirmation.
                    </div>

                    {
                        data.email ?
                        <div className="banner__34bf change-login">

                            <span className="promptContainer__P3mL default">

                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" 
                                    className="icon__3A1i signInIcon__3P0g">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zM10 11c-3.84 0-7 3.14-7 6.5 0 
                                        .28.22.5.5.5h13a.5.5 0 00.5-.5c0-3.36-3.16-6.5-7-6.5zm0 1c3.14 0 5.68 2.42 5.97 
                                        5H4.03c.3-2.58 2.83-5 5.97-5z">
                                    </path>
                                </svg>

                                <span className="prompt__1ttx"> Signed in as {data.name || ''} </span>

                            </span>

                        </div> :
                        <div className="banner__34bf change-login">

                            <span className="promptContainer__P3mL default">

                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" 
                                        className="icon__3A1i signInIcon__3P0g">
                                    <path d="M10 2a6.06 6.06 0 00-5.7 4.14 5.47 5.47 0 001.9 6.26.5.5 0 10.6-.8 
                                        4.47 4.47 0 01-1.54-5.14A5.06 5.06 0 0110 3a5.06 5.06 0 014.74 3.46 4.47 4.47 0 01-1.54 5.14.5.5 0 
                                        10.6.8 5.47 5.47 0 001.9-6.26A6.06 6.06 0 0010 2z">
                                    </path>
                                    <path d="M9.64 9.67c0-.3.08-.46.15-.53.07-.08.19-.14.4-.14.2 0 
                                        .32.06.39.14.07.07.15.23.15.53v4.48c0 .28.22.5.5.5h.94c.69 0 1.33.26 1.8.7.42.4.53.94.53 1.67v.48a.5.5 0 001 
                                        0v-.48c0-.8-.11-1.7-.84-2.4a3.63 3.63 0 00-2.49-.97h-.44V9.67c0-.47-.13-.9-.42-1.22A1.5 1.5 0 0010.18 8c-.42 
                                        0-.82.13-1.12.45-.3.32-.42.75-.42 1.22v4.65l-.44-.47a1.6 1.6 0 00-2.17-.12c-.65.54-.71 1.51-.13 2.13l1.86 
                                        1.98a.5.5 0 00.73-.68l-1.86-1.99a.46.46 0 01.04-.67.6.6 0 01.8.04l1.3 1.39a.5.5 0 00.87-.34V9.67z">
                                    </path>
                                </svg>

                                <span className="prompt__1ttx">Already hav an account ?</span>

                            </span>

                            <Link href="/login" className="bannerLink__1L-4 switch no-select login-button">Log in</Link>

                        </div>
                    }

                    <div className="row__3-k3">

                        <div className="col__TB11">

                            <div className="formInput__2IHK">

                                <div className="withLabel__140n"><label className="inputLabel__276A">First name</label></div>
                                
                                <input type="text" value={data.name1 || ''} onChange={_ => setData({...data, name1: _.target.value})} autoComplete="off" className="textInput__3ljY md__1Wdq"/>
                                
                                <span className="hide error-span">Required</span>

                            </div>

                        </div>

                        <div className="col__TB11">

                            <div className="formInput__2IHK">

                                <div className="withLabel__140n"><label className="inputLabel__276A">Last name</label></div>
                                
                                <input type="text" value={data.name2 || ''} onChange={_ => setData({...data, name2: _.target.value})} autoComplete="off" className="textInput__3ljY md__1Wdq"/>
                                
                                <span className="hide error-span">Required</span>

                            </div>

                        </div>

                    </div>

                    <div className="row__3-k3">

                        <div style={{width: "100%", flexGrow: "1", maxWidth: "100%"}} className="col__TB11">

                            <div className="formInput__2IHK">

                                <div className="withLabel__140n">

                                    <label>

                                        <span className="label__2DdV">

                                            E-mail

                                            <button type="button" className="tooltipTrigger__1Kdr default">

                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" 
                                                    className="icon__3A1i tooltipIcon__2imG">
                                                    <path
                                                        d="M8.75 11.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM7 6.52c0-.5.46-1.02 1.07-1.02.27 0 
                                                        .5.13.67.34.18.23.26.5.26.68 0 
                                                        .38-.18.66-.47.98l-.21.22-.02.02-.25.27c-.16.18-.33.4-.44.67a1.84 1.84 0 
                                                        00-.11.77V9.53a.5.5 0 001-.06v-.01a1.35 
                                                        1.35 0 01.04-.4c.04-.12.13-.24.26-.39l.22-.23.02-.02.23-.25c.34-.38.73-.9.73-1.65 
                                                        0-.43-.18-.92-.49-1.3-.31-.4-.8-.72-1.44-.72C6.9 4.5 6 5.49 6 6.52a.5.5 0 001 0z">
                                                    </path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M14 8A6 6 0 102 8a6 6 0 0012 0zM3 8a5 5 0 1110 0A5 5 0 013 8z">
                                                    </path>
                                                </svg>

                                            </button>

                                        </span>
                                        
                                    </label>

                                </div>

                                {
                                    data.email ?
                                    <input type="text" value={data.email || ''} autoComplete="off" className="textInput__3ljY md__1Wdq" readOnly/>
                                    :
                                    <input type="text" onChange={_ => setData({...data, email: _.target.value})} autoComplete="off" className="textInput__3ljY md__1Wdq"/>
                                }

                                <span className="hide error-span">Required</span>

                            </div>

                        </div>

                    </div>

                    <div className="row__3-k3">

                        <div style={{width: "100%", flexGrow: "1", maxWidth: "100%"}} className="col__TB11">

                            <div className="formInput__2IHK">

                                <div className="withLabel__140n">

                                    <label className="inputLabel__276A">

                                        <span className="label__2DdV">

                                            Phone number

                                            <button type="button" className="tooltipTrigger__1Kdr default">

                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                                    className="icon__3A1i tooltipIcon__2imG">
                                                    <path
                                                        d="M8.75 11.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM7 6.52c0-.5.46-1.02 1.07-1.02.27 0 
                                                        .5.13.67.34.18.23.26.5.26.68 0 
                                                        .38-.18.66-.47.98l-.21.22-.02.02-.25.27c-.16.18-.33.4-.44.67a1.84 1.84 0 
                                                        00-.11.77V9.53a.5.5 0 001-.06v-.01a1.35 
                                                        1.35 0 01.04-.4c.04-.12.13-.24.26-.39l.22-.23.02-.02.23-.25c.34-.38.73-.9.73-1.65 
                                                        0-.43-.18-.92-.49-1.3-.31-.4-.8-.72-1.44-.72C6.9 4.5 6 5.49 6 6.52a.5.5 0 001 0z">
                                                    </path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M14 8A6 6 0 102 8a6 6 0 0012 0zM3 8a5 5 0 1110 0A5 5 0 013 8z">
                                                    </path>
                                                </svg>

                                            </button>

                                        </span>

                                    </label>

                                </div>

                                <input type="tel" value={data.phone || ''} onChange={_ => setData({...data, phone: _.target.value})} autoComplete="off" placeholder="Phone number" className="textInput__3ljY md__1Wdq"/>

                                <span className="hide error-span">Required</span>

                            </div>

                        </div>

                    </div>

                    <div className="communicationOptIns__3SYA"></div>

                    <button className="next" type="button" onClick={next_step}>Next</button>

                </form>

            </div>

            <div className="next-step">

                <div className="container__2XoA no-select">

                    <span className="title__1Wwg title4__AH0S">

                        <div className="container__q6y1">

                            <div className="iconContainer__1izA">

                                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.746 10.889a51.348 51.348 0 01-1.963 1.768l-.936.806v1.079h6.318v-1.235h-4.12l.584-.52a29.079 29.079 0 
                                        001.665-1.573c.441-.46.819-.975 1.13-1.547a3.69 3.69 0 
                                        00.482-1.807c0-.867-.27-1.56-.806-2.08-.53-.52-1.266-.78-2.21-.78-.876 0-1.6.264-2.172.793-.563.52-.858 
                                        1.274-.884 2.262h1.43c.018-.546.165-.98.442-1.3.286-.33.685-.494 1.196-.494.53 0 .915.147 
                                        1.158.442.25.295.377.702.377 1.222 0 .503-.16 1.005-.481 1.508-.321.503-.724.988-1.21 1.456z"
                                        fill="currentColor">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 
                                        01-17 0z"
                                        fill="currentColor">
                                    </path>
                                </svg>

                            </div>

                            <div>Activity details</div>

                        </div>

                    </span>

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
