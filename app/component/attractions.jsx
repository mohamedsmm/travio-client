"use client";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import $ from "jquery";

export default function Attractions ({ data }) {

    useEffect(() => {
        
        $(".loader").fadeOut(500);

    });

    return (

        <Fragment>

            <ul className="flex-start full-width feat4 relative">
                
                <div className="loader fill"></div>

                <li className="flex"><Link href="/">Things to do in Cairo</Link></li>
                <li className="flex"><Link href="/">Things to do in Giza</Link></li>
                <li className="flex"><Link href="/">Things to do in Alxendria</Link></li>
                <li className="flex"><Link href="/">Things to do in Aswan</Link></li>
                <li className="flex"><Link href="/">Things to do in Abu simbel</Link></li>
                <li className="flex"><Link href="/">Things to do in Egyption museum</Link></li>
                <li className="flex"><Link href="/">Things to do in Sant catherine</Link></li>
                <li className="flex"><Link href="/">Things to do in Siwa</Link></li>
                <li className="flex"><Link href="/">Things to do in Giza</Link></li>
                <li className="flex"><Link href="/">Things to do in Sinai</Link></li>
                <li className="flex"><Link href="/">Things to do in Sant catherine</Link></li>
                <li className="flex"><Link href="/">Things to do in Abydos</Link></li>
                <li className="flex"><Link href="/">Things to do in Siwa Oasis</Link></li>
                <li className="flex"><Link href="/">Things to do in Sinai</Link></li>
                <li className="flex"><Link href="/">Things to do in Abu simbel</Link></li>
                <li className="flex"><Link href="/">Things to do in Siwa Oasis</Link></li>

            </ul>

        </Fragment>
        
    )

}
