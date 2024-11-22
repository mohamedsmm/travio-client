"use client";
import { Fragment, useEffect } from "react";
import $ from "jquery";

export default function Actions () {

    useEffect(() => {
        
        // search
        $(".show-search-side").click(function(){
            $(".result .left").fadeIn().css("display", "flex");
        });
        $(".close-search-side").click(function(){
            $(".result .left").fadeOut();
        });
        $(document).on("click", function(e){
            if ( $(e.target).hasClass("left") ) $(".result .left").fadeOut();
        });
   
    }, []);

    return <Fragment></Fragment>

}