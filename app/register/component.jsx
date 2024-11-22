"use client";
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { api, set_session, get_session } from "@/public/script/public";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Register ({ settings }) {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async(_) => {

        _.preventDefault();

        $(".form-loader, .register-faild").css("display", "flex");

        let data = { name: name, email: email, password: password };

        data = await api("auth/register", data);

        if ( data.status === 'exists' ) $(".register-faild").text('This E-mail is already exists !');

        else $(".register-faild").text('Sorry, somthing went wrong ... try late !');

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

                    <div className="login-form register-form flex-column form2 signup-form">

                        <div className="image"><img src="/media/image/public/log.png"/></div>
            
                        <form className="flex-column full-width" onSubmit={register}>
            
                            <h1>Sign Up</h1>
            
                            <div className="input flex-column full-width relative">
            
                                <input type="text" className="username form2-input" onChange={_ => setName(_.target.value)} placeholder="Username" autocompelete="off" required/>
            
                            </div>

                            <div className="input flex-column full-width relative">
            
                                <input type="email" className="email form2-input" onChange={_ => setEmail(_.target.value)} placeholder="E-mail" autocompelete="off" required/>
            
                            </div>

                            <div className="input flex-column full-width relative">
            
                                <input type="password" className="password form2-input" onChange={_ => setPassword(_.target.value)} placeholder="Password" autocompelete="off" required/>
            
                            </div>

                            <input type="submit" name="register" value="Create Account"/>

                            <div className="register-faild full-width flex-start error hide"></div>
            
                        </form>
            
                        <div className="api-form flex-column full-width">
                
                            <p className="full-width flex"> <span>or use a social account</span> </p>
                
                            <div className="full-width flex-space links">
                
                                <Link href="/register" className="facebook-api flex"><img src="/media/image/public/facebook.png"/></Link>
                                <Link href="/register" className="google-api flex"><img src="/media/image/public/google.png"/></Link>
                                <Link href="/register" className="github-api flex"><img src="/media/image/public/github.png"/></Link>
                
                            </div>
                
                        </div>
            
                        <div className="forget flex-start full-width">
            
                            <p className="full-width flex-start">Already have an Account ? &nbsp; <Link href="/login">Log In from here</Link></p>
            
                        </div>
            
                    </div>
            
                    <div className="loader fill form-loader"></div>

                </main>
    
                <Footer page="Register" settings={settings}/>

            </div>

        </Fragment>

    )

}
