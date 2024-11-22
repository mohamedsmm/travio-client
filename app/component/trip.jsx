"use client";
import { useEffect } from "react";
import $ from "jquery";

export default function Trip () {

    const set_platform = () => {

        $(".trip-advisor").css({"margin": "4rem auto 5rem"});
        $(".trip-advisor .Main__Container-sc-1oq93m5-0 > a, .eapps-widget-toolbar").remove();
        $(".trip-advisor .WidgetTitle__Header-sc-ruy1gu-2").css({'margin': "4rem auto 3rem", "font-size": "1.4rem"});
        $(".trip-advisor .HeaderContainer__Inner-sc-1532ffp-0").css({"background": "rgb(236, 254, 250)"});
        $(".trip-advisor .ReviewBackground__Container-sc-1djobrq-0").css({"background": "rgb(236, 254, 250)"});
        $(".trip-advisor button.ButtonBase__ButtonContainer-sc-p43e7i-3").html(`
            <span class="ButtonBase__Overlay-sc-p43e7i-4 jUXzLe" style="padding: 10px 20px; background-color: var(--site-color); font-size: .95rem">
                <span class="ButtonBase__Ellipsis-sc-p43e7i-5 dqiKFy">Write a review</span>
            </span>
        `).css({"border": "0"});
        $(".trip-advisor .es-ai-summary-list-item-text").css({"text-align": "left", "font-size": ".85rem"});
        $(".trip-advisor .es-review-content-text").css({"text-align": "left", "font-size": ".8rem"});
        $(".trip-advisor .ReviewText__Title-sc-t7690a-1").css({"text-align": "left", "margin": "1rem 0", 'font-size': '.9rem'});
        $(".trip-advisor .ReviewText__Control-sc-t7690a-2").css({"margin": "1rem 0 0", "font-size": ".85rem"});
        $(".trip-advisor .AISummaryContent__StyledCheckmark-sc-12d8ue6-4").css({"width": ".7rem", "fill": "#777"});
        $(".trip-advisor .AISummaryAuthorBlock__Caption-sc-1yev70j-0").css({"text-align": "left"});
        $(".trip-advisor .ReviewSource__StyledReviewInfo-sc-8wz9s2-5").css({"text-align": "left"});
        $(".trip-advisor .ReviewSource__StyledReviewInfo-sc-8wz9s2-5 div div").css({"text-align": "left", "font-size": ".8rem"});
        $(".trip-advisor .HeaderTotalReviews__Container-sc-14hjk3j-0").css({"display": "none"});
        $(".trip-advisor .WidgetBackground__Content-sc-1ho7q3r-2 > a").remove();

        if ( $(window).width() < 1025 ) {
            $(".trip-advisor .WidgetTitle__Header-sc-ruy1gu-2").css({'margin': "4rem auto 3rem", "font-size": "1.2rem"});
        }

    }
    useEffect(() => {

        setTimeout(_ => {

            $(".trip-advisor").html(`
                <script src="https://static.elfsight.com/platform/platform.js"></script>
                <div class="elfsight-app-43f45cc0-c0c7-4ee4-9c04-e8429ff37133"></div>
            `);

            setInterval(set_platform, 2000);

        });

    }, []);
    
    return (

        <div className="trip-advisor"></div>

    )

}
