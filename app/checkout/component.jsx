"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Success from "./success";
import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import Footer from "./footer";
import { Fragment, useEffect, useState } from "react";
import { api, get_session, remove_session, set_session } from "@/public/script/public";
import { useRouter } from "next/navigation";
import $ from "jquery";

export default function Checkout ({ settings }) {

    const router = useRouter();
    const [tour, setTour] = useState('');
    const [data, setData] = useState('');
    const [coupon, setCoupon] = useState('');
    const [price, setPrice] = useState(0);
    const [flash, setFlash] = useState(false);

    const show_coupon = () => {
        
        $('.promo-code-button').hide();
        $(".check-promo").fadeIn(200).css('display', 'flex');
        $(".check-promo input").val('').focus();

    }
    const check_coupon = async () => {

        $(".check-promo .apply").addClass("none-button");
        $(".check-promo input").attr('disabled', true);

        const response = await api(`home/products/${tour.id}/coupon`, {coupon: coupon, adults: tour.adults || 1});

        if ( response.price ) {
            $('.discounts__1Mi3, .discounts__1Mi3').fadeOut(100);
            let tour_ = tour;
            tour_.coupon = coupon;
            setTour(tour_);
            setPrice(response.price)
            sessionStorage.setItem('coupon', coupon);
        }
        else {
            $('.check-promo .formInput__2IHK').addClass('error');
            $(".check-promo .apply").removeClass("none-button");
            $(".check-promo input").attr('disabled', false);
        }

    }
    useEffect(() => {

        if ( !get_session('tour', false) ) return router.replace('/');
        setTour(get_session('tour', false));
        let user_data = get_session('user') || {id: 0};
        setPrice(get_session('tour', false).new_price * parseInt(get_session('tour', false)?.adults) || 0);
        
        setData({
            ...data, name: user_data.name || '',
            email: user_data.email || '', phone: user_data.phone || '',
            name1: user_data.name ? user_data.name.split(' ')[0] : '',
            name2: user_data.name ? user_data.name.split(' ').slice(1).join(' ') : '',
        });

        $(".checkout").on("keyup", "input", function(){
            if ( $(this).val() ) $(this).parents(".formInput__2IHK").removeClass("error");
            else $(this).parents(".formInput__2IHK").addClass("error");
        });
        $(".checkout").on("click", ".promo-code-button", function(){
            $(this).hide();
            $(this).parents(".promo-code").find(".check-promo").css("display", "flex");
            $(this).parents(".promo-code").find(".check-promo input").val("");
            $(this).parents(".promo-code").find(".check-promo").children().removeClass("error");
        });
        $(window).on("resize load", function(){

            if ( $(window).width() < 1025 ) {

                $("nav").css("position", "static");
                $(".space-nav").hide();
                $(".checkout").css("width", "100%");
                $(".checkout .show-top-side").css("position", "static");
                $(".space-button").hide();
                
                if ( $(".main-container").scrollTop() > 55 ) {
                    $(".checkout .show-top-side").css("position", "fixed");
                    $(".space-button").show();
                }
            }
            else {
                $("nav").css("position", "fixed");
                $(".space-nav").show();
                $(".top-side").hide();
            }

        });

    }, []);

    return (

        <Fragment>

            <Nav small settings={settings}/>
            
            {
                flash ? <Success data={flash}/> :

                <div className="main-container relative">

                    <Chat settings={settings}/>

                    {
                        tour ?
                        <div className="checkout full-width">

                            <Topbar tour={tour} price={price} coupon={coupon} show_coupon={show_coupon} check_coupon={check_coupon} setCoupon={setCoupon}/>

                            <div className="full-width main-details">

                                <div className="container__1ksl nomargin__3NWI">

                                    <div className="row__3-k3 nogutter__1VXx main-div">
                                        
                                        <Template1 data={data} setData={setData} tour={tour}/>
                                        
                                        <Template2 data={data} setData={setData} tour={tour}/>

                                        <Template3 data={data} setData={setData} tour={tour} setFlash={setFlash} price={price}/>

                                        <Sidebar tour={tour} price={price} coupon={coupon} show_coupon={show_coupon} check_coupon={check_coupon} setCoupon={setCoupon}/>

                                    </div>

                                </div>

                                <Footer settings={settings}/>

                            </div>

                            <div className="loader fill hide"></div>

                        </div> :
                        <div className="loader fill"></div>
                    }
                </div>

            }

        </Fragment>

    )

}
