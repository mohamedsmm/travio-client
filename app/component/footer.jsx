"use client";
import { Fragment } from "react";
import Link from "next/link";
import $ from "jquery";
import Image from 'next/image';

export default function Footer ({ page, settings }) {

    return (

        <Fragment>

            <div className="full-width flex-column scroll-bar">
                
                <main className="flex-space">
            
                    <ul className="pages flex">
                        
                        {
                            !page ?
                            <a className="no-hover">Home</a> :
                            <div>
                                <Link href="/">Home</Link>
                                <i className="fa fa-angle-right"></i>
                                <a className="no-hover">{page}</a>
                            </div>
                        }
                        
                    </ul>
            
                    <ul className="scroll-up flex" onClick={_ => $(".main-container").scrollTop(0)}>
                        
                        <i className="fa fa-angle-up circle go-up pointer flex"></i>
                        
                        <span>Scroll Top</span>
            
                    </ul>
                    
                </main>
            
            </div>

            <footer className="full-width flex flex-column">

                <main>

                    <ul className="full-width flex flex-column">

                        <li className="full-width flex flex-space">

                            <Link href="/" className="flex logo">
                                
                                <div className="image">

                                    <img src="/media/image/public/logo1.png" style={{ width: '8rem', height: '2.5rem' }}/>

                                </div>
                                
                            </Link>

                            <div className="flex flex-end">

                                <a href={settings.facebook} className="flex" target="_blank"> <i className="fa fa-facebook"></i> </a>
                                <a href={settings.youtube} className="flex" target="_blank"> <i className="fa fa-youtube"></i> </a>
                                <a href={settings.instagram} className="flex" target="_blank"> <i className="fa fa-instagram"></i> </a>
                                <a href={settings.telegram} className="flex" target="_blank"> <i className="fa fa-telegram"></i> </a>
                                <a href={settings.twetter} className="flex" target="_blank"> <i className="fa fa-twitter"></i> </a>

                            </div>

                        </li>

                        <li className="full-width flex flex-space align-start">

                            <div className="flex flex-column align-start">

                                <a>About</a>
                                <a className="text">
                                    We are a weight loss center that specializes in following people's bodies
                                    We are looking forward to expanding our offering soon to cover the whole country and 
                                    keep track of the status (offline).
                                </a>

                            </div>

                            <div className="flex flex-column align-start">

                                <a>Quick Links</a>
                                <Link href="/">Home</Link>
                                <Link href="/wishlist">Wishlist</Link>
                                <Link href="/bookings">Bookings</Link>
                                <Link href="/policy">Policy & Terms</Link>
                                <Link href="/help">Help</Link>

                            </div>

                            <div className="flex flex-column align-start">

                                <a>Contact Us</a>
                                <a className="flex" href={`tel:${settings.phone}`}>{settings.phone}</a>
                                <a className="flex">{settings.email}</a>
                                <a className="flex">{settings.city}</a>

                            </div>

                            <div className="flex flex-column align-start">

                                <a>Blogs</a>
                                <a>News about a person's concern</a>
                                <a>Share news about Choose the best foods</a>
                                <a>Fast food</a>
                                <a>Part in the most important Calorie</a>
                                <a>Food Guide makes it easy</a>

                            </div>

                        </li>

                    </ul>

                </main>

                <div className="copyright full-width flex flex-column">

                    <hr/>
                    <main className="flex">
                        <p className="full-width flex  defualt no-select">
                            <span>
                                {settings.name} ® All right are reversed ® Powerd by ❤️ : &nbsp;
                                <Link href="https://wa.me/+201067204185" target="_blank" style={{ color: 'yellow', fontSize: '.8rem', opacity: '.7' }}>Mohamed Abdo</Link>
                            </span>
                        </p>
                    </main>

                </div>

            </footer>

        </Fragment>

    )

}
