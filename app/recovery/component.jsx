"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { api, get_session } from "@/public/script/public";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Recovery ({ settings }) {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [flash, setFlash] = useState(false);

    const send = async(_) => {

        _.preventDefault();

        $(".form-loader, .recovery-faild").css("display", "flex");

        const response = await api("auth/recovery", {email: email});

        $(".form-loader").fadeOut(200);

        setFlash(response.status)

    }
    useEffect(() => {

        if ( get_session("user") ) return router.replace("/account");

        $(".form-loader").hide();

    }, []);

    return (

        <Fragment>

            <Nav settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">
                
                <main className="flex-column relative">

                    {
                        flash ?
                        <div className="recovery-form recovery form2 flex-column login-form register-form">
                            
                            <div className="image"><img src="/media/image/public/log.png"/></div>
                
                            <form className="flex-column full-width">
                
                                <h1>Password Recovery</h1>
                
                                <p>
                                    E-mail has been to your mail-box, &nbsp;
                                    <Link href="https://mail.google.com/mail/u/0/#inbox" target="_blank">check your inbox</Link>
                                </p>
                
                                <div className="resend full-width flex-column">
                
                                    <p>Haven't received the email yet ?</p>
                
                                    <span className="resend-password pointer" onClick={send}>Resend</span>
                
                                </div>
                
                                <Link href="/login" className="pointer full-width flex back">Back to Log In</Link>
                
                            </form>
                
                        </div> :
                        <div className="recovery-form recovery1 flex-column form2 register-form login-form">

                            <div className="image"><img src="/media/image/public/log.png"/></div>
                
                            <form className="flex-column full-width" onSubmit={send}>
                
                                <h1>Password recovery</h1>
                
                                <p>To start changing your password, please enter email.</p>
                
                                <div className="input flex-start full-width relative">
                
                                    <label className="flex-start absolute">E-mail</label>
                                    <i className="fa fa-user flex-start"></i>
                                    <input type="email" className="email form2-input hide" placeholder="E-mail" autocompelete="off"
                                        required  value={email} onChange={_ => setEmail(_.target.value)}/>
                
                                </div>

                                <div className="error email-error full-width flex-start hide"></div>
                
                                <input type="submit" name="register" value="Send Password"/>
                
                                <div className="recovery-faild full-width flex-start error align-start hide">
                                    <i className="fa fa-warning"></i> You entered the wrong credentials. Please ensure that your email is correct.
                                </div>
                
                            </form>
                
                            <div className="forget flex-column full-width">
                
                                <p className="full-width flex"><Link href="/login">Back to Log In</Link></p>
                
                                <p className="full-width flex">Don't have an account ? &nbsp; <Link href="/register">Sing Up</Link></p>
                
                            </div>
                
                        </div>
                    }

                    <div className="loader form-loader fill"></div>

                </main>

                <Footer page="Recovery Password" settings={settings}/>

            </div>

        </Fragment>

    )

}
