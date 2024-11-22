"use client";
import { api, get_session, remove_session, set_session, print } from "@/public/script/public";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import $ from "jquery";

export default function Payments ({ data, tour, setFlash, price }) {

    const router = useRouter();
    const [pay, setPay] = useState('paytabs');
    const [loading, setLoading] = useState(false);

    const pay_now = async() => {

        if ( !get_session('user') ) {
            set_session('redirect_page', '/checkout');
            return router.push('/login');
        }        
        const details = {
            product_id: tour.id,
            adults: tour.adults,
            book_date: tour.book_date || '',
            book_time: tour.book_time || '',
            name: `${data.name1 || ''} ${data.name2 || ''}`,
            email: data.email || '',
            phone: data.phone || '',
            pick_up: data.pick_up || '',
            notes: data.notes || '',
            coupon: sessionStorage.getItem('coupon') || '',
            amount: price,
            redirect_url: `${location.origin}/checkout/redirect`,
            cancel_url: `${location.origin}/checkout`
        }

        $(".checkout .main-details").hide();
        $(".checkout .loader").css("display", "flex");

        const response = await api(`home/pay/${pay}`, details);

        if ( response.url ) {
            localStorage.setItem('transaction_id', response.transaction_id);
            location.href = response.url;
        }
        else {
            $(".checkout .main-details").show();
            $(".checkout .loader").fadeOut(200);
            $(".pay-loader").css('display', 'flex');
        }

    }
    const pay_later = async() => {
        
        if ( !get_session('user') ) {
            set_session('redirect_page', '/checkout');
            return router.push('/login');
        }

        setLoading(true);

        $(".checkout .main-details").hide();
        $(".checkout .loader").css("display", "flex");

        let details = {
            tour: tour.id,
            user: get_session('user').id,
            adults: tour.adults,
            book_date: tour.book_date || '',
            book_time: tour.book_time || '',
            name: `${data.name1 || ''} ${data.name2 || ''}`,
            email: data.email || '',
            phone: data.phone || '',
            pick_up: data.pick_up || '',
            notes: data.notes || '',
            coupon: tour.coupon || '',
            pay_now: false,
        }

        const response = await api(`home/products/${tour.id}/checkout`, details);

        if ( response.status ) {
            setFlash(response.order);
            remove_session('tour', false);
        }

        $(".loader").fadeOut(200);
        $(".checkout .main-details").show();
        $(".pay-loader").css('display', 'flex');

    }
    return (

        <form>

            <div className="selectPaymentMethod__3Vbr">

                <div className="payLaterNotice__SDk9 flex-space">

                    Pay with

                    <div className="secureCheckoutBadge__2gXr no-select">

                        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i lockShieldIcon__3Y3A">
                            <path d="M14 14.6c0-.23.19-.42.42-.42a4.1 4.1 0 003.08-1.3l.31-.32c.1-.11.28-.11.38 0l.3.33a4.1 4.1 0 003.1 
                                1.3c.22-.01.41.18.41.4v3.13a5.28 5.28 0 01-3.57 4.63l-.34.12a.3.3 0 01-.18 0l-.34-.12A5.3 5.3 0 0114 17.72V14.6z">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.26 2.5h-.52A4.75 4.75 0 005 7.23V8.5h-.75C3.01 8.5 2 9.5 2 10.75v9.5c0 1.24 1 
                                2.25 2.25 2.25h11.42a6.3 6.3 0 01-1.51-1.5H4.25a.75.75 0 01-.75-.75v-9.5c0-.41.34-.75.75-.75h11.5c.41 0 
                                .75.34.75.75v1.71c.1-.08.19-.17.27-.26l.31-.33c.25-.26.59-.4.92-.4v-.72c0-1.24-1-2.25-2.25-2.25H15V7.24a4.75 4.75 0 
                                00-4.74-4.75zm3.24 6V7.24C13.5 5.45 12.05 4 10.26 4h-.52A3.25 3.25 0 006.5 7.24V8.5h7z">
                            </path>
                            <path d="M11.5 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                        </svg>

                        <div className="secureCheckoutText__3BZK">Checkout</div>

                    </div>

                </div>

                <div className="checkoutAccordion__5jm0">
                
                    <div className="checkoutAccordionItemHeader__G5v8 credit-payment" onClick={_ => setPay('paytabs')}>

                        <div className="checkoutAccordionItemRadio__3Ph-">

                            <div className={`dummyRadioButton__3s4A ${pay === 'paytabs' && 'checked__RrLR'}`}>

                                <div className='dummyRadioButtonCenter__3kBx'></div>

                            </div>

                        </div>

                        <div className="checkoutAccordionItemTitle__3VHi">

                            <div className="iconGroup__3XtH">

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG">
                                    <path
                                        d="M32 .5H4A3.5 3.5 0 00.5 4v16A3.5 3.5 0 004 23.5h28a3.5 3.5 0 003.5-3.5V4A3.5 3.5 
                                        0 0032 .5z"
                                        fill="#fff">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M4 1a3 3 0 00-3 3v16a3 3 0 003 3h28a3 3 0 003-3V4a3 3 0 00-3-3H4zM0 4a4 4 
                                        0 014-4h28a4 4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
                                        fill="#DFE0E2">
                                    </path>
                                    <path
                                        d="M14.985 8.097l-3.28 7.827h-2.14L7.95 
                                        9.678c-.098-.385-.183-.526-.481-.688-.487-.264-1.29-.512-1.998-.666l.048-.227h3.446c.439 
                                        0 .834.292.933.798l.853 4.529 2.107-5.327h2.127zm8.386 
                                        5.271c.009-2.065-2.856-2.18-2.836-3.102.006-.28.273-.58.858-.656.29-.038 1.09-.067 
                                        1.997.35l.355-1.66a5.44 5.44 0 00-1.894-.346c-2.001 0-3.41 1.064-3.421 2.587-.013 
                                        1.127 1.005 1.756 1.772 2.13.79.384 1.054.63 
                                        1.05.973-.005.525-.628.757-1.211.766-1.018.015-1.609-.276-2.08-.494l-.366 1.714c.473.217 
                                        1.346.407 2.251.416 2.127 0 3.519-1.05 3.525-2.678zm5.285 
                                        2.556h1.873l-1.635-7.827h-1.728a.921.921 0 00-.862.574l-3.038 
                                        7.253h2.126l.422-1.17h2.598l.244 1.17zm-2.26-2.774l1.067-2.938.613 
                                        2.938h-1.68zm-8.518-5.053l-1.674 7.827h-2.025l1.675-7.827h2.024z"
                                        fill="#1434CB">
                                    </path>
                                </svg>

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG svg0">
                                    <rect x=".5" y=".5" width="35" height="23"
                                        rx="3.5" fill="#fff" stroke="#DFE0E2"></rect>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M6.93 8.32l-3.226 7.35h3.863l.479-1.172H9.14l.48 
                                        1.172h4.251v-.894l.38.894h2.199l.379-.913v.913h8.843l1.075-1.141 1.007 1.141 
                                        4.542.01-3.237-3.665 3.237-3.696h-4.471l-1.047 1.12-.975-1.12h-9.62l-.827 
                                        1.898-.845-1.898h-3.855v.864l-.429-.864H6.931zm.748 1.043h1.883l2.14 
                                        4.985V9.363h2.063l1.653 
                                        3.574 1.524-3.574h2.053v5.275h-1.25l-.01-4.133-1.82 
                                        4.133h-1.117l-1.832-4.133v4.133h-2.569l-.487-1.182H7.278l-.486 
                                        1.181H5.415l2.263-5.274zm17.537 0h-5.079v5.272h5l1.611-1.747 1.553 
                                        1.747h1.624l-2.36-2.62 2.36-2.652h-1.553l-1.603 1.728-1.553-1.728zm-16.62.893l-.868 
                                        2.107H9.46l-.866-2.107zm12.795 1.162v-.963h3.169l1.383 1.54-1.444 
                                        1.547H21.39v-1.05h2.77v-1.074h-2.77z"
                                        fill="#1F72CD">
                                    </path>
                                </svg>

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG">
                                    <rect x=".5" y=".5" width="35" height="23"
                                        rx="3.5" fill="#fff" stroke="#DFE0E2"></rect>
                                    <path fill="#FF5F00" d="M15.38 7.31h5.24v9.382h-5.24z"></path>
                                    <path
                                        d="M15.713 12c0-1.906.898-3.597 2.279-4.69a5.965 5.965 0 00-3.693-1.277c-3.31 0-5.989 
                                        2.669-5.989 5.967 0 3.299 2.679 5.967 5.989 5.967 1.397 0 2.678-.48 3.693-1.276a5.95 5.95 0 
                                        01-2.28-4.69z"
                                        fill="#EB001B"></path>
                                    <path
                                        d="M27.69 12c0 3.299-2.678 5.967-5.989 5.967a5.965 5.965 0 01-3.693-1.276 5.925 5.925 0 
                                        002.28-4.69 5.975 5.975 0 00-2.28-4.692 5.965 5.965 0 013.693-1.276c3.31 0 5.989 2.685 
                                        5.989 5.967z"
                                        fill="#F79E1B">
                                    </path>
                                </svg>

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG svg0">
                                    <path
                                        d="M32 .5H4A3.5 3.5 0 00.5 4v16A3.5 3.5 0 004 23.5h28a3.5 3.5 0 003.5-3.5V4A3.5 3.5 0 
                                        0032 .5z"
                                        fill="#fff">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M4 1a3 3 0 00-3 3v16a3 3 0 003 3h28a3 3 0 003-3V4a3 3 0 00-3-3H4zM0 4a4 4 0 014-4h28a4 
                                        4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
                                        fill="#DFE0E2">
                                    </path>
                                    <path d="M15.948 23.063l19-5.75v2.75a3 3 0 01-3 3h-16z"
                                        fill="#FD6020">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M31.341 9.173c1.046 0 1.62.484 1.62 1.397.053.699-.417 1.29-1.045 1.397l1.412 
                                        1.988H32.23l-1.202-1.934h-.105v1.934h-.888V9.173h1.306zm-.418 2.203h.262c.575 0 
                                        .836-.268.836-.752 0-.43-.262-.698-.836-.698h-.262v1.45zm-3.972 
                                        2.579h2.509v-.806h-1.62v-1.29h1.568v-.805H27.84V9.979h1.62v-.806H26.95v4.782zm-2.613-1.558l-1.202-3.224h-.94l1.933 
                                        4.89h.47l1.934-4.89h-.94l-1.255 3.224zm-10.61-.806c0 1.343 1.046 2.472 2.352 2.472.418 0 
                                        .784-.108 1.15-.27V12.72c-.261.323-.627.538-1.045.538-.837 
                                        0-1.516-.645-1.516-1.505v-.107a1.591 
                                        1.591 0 011.463-1.666c.418 0 
                                        .837.215 1.098.538V9.442c-.314-.215-.732-.269-1.098-.269-1.359-.107-2.404 1.021-2.404 
                                        2.418zm-1.62-.59c-.523-.216-.68-.323-.68-.592.053-.322.314-.59.628-.537.261 0 
                                        .522.161.732.376l.47-.645c-.366-.322-.836-.537-1.307-.537-.732-.054-1.359.537-1.41 
                                        1.29v.053c0 .645.26 1.02 1.097 1.29.209.053.418.16.627.268a.568.568 0 01.261.484c0 
                                        .376-.313.698-.627.698h-.052c-.418 0-.784-.268-.941-.645l-.575.591c.314.591.94.914 
                                        1.568.914.836.053 1.516-.591 1.568-1.45v-.162c-.052-.645-.314-.967-1.359-1.397zm-3.031 
                                        2.954h.888V9.173h-.888v4.782zm-4.13-4.782h1.569c1.254.054 2.247 1.129 2.195 2.418 0 
                                        .699-.314 1.343-.836 1.827-.47.376-1.046.59-1.62.537H4.947V9.173zm1.15 
                                        3.976c.419.054.89-.107 1.203-.376.313-.322.47-.752.47-1.236 
                                        0-.43-.157-.86-.47-1.182-.314-.268-.784-.43-1.202-.376h-.262v3.17h.262z"
                                        fill="#000">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M19.895 9.063c-1.306 0-2.404 1.074-2.404 2.47 0 1.344 1.046 2.472 2.404 2.526 1.36.054 
                                        2.405-1.074 2.457-2.471-.052-1.397-1.098-2.525-2.457-2.525z"
                                        fill="#FD6020">
                                    </path>
                                </svg>

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG svg0">
                                    <path
                                        d="M32 .5H4A3.5 3.5 0 00.5 4v16A3.5 3.5 0 004 23.5h28a3.5 3.5 0 003.5-3.5V4A3.5 3.5 
                                        0 0032 .5z"
                                        fill="#fff">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M4 1a3 3 0 00-3 3v16a3 3 0 003 3h28a3 3 0 003-3V4a3 3 0 00-3-3H4zM0 4a4 4 0 
                                        014-4h28a4 4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
                                        fill="#DFE0E2">
                                    </path>
                                    <path
                                        d="M19.545 19.195c3.897.019 7.455-3.208 7.455-7.133 
                                        0-4.292-3.558-7.259-7.455-7.257h-3.354C12.247 4.803 9 7.77 9 12.062c0 3.926 3.247 7.152 
                                        7.19 7.133h3.355z"
                                        fill="#0079BE">
                                    </path>
                                    <path
                                        d="M16.207 5.4c-3.605 0-6.525 2.949-6.526 6.587.001 3.638 2.921 6.586 6.526 6.587 
                                        3.604-.001 6.526-2.95 6.526-6.587 0-3.638-2.921-6.586-6.526-6.587zm-4.137 
                                        6.587a4.18 4.18 0 012.656-3.896v7.792a4.179 4.179 0 01-2.656-3.896zm5.617 
                                        3.897V8.09a4.18 4.18 0 012.657 3.897 4.18 4.18 0 01-2.657 3.897z"
                                        fill="#fff">
                                    </path>
                                    <path
                                        d="M19.545 19.195c3.897.019 7.455-3.208 7.455-7.133 
                                        0-4.292-3.558-7.259-7.455-7.257h-3.354C12.247 4.803 9 7.77 9 12.062c0 3.926 3.247 7.152 
                                        7.19 7.133h3.355z"
                                        fill="#0079BE">
                                    </path>
                                    <path
                                        d="M16.207 5.4c-3.605 0-6.525 2.949-6.526 6.587.001 3.638 2.921 6.586 6.526 6.587 
                                        3.604-.001 6.526-2.95 6.526-6.587 0-3.638-2.921-6.586-6.526-6.587zm-4.137 
                                        6.587a4.18 4.18 0 012.656-3.896v7.792a4.179 4.179 0 01-2.656-3.896zm5.617 
                                        3.897V8.09a4.18 4.18 0 012.657 3.897 4.18 4.18 0 01-2.657 3.897z"
                                        fill="#fff">
                                    </path>
                                </svg>

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG svg0">
                                    <path
                                        d="M32 .5H4A3.5 3.5 0 00.5 4v16A3.5 3.5 0 004 23.5h28a3.5 3.5 0 003.5-3.5V4A3.5 3.5 
                                        0 0032 .5z"
                                        fill="#fff">
                                    </path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M4 1a3 3 0 00-3 3v16a3 3 0 003 3h28a3 3 0 003-3V4a3 3 0 00-3-3H4zM0 4a4 4 0 
                                        014-4h28a4 4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
                                        fill="#DFE0E2">
                                    </path>
                                    <path
                                        d="M22.798 12.287c.514.012 1.03-.022 1.542.018.518.097.643.881.183 
                                        1.138-.314.17-.687.063-1.028.093h-.697v-1.249zm1.84-1.413c.113.403-.275.765-.663.71h-1.177c.009-.38-.016-.793.012-1.153.472.014.947-.027 
                                        1.416.022a.56.56 0 01.411.421zm2.831-5.973c.022.769.003 1.579.01 2.364-.002 3.19.003 6.382-.003 
                                        9.573-.02 1.196-1.08 2.235-2.268 2.26-1.189.004-2.378 0-3.567.001v-4.824c1.296-.007 2.592.014 
                                        3.887-.01.6-.038 1.258-.434 1.286-1.095.071-.664-.555-1.123-1.15-1.196-.228-.006-.221-.066 0-.093.567-.123 
                                        1.013-.71.846-1.297-.142-.618-.825-.857-1.393-.856-1.159-.008-2.317 
                                        0-3.476-.003.008-.9-.015-1.802.013-2.702.091-1.175 1.178-2.143 2.35-2.122h3.465z"
                                        fill="url(#paint0_linear_2410_1606)">
                                    </path>
                                    <path
                                        d="M8.55 7.145c.03-1.195 1.095-2.225 2.28-2.243 1.185-.003 2.37 0 3.554-.001-.003 
                                        3.995.007 7.99-.005 11.985-.045 1.18-1.098 2.19-2.271 2.212-1.187.004-2.374 
                                        0-3.56.002v-4.988c1.152.273 2.361.389 3.537.208.703-.113 1.472-.458 
                                        1.71-1.187.175-.624.077-1.28.103-1.921V9.725h-2.035c-.01.984.018 1.969-.015 
                                        2.95-.055.604-.653.988-1.222.968-.706.007-2.106-.512-2.106-.512-.003-1.843.02-4.15.03-5.986z"
                                        fill="url(#paint1_linear_2410_1606)">
                                    </path>
                                    <path
                                        d="M15.143 10.325c-.107.022-.021-.365-.049-.512.008-.93-.015-1.86.013-2.79.091-1.179 
                                        1.186-2.15 2.362-2.122h3.462c-.003 3.995.007 7.99-.004 11.985-.046 1.18-1.099 
                                        2.19-2.272 2.212-1.187.004-2.374 0-3.56.002v-5.465c.81.666 1.911.77 2.921.77.762 0 
                                        1.518-.117 2.258-.292v-1.001c-.834.415-1.813.679-2.736.44-.645-.16-1.112-.783-1.102-1.448-.075-.691.33-1.421 
                                        1.01-1.627.844-.264 1.763-.062 2.554.282.17.088.341.198.274-.085v-.787c-1.323-.314-2.73-.43-4.059-.088-.385.109-.76.273-1.072.526z"
                                        fill="url(#paint2_linear_2410_1606)">
                                    </path>
                                    <defs>
                                        <linearGradient id="paint0_linear_2410_1606" x1="-.236"
                                            y1="11.487" x2="35.764" y2="11.487"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#58B03A"></stop>
                                            <stop offset="1" stopColor="#55B330"></stop>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_2410_1606" x1="-.592"
                                            y1="12.23" x2="35.408" y2="12.23"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0F6EB6"></stop>
                                            <stop offset="1" stopColor="#006DBA"></stop>
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_2410_1606" x1="-.012"
                                            y1="11.72" x2="35.989" y2="11.72"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#DE0D3D"></stop>
                                            <stop offset="1" stopColor="#E30138"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </div>

                            <div className="title__C9SU">Debit - Credit Card</div>

                        </div>

                    </div>

                    <div className="checkoutAccordionItemHeader__G5v8 credit-payment" onClick={_ => setPay('paypal')}>

                        <div className="checkoutAccordionItemRadio__3Ph-">

                            <div className={`dummyRadioButton__3s4A ${pay === 'paypal' && 'checked__RrLR'}`}>

                                <div className='dummyRadioButtonCenter__3kBx'></div>

                            </div>

                        </div>

                        <div className="checkoutAccordionItemTitle__3VHi">

                            <div className="iconGroup__3XtH">

                                <img src="/media/image/public/PayPal.png" style={{ width: '6rem', height: 'auto', margin: '0 .5rem' }}/>

                            </div>

                        </div>

                    </div>

                    <div className="checkoutAccordionItemHeader__G5v8 credit-payment" onClick={_ => setPay('wallet')}>

                        <div className="checkoutAccordionItemRadio__3Ph-">

                            <div className={`dummyRadioButton__3s4A ${pay === 'wallet' && 'checked__RrLR'}`}>

                                <div className='dummyRadioButtonCenter__3kBx'></div>

                            </div>

                        </div>

                        <div className="checkoutAccordionItemTitle__3VHi">

                            <div className="iconGroup__3XtH">

                                <img src="/media/image/public/wallets.png" style={{ width: '15rem', height: 'auto', margin: '0 .5rem' }}/>

                            </div>

                        </div>

                    </div>

                    {
                        tour.pay_later ?
                        <div className="checkoutAccordionItemHeader__G5v8 credit-payment" onClick={_ => setPay('later')}>

                            <div className="checkoutAccordionItemRadio__3Ph-">

                                <div className={`dummyRadioButton__3s4A ${pay === 'later' && 'checked__RrLR'}`}>

                                    <div className='dummyRadioButtonCenter__3kBx'></div>
                                    
                                </div>

                            </div>

                            <div className="checkoutAccordionItemTitle__3VHi">

                                <svg width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon__WoyG">
                                    <path d="M32.543 0H3.457C1.547 0 0 1.857 0 4.148v15.704C0 22.142 1.548 24 3.457 24h29.086C34.453 24 36 22.143 36 
                                        19.852V4.148C36 1.858 34.452 0 32.543 0z" fill="#FFB3C7">
                                    </path>
                                    <path d="M32.635 13.333a.858.858 0 00-.789 1.189.856.856 0 00.79.532c.47 0 .852-.385.852-.86a.854.854 
                                        0 00-.853-.861zm-2.806-.665c0-.651-.551-1.178-1.231-1.178s-1.232.527-1.232 1.178c0 .65.553 1.178 1.233 
                                        1.178s1.23-.528 1.23-1.178zm.005-2.29h1.358v4.58h-1.358v-.293c-.396.273-.866.42-1.348.419a2.405 2.405 0
                                        01-2.394-2.416 2.405 2.405 0 012.395-2.416c.5 0 
                                        .963.154 1.347.42v-.295zm-10.874.596v-.596H17.57v4.58h1.394v-2.139c0-.722.775-1.109 1.312-1.109h.016v-1.332c-.552 
                                        0-1.058.239-1.33.596zm-3.466 1.694c0-.651-.55-1.178-1.23-1.178-.68 0-1.232.527-1.232 1.178 0 .65.552 1.178 1.232 
                                        1.178.68 0 1.23-.528 1.23-1.178zm.005-2.29h1.36v4.58h-1.36v-.293c-.384.264-.847.419-1.347.419a2.405 2.405 0 
                                        01-2.394-2.416 2.405 2.405 0 012.394-2.416c.5 0 .963.154 1.347.42v-.295zm8.179-.123c-.543 
                                        0-1.056.17-1.4.638v-.515h-1.353v4.58h1.37V12.55c0-.696.462-1.037 1.02-1.037.596 0 .94.36.94 
                                        1.027v2.416h1.357v-2.912c0-1.065-.84-1.79-1.934-1.79zm-13.9 
                                        4.702h1.423v-6.62H9.779v6.62zm-6.247.002h1.506V8.336H3.53v6.623zm5.268-6.623a5.291 5.291 0 01-1.54 3.76l2.081 
                                        2.863H7.48L5.22 11.847l.584-.441a3.814 3.814 0 001.521-3.07H8.8z" fill="#0A0B09">
                                    </path>
                                </svg>

                                <div className="title__C9SU">Buy now, pay later</div>

                            </div>

                        </div> : ''
                    }
                    
                </div>

            </div>

            <div className="actions full-width">
                {
                    pay === 'paytabs' ?
                    <button type="button" onClick={pay_now} className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn">
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                            <path d="M10 10.73c0-.28.2-.52.47-.57l.32-.07c1.1-.22 2.1-.82 2.83-1.68a.5.5 0 01.75 0 4.9 4.9 0 
                                002.85 1.66l.31.06c.27.05.47.29.47.57v2.55a4.85 4.85 0 01-2.68 4.34l-1.16.58a.35.35 0 
                                01-.32 0l-1.16-.58A4.85 4.85 0 0110 13.25v-2.52z">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 6.25v-1a3 3 0 116 0v1h1.5c.65 0 1.2.41 1.41.99-.33.02-.66.15-.92.4a.5.5 0 
                                00-.49-.39h-9a.5.5 0 00-.5.5v8c0 .28.22.5.5.5h6.33c.21.36.46.7.75 1H3.5a1.5 1.5 0 01-1.5-1.5v-8c0-.83.67-1.5 1.5-1.5H5zm1-1a2 
                                2 0 114 0v1H6v-1z">
                            </path>
                            <path d="M9 11.25a1 1 0 10-2 0 1 1 0 002 0z"></path>
                        </svg>
                        Book Now
                    </button> :
                    pay === 'paypal' ?
                    <button type="button" onClick={pay_now} className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn paypal">
                        <img src="/media/image/public/PayPal.png" style={{ width: '5.55rem', height: 'auto' }}/>
                    </button> :
                    pay === 'wallet' ?
                    <button type="button" onClick={pay_now} className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn">
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon__3A1i">
                            <path d="M10 10.73c0-.28.2-.52.47-.57l.32-.07c1.1-.22 2.1-.82 2.83-1.68a.5.5 0 01.75 0 4.9 4.9 0 
                                002.85 1.66l.31.06c.27.05.47.29.47.57v2.55a4.85 4.85 0 01-2.68 4.34l-1.16.58a.35.35 0 
                                01-.32 0l-1.16-.58A4.85 4.85 0 0110 13.25v-2.52z">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 6.25v-1a3 3 0 116 0v1h1.5c.65 0 1.2.41 1.41.99-.33.02-.66.15-.92.4a.5.5 0 
                                00-.49-.39h-9a.5.5 0 00-.5.5v8c0 .28.22.5.5.5h6.33c.21.36.46.7.75 1H3.5a1.5 1.5 0 01-1.5-1.5v-8c0-.83.67-1.5 1.5-1.5H5zm1-1a2 
                                2 0 114 0v1H6v-1z">
                            </path>
                            <path d="M9 11.25a1 1 0 10-2 0 1 1 0 002 0z"></path>
                        </svg>
                        Mobile Wallets
                    </button> :
                    pay === 'later' ?
                    <button type="button" onClick={pay_later} className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn" style={{ background: '#e7515a', borderColor: '#e7515a' }}>
                        Pay Later
                    </button> :
                    <button type="button" className="button__3DBl fill__3uxT md__3J_k fillWidth__82Bn none">
                        Choice payment
                    </button>
                }
                {
                    loading && <div className="actions-loader small"></div>
                }
            </div>

            <div className="thirdPartyDisclaimerText__2mMM default">
                © Kimitours, Inc. By clicking 'Pay Button', you agree that you will be  sent special offers,
                inspiration, tips and other updates from Kimitours from which you can unsubscribe at any time.
            </div>

        </form>

    )

}
