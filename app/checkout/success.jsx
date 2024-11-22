"use client";
import { useEffect } from "react";
import { copy } from "@/public/script/public";
import Link from "next/link";
import $ from "jquery";

export default function Success ({ data }) {

    useEffect(() => {

        $(".pay-loader").fadeOut(1000);

    }, []);

    return (

        <div className="main-container success-page">

            <main className="flex flex-column">

                <div className="flex check">
                    <span className="material-symbols-outlined">check_circle</span>
                </div>

                <h1>
                    Booking successfully placed
                </h1>

                <div className="info">
                    <div className="number">
                        Your booking number :
                        <span>
                            {data.id}
                            <span className="material-symbols-outlined" title="Copy ID" onClick={_ => copy(data.id)}>content_copy</span>
                        </span>
                    </div>
                </div>

                <p>
                    You will receive an e-mail confirmation shortly to
                    <Link href="https://mail.google.com/mail" target="_blank">{data.email}</Link>
                </p>

                <ul>
                    <li>ORDER TOTAL</li>
                    <li>${parseFloat(data.price).toFixed(2)}</li>
                </ul>

                <ul className="type">
                    <li>Payment Method</li>
                    {
                        data.paid ?
                        <li><span className="material-symbols-outlined">credit_card</span>Master Card</li> :
                        <li>Pay later</li>
                    }
                </ul>

                <div className="buttons">
                    <Link href="/">Home</Link>
                    <Link href="/bookings">My Bookings</Link>
                </div>

            </main>

            <div className="loader fill pay-loader"></div>

            <div className="celebrate">
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
            </div>

        </div>

    )

}
