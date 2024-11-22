"use client";
import Link from "next/link";
import { date } from "@/public/script/public";

export default function Footer ({ settings }) {

    return (
         
        <div className="container__1RYq footer">

            <main className="container__1ksl" style={{margin: "auto", padding: "0 .5rem"}}>

                <div className="row__3-k3">

                    <div className="col__TB11">

                        <div className="content__2Iyb" style={{flexDirection: "row", flexWrap: "wrap"}}>

                            <span className="legalNotice__2fw5">© {date('year')} {settings.name}, Inc.</span>

                            <span className="separator__2mJK">•</span>

                            <Link href="/policy" className="link__hxmD">Terms &amp; Conditions</Link>

                            <span className="separator__2mJK">•</span>

                            <Link href="/policy" className="link__hxmD">Cookie Consent</Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )

}
