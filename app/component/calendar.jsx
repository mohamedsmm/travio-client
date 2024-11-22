"use client";
import { date, position, check_class } from "@/public/script/public";
import { useEffect } from "react";
import $ from "jquery";

export default function Calendar () {

    const set_days = (first_day, num_days, month, year) => {
        
        $(".calendar .list-days ul").each(function(){ $(this).html(""); });
    
        let current_list = 0, today = 0;
    
        for ( let ch = 0; ch < num_days; ch++ ) {
    
            if ( ch % 7 == 0 ) current_list++;
    
            if ( ch < first_day ) {
                $(`.calendar .list-days #days_${current_list}`).append(`<li class="no-visible">0</li>`);
                num_days++;
            }
            else {
    
                today++;
    
                if ( today < parseInt(date("day")) && month <= parseInt(date("month")) && year <= parseInt(date("year")) )
                    $(`.calendar .list-days #days_${current_list}`).append(`<li class="none">${today}</li>`);
                else if ( today == parseInt(date("day")) && month == parseInt(date("month")) && year == parseInt(date("year")) )
                    $(`.calendar .list-days #days_${current_list}`).append(`<li class="active">${today}</li>`);
                else
                    $(`.calendar .list-days #days_${current_list}`).append(`<li>${today}</li>`);
    
            }
    
        }
    
        var last_length1 = 7 - $(".calendar .list-days #days_5 li").length;
        var last_length2 = 7 - $(".calendar .list-days #days_6 li").length;

        for ( let ch = 0; ch < last_length1; ch++ ) $(`.calendar .list-days #days_5`).append(`<li class="no-visible">0</li>`);
        if ( last_length2 < 7 )
        for ( let ch = 0; ch < last_length2; ch++ ) $(`.calendar .list-days #days_6`).append(`<li class="no-visible">0</li>`);
    
    }
    const change_month = (month, year) => {
        
        var name = date("month_list")[month-1];
        var end_year = parseInt(year) == parseInt(date("year")) + 1;
        var start_year = parseInt(year) == parseInt(date("year"));
    
        if ( month == 12 && end_year ) $(".calendar .next").addClass("no-visible");
        else $(".calendar .next").removeClass("no-visible");
        if ( ( month == 1 || month == date("month") ) && start_year ) $(".calendar .prev").addClass("no-visible");
        else $(".calendar .prev").removeClass("no-visible");
    
        $(".calendar .month").data("month", month).data("year", year).text(`${name} ${year}`);
        let current_date = new Date(`${year}-${month}-1`);
        var first_day = current_date.getDay();
        current_date = new Date(year, month, 0);
        var num_days = current_date.getDate();
        set_days(first_day, num_days, month, year);
    
    }
    const active_date = () => {
        
        let year = parseInt($(".calendar").attr("base_date").split("-")[0]);
        let month = parseInt($(".calendar").attr("base_date").split("-")[1]);
        let day = parseInt($(".calendar").attr("base_date").split("-")[2]);
        change_month(month, year);
        $(".calendar .list-days").find("li").removeClass("active");
        $(".calendar .list-days").find("li").each(function(){
            if ( parseInt($(this).text().trim()) == day ) $(this).addClass("active");
        });
    
    }
    const show_calendar = (top, left, width) => {
        
        $(".calendar").css({"top": top || "5rem", "left": left || "5rem", "width": width || "23rem"});
        $('.calendar').css({"transform": "scale(0)", "transition": "all .2s linear"});
        $(".calendar").show();
        active_date();
        setTimeout( _ => { $(".calendar").css("transform", "scale(1)"); });
        if ( $(window).width() > 600 ) $(".main-container").scrollTop(100);
        else $(".main-container").scrollTop(400);
    
    }
    const hide_calendar = () => {
    
        $(".calendar").css("transform", "scale(0)");
        setTimeout( _ => { $(".calendar").hide(); }, 150);
    
    }
    const active_month = (next=true) => {
        
        let current_month = parseInt($(".calendar .first .month").data("month"));
        let current_year = parseInt($(".calendar .first .month").data("year"));
        if ( next ) current_month++;
        else current_month--;
        if ( current_month < 1 ) { current_month = 12; current_year--; }
        if ( current_month > 12 ) { current_month = 1; current_year++; }
    
        change_month(current_month, current_year);
    
        $(".calendar .list-days").find("li").removeClass("active");
        let year = parseInt($(".calendar").attr("base_date").split("-")[0]);
        let month = parseInt($(".calendar").attr("base_date").split("-")[1]);
        let day = parseInt($(".calendar").attr("base_date").split("-")[2]);
        if ( year == current_year && month == current_month ) {
            $(".calendar .list-days").find("li").each(function(){
                if ( parseInt($(this).text().trim()) == day ) $(this).addClass("active");
            });
        }
    
    }
    const calendar_date = () => {
    
        let el = $(".calendar ul .active");
        if ( $(el).hasClass("none") ) return true;
        var year = $(".calendar .first .month").data("year");
        var month = $(".calendar .first .month").data("month");
        var day = $(el).text();
        var day_name = date("day_list")[$(el).index()];
        var month_name = date("month_list")[month-1].slice(0, 3);
        var date_ = `${day_name}, ${month_name} ${day}, ${year}`;
        $(".calendar").attr("date", date_);
        if ( parseInt(day) < 10 ) day = `0${day}`;
        if ( parseInt(month) < 10 ) month = `0${month}`;
        $(".calendar").attr("base_date", `${year}-${month}-${day}`);
        hide_calendar();
        return date_;
    
    }
    useEffect(() => {

        change_month(date("month"), date("year"));
        calendar_date();
    
        $(".show-calendar .date_").each(function(){
            $(this).text(date('today')).attr('date', $(".calendar").attr("base_date"));
        });
        $(".calendar").on("click", ".prev", function(){
    
            active_month(false);
            
        });
        $(".calendar").on("click", ".next", function(){
    
            active_month();
    
        });
        $(document).on("click", ".calendar .list-days li:not(.none)", function(){
            $(".calendar .list-days li").each(function(){ $(this).removeClass("active") });
            $(this).addClass("active");
            calendar_date();
            $(".show-calendar .date").text($(".calendar").attr("date")).attr("date", $(".calendar").attr("base_date"));
            $(".show-calendar .reset-p").show();
            $(".show-calendar").removeClass("error");
        });
        $(".tour").on("click", ".show-calendar", function(e){
            if ( $(e.target).hasClass('reset-p') ) return;
            let top = position(this, "top") + $(this).outerHeight() + 2;
            let left = position(this, "left");
            let width = $(this).outerWidth();
            if ( $(window).width() < 1025 ) {
                left = "0";
            }
            show_calendar(top, left, width);
        });
        $(".search-box").on("click", ".show-calendar", function(e){
            if ( $(e.target).hasClass('reset-p') ) return;
            let top = position(this, "top") + $(this).outerHeight() + 2;
            let left = position(this, "left");
            let width = 350;
            if ( $(window).width() < 600 ) {
                width = $(this).outerWidth();
            }
            show_calendar(top, left, width);
        });
        $("header").on("click", ".show-calendar", function(e){
            if ( $(e.target).hasClass('reset-p') ) return;
            let top = position(this, "top") + $(this).outerHeight() + 2;
            let left = position(this, "left");
            let width = $(this).outerWidth() + 80;
            show_calendar(top, left, width);
        });
        $(document).on("click", function(e){
            
            if ( !check_class(e.target, 'calendar') && !check_class(e.target, 'show-calendar') ) hide_calendar();
    
        });
        
    }, []);

    return (

        <div className="calendar absolute hide">

            <div className="first full-width flex-space">

                <i className="fa fa-angle-left circle pointer flex prev"></i>

                <span className="month default"></span>

                <i className="fa fa-angle-right circle pointer flex next"></i>

            </div>

            <div className="days flex-column full-width">

                <ul className="names flex-space full-width">
                    <li id="1">Sun</li>
                    <li id="2">Mon</li>
                    <li id="3">Tus</li>
                    <li id="4">Wed</li>
                    <li id="5">Thu</li>
                    <li id="6">Fri</li>
                    <li id="7">Sat</li>
                </ul>

                <div className="list-days full-width flex-column">

                    <ul className="full-width flex-space" id="days_1"></ul>
                    <ul className="full-width flex-space" id="days_2"></ul>
                    <ul className="full-width flex-space" id="days_3"></ul>
                    <ul className="full-width flex-space" id="days_4"></ul>
                    <ul className="full-width flex-space" id="days_5"></ul>
                    <ul className="full-width flex-space" id="days_6"></ul>

                </div>

            </div>

            <hr className="flex full-width"/>

            <p className="full-width flex default">Prices shown in USD</p>

        </div>

    )

}
