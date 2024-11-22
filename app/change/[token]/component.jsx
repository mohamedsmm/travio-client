"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { api, get_session } from "@/public/script/public";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Recovery ({ token, status, settings }) {

    const router = useRouter();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [flash, setFlash] = useState(false);

    const change = async(_) => {

        _.preventDefault();

        $(".form-loader, .recovery-faild").css("display", "flex");

        if ( password1 !== password2 ) return $(".form-loader").fadeOut(200);

        const response = await api(`auth/change-password/${token}`, {password: password1});

        $(".form-loader").fadeOut(200);

        setFlash(response.status);

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
                        <div className="reset-form success recovery flex-column">
                                        
                            <div className="image"><img src="/media/image/public/log.png"/></div>

                            <form className="flex-column full-width">

                                <h1>Change password</h1>

                                <div className="resend full-width flex-column">

                                    <p className="circle flex green"> <i className="fa fa-check"></i> </p>

                                    <span className="resend green">The Password Changed Successfully</span>

                                </div>

                                <Link href="/login" className="pointer full-width flex back">Back to Log In</Link>

                            </form>

                        </div> :
                        status ?
                        <div className="reset-form flex-column form2 login-form register-form">

                            <div className="image"><img src="/media/image/public/log.png"/></div>

                            <form className="flex-column full-width" onSubmit={change}>

                                <h1>Change password</h1>

                                <div className="input flex-start full-width relative">

                                    <label className="flex-start absolute">New Password</label>
                                    <i className="fa fa-user flex-start"></i>
                                    <input type="password" className="password1 form2-input hide" placeholder="New Password" autocompelete="off"
                                        required value={password1} onChange={_ => setPassword1(_.target.value)}/>

                                </div>

                                <div className="input flex-start full-width relative">

                                    <label className="flex-start absolute">Confirm Password</label>
                                    <i className="fa fa-user flex-start"></i>
                                    <input type="password" className="password2 form2-input hide" placeholder="Confirm Password" autocompelete="off"
                                        required value={password2} onChange={_ => setPassword2(_.target.value)}/>

                                </div>

                                <input type="submit" name="recovery" value="Submit"/>

                                <div className="recovery-faild full-width flex-start error align-start hide">
                                    <i className="fa fa-warning"></i> <span>Please ensure that passwords are matched.</span>
                                </div>

                            </form>

                        </div> :
                        <div className="reset-form faild recovery flex-column">
                                
                            <div className="image"><img src="/media/image/public/log.png"/></div>

                            <form className="flex-column full-width">

                                <h1>Change password</h1>

                                <div className="resend full-width flex-column">

                                    <p className="circle flex"> <i className="fa fa-exclamation"></i> </p>

                                    <span className="resend">The code is not correct !</span>

                                </div>

                                <Link href="/login" className="pointer full-width flex back">Back to Log In</Link>

                            </form>

                        </div>
                    }

                    <div className="loader form-loader fill"></div>

                </main>

                <Footer page="Change Password" settings={settings}/>

            </div>

        </Fragment>

    )

}
