"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { api, get_session, set_session } from "@/public/script/public";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Login ({ settings }) {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async(_) => {

        _.preventDefault();

        $(".form-loader, .login-faild").css("display", "flex");

        let data = { email: email, password: password };

        data = await api("auth/login", data);

        if ( !data.status || !data.user ) return $(".form-loader").hide();

        set_session("user", {...data.user, token: data.token});
        
        set_session("chat", data.user.id);

        if ( get_session('redirect_page') ) router.replace(get_session('redirect_page'));
        else router.replace("/account");

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

                    <div className="login-form flex-column form2 register-form log-form">

                        <div className="image"><img src="/media/image/public/log.png"/></div>

                        <form className="flex-column full-width" onSubmit={login}>

                            <h1>Log In</h1>

                            <div className="input flex-column full-width relative">

                                <input type="email" className="email form2-input hide" onChange={_ => setEmail(_.target.value)} placeholder="E-mail" required autoComplete="off"/>

                            </div>

                            <div className="input flex-column full-width relative">

                                <input type="password" className="password form2-input hide" onChange={_ => setPassword(_.target.value)} placeholder="Password" required autoComplete="off"/>

                            </div>

                            <input type="submit" name="register" value="Log In"/>

                            <p className="login-faild full-width flex-start hide error align-start">
                                You entered the wrong credentials. Please make sure that your E-mail/password is correct.
                            </p>

                        </form>

                        <div className="api-form flex-column full-width">

                            <p className="full-width flex"> <span>or use a social account</span> </p>

                            <div className="full-width flex-space links">

                                <Link href="/login" className="facebook-api flex"><img src="/media/image/public/facebook.png"/></Link>
                                <Link href="/login" className="google-api flex"><img src="/media/image/public/google.png"/></Link>
                                <Link href="/login" className="github-api flex"><img src="/media/image/public/github.png"/></Link>

                            </div>

                        </div>

                        <div className="forget flex-column full-width">

                            <p className="full-width flex-start"> Find your account &nbsp; <Link href="/recovery"> Forgot Your Password ? </Link> </p>

                            <p className="full-width flex-start"> Don't have an account ? &nbsp; <Link href="/register"> Create an Account</Link> </p>

                        </div>

                    </div>

                    <div className="loader form-loader fill"></div>

                </main>

                <Footer page="Login" settings={settings}/>

            </div>

        </Fragment>

    )

}
