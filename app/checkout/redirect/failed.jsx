"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Failed () {

    const router = useRouter();

    useEffect(() => {

        router.replace('/checkout');

    }, []);

    return (

        <div className="main-container success-page">

            <div className="loader fill pay-loader"></div>

        </div>

    )

}
