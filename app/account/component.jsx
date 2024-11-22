"use client"
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import { Fragment, useEffect, useState } from "react";
import { host, api, get_session, print, remove_session, set_session } from "@/public/script/public";
import { useRouter } from 'next/navigation';
import $ from "jquery";
import Link from "next/link";

export default function Account ({ settings }) {

    const router = useRouter();
    const [user, setUser] = useState({});

    const get_user = async(id) => {

        const response = await api('home/account', {id: id});
        if ( !response.user ) return router.replace('/');
        setUser(response.user);
        $(".loader").hide();

    }
    const update = async() => {

        $(".loader").fadeIn(100).css("display", "flex");
        let data = {id: get_session('user').id, name: user.name, email: user.email, phone: user.phone, city: user.city};
        const response = await api('home/update-account', data);
        $(".loader").fadeOut(100);

        if ( response.user ) {
        
            set_session("user", {...response.user, token: get_session('user').token});
            print("success");
        
        }
        else if ( response.status === "none" ) { remove_session('user'); remove_session('chat'); return router.replace('/login'); }
        else if ( response.status === 'email' ) print("This e-mail is already token !");
        else print("Some errors !");

    }
    const reset_password = async() => {

        if ( !user.password1 || !user.password2 || !user.password3 ) return;
        if ( user.password2 != user.password3 ) return alert('New Password not matching !');
        $(".loader").fadeIn(100).css("display", "flex");
        let data = {id: get_session('user'), old_password: user.password1, password: user.password2};
        const response = await api('home/reset-password', data);
        $(".loader").fadeOut(100);

        if ( response.status === true ) print("Done sir");
        else if ( response.status === "none" ) { remove_session('user'); return router.replace('/login'); }
        else if ( response.status === 'password' ) print("This old password is not correct !");
        else print("Some errors !");

    }
    const logout = () => {
        
        $(".loader").fadeIn(100).css("display", "flex");
        remove_session('user');
        remove_session('chat');
        router.replace('/login');

    }
    const active = (e) => {

        $(".account .left-card a").each(function(){ $(this).removeClass("active"); });
        $(e.target).addClass("active");
        if ( $(window).width() < 800 ) $(".left-card").hide();
        $(".right-card .card-body").hide(); $(".right-card").show();
        $(`.right-card .${$(e.target).attr("id")}`).fadeIn(50);
        $(".main-container").scrollTop(0);

    }
    useEffect(() => {

        if ( !get_session('user') ) return router.replace('/login');

        get_user(get_session('user').id);

        $(".account .right-card input").css("padding", "1.1rem .6rem");

    }, []);

    return (

        <Fragment>

            <Nav settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">
                
                <div className="account full-width flex profile relative" style={{minHeight: '30rem'}}>
                    {
                        user.email ?
                        <main className="flex-space align-start">
                            <div className="full-width">
                                <div className="row gutters no-padding no-margin full-width main-card flex-space">
                                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 no-padding left-card">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="account-settings">
                                                    <div className="user-profile over-hide">
                                                        <div className="img-circle text-center mt-1 mb-3 flex">

                                                            <div className="image relative pointer layer flex" title="Edit image">

                                                                <img src={`${host}${user.image || 'user/1.png'}`}/>

                                                                <div className="edit-image flex full-width full-height absolute hide">
                                                                    <span className="material-symbols-outlined icon">edit_square</span>
                                                                </div>

                                                            </div>
                                                            
                                                            <input type="file" className="hide change-image"/>

                                                        </div>
                                                        <h5 className="user-name" title={user.name || '?'}>{user.name || '?'}</h5>
                                                    </div>
                                                    <div className="flex-column nav-pills">
                                                        <a onClick={active} className="active nav-link full-width flex-start border-top show-div pointer" id="account-div" data-toggle="pill" role="tab" aria-controls="account" aria-selected="true">
                                                            <i className="fa fa-home text-center"></i> 
                                                            Information
                                                        </a>
                                                        <a onClick={active} className="nav-link full-width flex-start border-top show-div pointer" id="password-div" data-toggle="pill"  role="tab" aria-controls="password" aria-selected="false">
                                                            <i className="fa fa-key text-center"></i> 
                                                            Password
                                                        </a>
                                                        <a onClick={active} className="nav-link full-width flex-start border-top show-div pointer" id="notification-div" data-toggle="pill" role="tab" aria-controls="notification" aria-selected="false">
                                                            <i className="fa fa-bell text-center"></i> 
                                                            Notification
                                                        </a>
                                                        <a onClick={active} className="nav-link full-width flex-start border-top show-div pointer" id="payment-div" data-toggle="pill" role="tab" aria-controls="notification" aria-selected="false">
                                                            <i className="fa fa-credit-card text-center"></i> 
                                                            Payment Methods
                                                        </a>
                                                        <Link href="/bookings" className="nav-link full-width flex-start border-top pointer" aria-controls="notification" aria-selected="false">
                                                            <i className="fa fa-ticket text-center"></i> 
                                                            Your Bookings
                                                        </Link>
                                                        <a onClick={logout} className="nav-link full-width flex-start border-top show-div pointer" data-toggle="pill" role="tab" aria-controls="notification" aria-selected="false">
                                                            <i className="fa fa-sign-in"></i> 
                                                            Logout
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 no-padding right-card">
                                        <div className="card">
                                            <div className="card-body account-div">
                                                <div className="row gutters">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 className="mb-2 text-primary left-text">Personal Details</h6>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>Full Name</label>
                                                            <input type="text" value={user.name || ''} onChange={_ => setUser({...user, name: _.target.value})} className="form-control" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>E-mail</label>
                                                            <input type="text" value={user.email || ''} onChange={_ => setUser({...user, email: _.target.value})} className="form-control" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>Phone</label>
                                                            <input type="text" value={user.phone || ''} onChange={_ => setUser({...user, phone: _.target.value})} className="form-control" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gutters">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="mt-3 mb-2 text-primary left-text p">Address</div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>IP</label>
                                                            <input type="text" value={user.ip || ''} className="form-control disabled" autoComplete="off" disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>Login Device</label>
                                                            <input type="text" value={user.host || ''} className="form-control disabled" autoComplete="off" disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label>Address</label>
                                                            <input type="text" value={user.city || ''} onChange={_ => setUser({...user, city: _.target.value})} className="form-control" autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gutters button-div">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="text-right buttons">
                                                            <button type="button" className="btn btn-secondary">Cancel</button>
                                                            <button type="button" className="btn btn-primary update-info" onClick={update}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body password-div hide">
                                                <div className="tab-pane">
                                                    <h3 className="mb-4">Password Settings</h3>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Old password</label>
                                                                <input type="password" value={user.password1 || ''} onChange={_ => setUser({...user, password1: _.target.value})} className="form-control" autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>New password</label>
                                                                <input type="password" value={user.password2 || ''} onChange={_ => setUser({...user, password2: _.target.value})} className="form-control" autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Confirm new password</label>
                                                                <input type="password" value={user.password3 || ''} onChange={_ => setUser({...user, password3: _.target.value})} className="form-control" autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row gutters button-div">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="text-right buttons">
                                                                <button type="button" className="btn btn-secondary cancel">Cancel</button>
                                                                <button type="button" className="btn btn-primary update update-password" onClick={reset_password}>Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body notification-div hide">
                                                <div className="tab-pane">
                                                    <h3 className="mb-4">Notification Settings</h3>
                                                    <div className="form-group">
                                                        <div className="form-check pointer">
                                                            <input className="form-check-input pointer" type="checkbox" value="" id="notification1"/>
                                                            <label className="form-check-label pointer" htmlFor="notification1">
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-check pointer">
                                                            <input className="form-check-input pointer" type="checkbox" value="" id="notification2"/>
                                                            <label className="form-check-label pointer" htmlFor="notification2">
                                                                hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-check pointer">
                                                            <input className="form-check-input pointer" type="checkbox" value="" id="notification3"/>
                                                            <label className="form-check-label pointer" htmlFor="notification3">
                                                                commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="row gutters button-div">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="text-right buttons">
                                                                <button type="button" id="submit" name="submit"
                                                                    className="btn btn-secondary">Cancel</button>
                                                                <button type="button" id="submit" name="submit"
                                                                    className="btn btn-primary">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body payment-div hide">
                                                <div className="tab-pane">
                                                    <h3 className="mb-3">Payment Methods</h3>
                                                    <div className="form-group">
                                                        <p className="form-check no-padding" htmlFor="notification3">
                                                            your stored cards
                                                        </p>
                                                    </div>
                                                    <div className="alert alert-danger flex-start">
                                                        To view your stored cards, please <a href="/login" className="pr-2 pl-2">log in</a> again.
                                                    </div>
                                                    <div className="row gutters button-div">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="text-right buttons">
                                                                <button type="button" className="btn btn-secondary remove">Remove All</button>
                                                                <button type="button" className="btn btn-primary add">Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body setting-div hide">

                                                <div className="tab-pane">

                                                    <h3 className="mb-2">Settings</h3>

                                                </div>

                                            </div>
                                            <div className="back absolute flex pointer hide" title="Back" onClick={_ => { $(".account .right-card").hide(); $(".account .left-card").fadeIn(150); $(".account .show-div").removeClass("active"); }}>
                                                <span className="material-symbols-outlined go-icon">arrow_circle_left</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="loader fill hide"></div>
                        </main> :
                        <div className="loader fill account-loader"></div>
                    }
                </div>

                <Footer page="Account" settings={settings}/>

            </div>

        </Fragment>

    )

}
