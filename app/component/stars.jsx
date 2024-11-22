"use client";
import { Fragment } from "react";
import $ from "jquery";

export default function Stars ({ count }) {

    return (

        <Fragment>

            <div className="stars-div">

                <i className={count < 1 ? count <= 0 ? 'fa fa-star-o' : 'fa fa-star-half-full' : 'fa fa-star'}></i>
                <i className={count < 2 ? count <= 1 ? 'fa fa-star-o' : 'fa fa-star-half-full' : 'fa fa-star'}></i>
                <i className={count < 3 ? count <= 2 ? 'fa fa-star-o' : 'fa fa-star-half-full' : 'fa fa-star'}></i>
                <i className={count < 4 ? count <= 3 ? 'fa fa-star-o' : 'fa fa-star-half-full' : 'fa fa-star'}></i>
                <i className={count < 5 ? count <= 4 ? 'fa fa-star-o' : 'fa fa-star-half-full' : 'fa fa-star'}></i>

            </div>

        </Fragment>

    )

}
