"use client";
import { host, position, print, parse } from "@/public/script/public";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Stripe from "stripe";
import Form from "./form";
import Payments from "./payments";
import $ from "jquery";

// const stripe = new Stripe("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");
// const promise = loadStripe("pk_live_51OS5oAIvJPP1viMaF5dFwrUNhbEcfU4w4wknW6K5L5VpP2gpQbtbUTWQVhPQtuLXiQWAz9PjoRzbrvtVyUyvlgR500wN5E6Pi5");
const stripe = new Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Template3 ({ data, tour, setFlash, price }) {

    const [options, setOptions] = useState({});

    const edit_step = ( step ) => {

        if ( step === 1 ) {
            $(".payment-div").hide();
            $(".details-div").hide();
            $(".contact-div").show();
            $(".main-container").scrollTop(0);
        }
        else {
            $(".payment-div").hide();
            $(".contact-div").hide();
            $(".details-div").show();
            $(".main-container").scrollTop(position(".details-div .details-information", "top") - 80);
        }

    }
    const set_options = async() => {

        const params = {
            amount: Math.ceil(price * 100),
            currency: 'USD',
            description: tour.name,
            automatic_payment_methods: { enabled: true, },
        };

        const payment_intent = await stripe.paymentIntents.create(params);

        let data = {
            clientSecret: payment_intent.client_secret,
            appearance: {theme: 'stripe', labels: 'floating'},
        };

        setOptions(data);

    }
    useEffect(() => {

        // set_options();

    }, [price]);
    useEffect(() => {

        $(".checkout").on("click", ".credit-payment", function(){
            $(".checkoutAccordionItemHeader__G5v8").each(function(){
                $(this).find(".dummyRadioButton__3s4A").removeClass("checked__RrLR");
            });
            $(this).find(".dummyRadioButton__3s4A").addClass("checked__RrLR");
        });

    }, []);

    return (
         
        <div className="col__TB11 nogutter__1VXx payment-div hide">

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

                        <button className="link__WYUw edit-contact" onClick={_ => edit_step(1)}>Edit</button>

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

            <div className="details-info">

                <div className="container__2sPS">

                    <div className="titleContainer__1Ksc">

                        <span className="title__1Wwg title4__AH0S">

                            <div className="container__q6y1">

                                <div className="iconContainer__1izA">

                                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.746 10.889a51.348 51.348 0 01-1.963 1.768l-.936.806v1.079h6.318v-1.235h-4.12l.584-.52a29.079 
                                            29.079 0 001.665-1.573c.441-.46.819-.975 1.13-1.547a3.69 3.69 0 
                                            00.482-1.807c0-.867-.27-1.56-.806-2.08-.53-.52-1.266-.78-2.21-.78-.876 0-1.6.264-2.172.793-.563.52-.858 
                                            1.274-.884 2.262h1.43c.018-.546.165-.98.442-1.3.286-.33.685-.494 1.196-.494.53 0 .915.147 
                                            1.158.442.25.295.377.702.377 1.222 0 .503-.16 1.005-.481 1.508-.321.503-.724.988-1.21 1.456z" 
                                            fill="currentColor">
                                        </path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 
                                            10-10S15.523 0 10 0zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" fill="currentColor">
                                        </path>
                                    </svg>

                                </div>

                                <div className="head">Activity details</div>

                            </div>

                        </span>

                        <button className="link__WYUw edit-details" onClick={_ => edit_step(2)}>Edit</button>

                    </div>

                    <div className="default">

                        <div className="container__i2F7 mutedContainer__8znM">

                            <div className="headerContainer__2qUH">

                                <div className="image__3r17 mutedImage__1suS tour-image layer relative">
                                        
                                    {/* <Image className="" src={`${host}${tour.image}`} fill sizes="100%" alt="" style={{ borderRadius: '.3rem'}}/> */}
                                    <img src={`${host}${tour.image}`} style={{ borderRadius: '.3rem', width: '100%', height: '100%'}}/>
                                    
                                </div>

                                <div className="titleContainer__1_0w">

                                    <span className="title__1Wwg title__2NjH title5__XmMG title hidden-title">
                                        {parse(tour.name)}
                                    </span>

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

                                            <small className="cancel-datetime">{tour.cancellation}</small>

                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <hr/>

                        <div className="titleWrapper__16Yj"><span className="title__1Wwg title5__XmMG">Other details</span></div>

                        <div className="mb-1"><span className="label__IuI-">Pickup location : </span><span className="pick-up">{data.pick_up}</span></div>

                    </div>

                </div>

            </div>

            <div className="payment-information">

                <div className="container__3RER">

                    <div className="titleContainer__1sC5">

                        <span className="title__1Wwg title4__AH0S">

                            <div className="container__q6y1">

                                <div className="iconContainer__1izA">

                                    <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14zm11.084-6.064c-.78.624-1.206 
                                            1.494-1.278 2.61h1.998c.072-.504.294-.924.666-1.26.372-.348.894-.522 1.566-.522.684 0 1.212.174 
                                            1.584.522.372.336.558.792.558 1.368 0 .672-.258 1.164-.774 
                                            1.476-.504.312-1.242.474-2.214.486h-.486v1.692h.468c1.104 0 1.92.18 2.448.54.54.348.81.942.81 1.782 0 
                                            .636-.198 1.158-.594 1.566-.396.396-.96.594-1.692.594-.756 0-1.356-.198-1.8-.594-.444-.408-.69-.93-.738-1.566h-1.98c.06 
                                            1.248.504 2.208 1.332 2.88.84.66 1.908.99 3.204.99.888 0 1.65-.156 2.286-.468.636-.324 1.116-.762 
                                            1.44-1.314.324-.552.486-1.182.486-1.89 0-.888-.198-1.614-.594-2.178-.396-.576-.948-.972-1.656-1.188v-.072c.552-.18 1.026-.534 
                                            1.422-1.062.396-.528.594-1.164.594-1.908 
                                            0-.648-.156-1.23-.468-1.746-.312-.516-.774-.924-1.386-1.224-.612-.3-1.338-.45-2.178-.45-1.224 0-2.232.312-3.024.936z"
                                            fill="currentColor">
                                        </path>
                                    </svg>

                                </div>

                                <div className="head">Payment details</div>

                            </div>

                        </span>

                    </div>

                    {/* {
                        options.clientSecret &&
                        <Elements options={options} stripe={promise}>
                            <Form data={data} tour={tour} setFlash={setFlash}/>
                        </Elements>
                    } */}
                    
                    <Payments data={data} tour={tour} setFlash={setFlash} price={price}/>

                </div>

            </div>
            
        </div>

    )

}
