"use client";
import { host, set_session, get_session, remove_session } from "@/public/script/public";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import $ from "jquery";

export default function Nav ({ searchbox, small, settings }) {

    const router = useRouter();
    const [user, setUser] = useState('');
    const [access, setAccess] = useState(false);
    const [langs, setLangs] = useState(['AR', 'EN', 'RU', 'FR', 'IT']);
    const [lang, setLang] = useState('EN');
    const [model, setModel] = useState(false);

    const search = () => {

        let query = $(".search-div input").val().trim();
        if ( query ) router.push(`/search/?query=${query}`);

    }
    const show_side = () => {
        $(".nav-side").fadeIn(100).css("display", "flex");
        setTimeout(_ => $(".nav-side .side").addClass('open'));
    }
    const hide_side = () => {
        $(".nav-side .side").removeClass('open')
        setTimeout(_ => $(".nav-side").fadeOut(100), 200);
    }
    const favorites = () => {

        let all_favorites = get_session('wishlist') || [];
        all_favorites = all_favorites.filter((item, index) => all_favorites.indexOf(item) === index);
        if ( all_favorites.length ) $('nav .wishlist-count').css('display', 'flex').find('div').text(all_favorites.length);
    
        $('.tour-card').each(function(){
            if ( all_favorites.includes(parseInt($(this).attr('data-id'))) ) {
                $(this).find('.favor.add').hide();
                $(this).find('.favor.del').css('display', 'flex');
            }
        });
        $(document).on('click', '.tour-card .favor.add', function(){
            
            let id = parseInt($(this).parents('.tour-card').attr('data-id'));
            $('.tour-card').each(function(){
                if ( parseInt($(this).attr('data-id')) === id ) {
                    $(this).find('.favor.add').hide();
                    $(this).find('.favor.del').css('display', 'flex');
                }
            });
    
            let favorites_ = get_session('wishlist') || [];
            favorites_.push(id);
            favorites_ = favorites_.filter((item, index) => favorites_.indexOf(item) === index);
            set_session('wishlist', favorites_);
            if ( !favorites_.length ) $('nav .wishlist-count').hide().find('div').text(0);
            else $('nav .wishlist-count').css('display', 'flex').find('div').text(favorites_.length);
    
        });
        $(document).on('click', '.tour-card .favor.del', function(){
    
            let id = parseInt($(this).parents('.tour-card').attr('data-id'));
            $('.tour-card').each(function(){
                if ( parseInt($(this).attr('data-id')) === id ) {
                    $(this).find('.favor.del').hide();
                    $(this).find('.favor.add').css('display', 'flex');
                    if ( $(this).parents('.wishlist-cards').length ) $(this).remove();
                }
            });
    
            let favorites_ = get_session('wishlist') || [];
            favorites_ = favorites_.filter(_ => _ !== id);
            set_session('wishlist', favorites_);
            if ( !favorites_.length ) $('nav .wishlist-count').hide().find('div').text(0);
            else $('nav .wishlist-count').css('display', 'flex').find('div').text(favorites_.length);
    
            if ( !favorites_.length ) {
                $(".loader, .all-cards").hide();
                $(".empty").fadeIn(500).css("display", "flex");
            }
    
        });
    
    }
    const logout = () => {
        
        $(".loader").fadeIn(100).css("display", "flex");
        remove_session('user');
        remove_session('chat');
        router.replace('/login');

    }
    useEffect(() => {

        setUser(get_session('user'));
        setAccess(true);
        favorites();
        setLang(localStorage.getItem('lang')?.toUpperCase() || 'AR');

        setTimeout(_ => {
            $(".nav-side ul a, nav .nav-icons a").each(function(){
                let url = `${location.protocol}//${location.host}${$(this).attr("href")}`;
                if ( location.href === url ) return $(this).addClass('active');
            });
        }, 100);

    }, []);

    return (

        <nav>

            <main className="flex flex-space">

                <ul className="flex">

                    <div className="show-side flex flex-start pointer" onClick={show_side}>
                        <span className="material-symbols-outlined go-icon">sort</span>
                    </div>

                    <Link href="/" className="logo">
                        <img src="/media/image/public/logo1.png" />
                    </Link>

                    {
                        searchbox &&
                        <div className="search-div flex">

                            <svg className="icon-search" width="20" height="20" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 2.75C14.5041 2.75 17.75 5.99594 17.75 10C17.75 11.7319 17.1427 13.3219 16.1295 14.5688L21.0303 
                                    19.4697C21.3232 19.7626 21.3232 20.2374 21.0303 20.5303C20.7641 20.7966 20.3474 20.8208 20.0538 20.6029L19.9697 
                                    20.5303L15.0688 15.6295C13.8219 16.6427 12.2319 17.25 10.5 17.25C6.49594 17.25 3.25 14.0041 3.25 10C3.25 5.99594 
                                    6.49594 2.75 10.5 2.75ZM10.5 4.25C7.32436 4.25 4.75 6.82436 4.75 10C4.75 13.1756 7.32436 15.75 10.5 15.75C13.6756 
                                    15.75 16.25 13.1756 16.25 10C16.25 6.82436 13.6756 4.25 10.5 4.25Z" fill="#2A2D32">
                                </path>
                            </svg>

                            <input type="text" placeholder="Search" onKeyUp={_ => _.key === "Enter" && search()} onFocus={_ => $(".search-div").addClass('active')} onBlur={_ => $(".search-div").removeClass('active')}/>

                        </div>
                    }
             
                </ul>

                {
                    !small &&
                    <ul className="flex nav-icons">

                        <Link href="/help" className="flex nav-icon">

                            <div className="flex" style={{ marginTop: "1px" }}>
                                <span className="material-symbols-outlined go-icon">help</span>
                            </div>

                            <span>Help Center</span>

                        </Link>

                        <Link href="/bookings" className="flex nav-icon">

                            <div className="flex" style={{ marginTop: "1px" }}>
                                <span className="material-symbols-outlined go-icon">credit_card</span>
                            </div>

                            <span>Bookings</span>

                        </Link>
                        
                        {
                            access ? user ?
                            <Link href="/account" className="flex nav-icon">

                                <div className="flex">
                                    <span className="material-symbols-outlined go-icon">account_circle</span>
                                </div>
                
                                <span>Account</span>

                            </Link> :
                            <Link href="/login" className="flex nav-icon">

                                <div className="flex">
                                    <span className="material-symbols-outlined go-icon">logout</span>
                                </div>
                
                                <span>Login</span>
                
                            </Link> : ''
                        }

                        <Link href="/wishlist" className="flex li nav-icon relative wishlist-icon">

                            <div className="flex">
                                <i className="fa fa-heart-o"></i>
                            </div>

                            <div className="wishlist-count count flex no-selct absolute hide"><div>0</div></div>

                        </Link>

                        <a onClick={() => setModel(true)} className="choice-lang flex" style={{ margin: '-1px 0 0 1.5rem' }}>
                            <div className="flex pointer">
                                <img src={`/media/image/lang/${lang}.svg`} style={{ width: '2rem', borderRadius: '.3rem' }}/>
                            </div>
                        </a>

                        {
                            access ? user ?
                            <Link href="/account" className="flex nav-icon user-icon">

                                <img src={`${host}${user.image || 'user/1.png'}`}/>

                            </Link> :
                            <Link href="/login" className="flex nav-icon user-icon span">

                                <div className="flex">
                                    <span className="material-symbols-outlined go-icon">account_circle</span>
                                </div>
                
                            </Link> : ''
                        }

                    </ul>
                }

            </main>

            <div className={`langs-menu ${model && 'active'}`} onClick={() => setModel(false)}>

                <ul onClick={(e) => e.stopPropagation()}>
                        
                    <li className="head">
                        <span>Languages</span>
                        <span className="material-symbols-outlined" onClick={() => setModel(false)}>close</span>
                    </li>

                    {
                        langs.map(_ => 
                            <li key={_} onClick={() => { setLang(_); localStorage.setItem('lang', _.toLowerCase()); setModel(false); setTimeout(() => location.reload(), 100) }}>
                                <img src={`/media/image/lang/${_}.svg`}/>
                                <span>{
                                    _ === 'AR' ? 'Arabic' :
                                    _ === 'EN' ? 'English' :
                                    _ === 'RU' ? 'Russian' :
                                    _ === 'FR' ? 'French' :
                                    _ === 'IT' ? 'Italian' : ''
                                }</span>
                            </li>
                        )
                    }

                </ul>

            </div>

            <div className="nav-side fixed flex flex-start full-width full-height hide" onClick={_ => $(_.target).hasClass('nav-side') && hide_side()}>

                <div className="side full-height">

                    <div className="first full-width flex flex-space">

                        <Link href="/" className="flex">
                            
                            <img src="/media/image/public/logo.png"/>

                        </Link>

                        <div className="close-side circle pointer flex" onClick={hide_side}>
                            <span className="material-symbols-outlined go-icon">close</span>
                        </div>

                    </div>

                    <ul className="full-width flex flex-column">

                        <Link href="/" className="flex flex-start full-width">
                            <span className="material-symbols-outlined go-icon">home</span>
                            <span>Home</span>
                        </Link>

                        {
                            user ?
                            <Link href="/account" className="flex flex-start full-width">
                                <span className="material-symbols-outlined go-icon">account_circle</span>
                                <span>Account</span>
                            </Link> :
                            <Link href="/login" className="flex flex-start nav-icon">
                                <span className="material-symbols-outlined go-icon">logout</span>
                                <span>Login</span>
                            </Link>
                        }

                        <Link href="/bookings" className="flex flex-start full-width">
                            <span className="material-symbols-outlined go-icon">credit_card</span>
                            <span>Bookings</span>
                        </Link>

                        <Link href="/wishlist" className="flex flex-start li">

                            <div className="flex">
                                <span className="material-symbols-outlined go-icon">favorite</span>
                            </div>

                            <span>Wishlist</span>

                        </Link>

                        <Link href="/help" className="flex flex-start full-width">
                            <span className="material-symbols-outlined go-icon">help</span>
                            <span>Help</span>
                        </Link>

                        <a onClick={() => setModel(true)} className="flex flex-start full-width">
                            <div className="flex flex-start pointer" style={{ padding: '.2rem 0' }}>
                                <img src={`/media/image/lang/${lang}.svg`} style={{ width: '1.6rem', borderRadius: '.3rem' }}/>
                                <span style={{ margin: '-1px 0 0 -.3rem', fontSize: '.92rem' }}>Language</span>
                            </div>
                        </a>

                        { user && <hr /> }
                        {
                            user &&
                            <a className="flex flex-start full-width" onClick={logout}>
                                <span className="material-symbols-outlined go-icon">logout</span>
                                <span>Logout</span>
                            </a>
                        }

                    </ul>

                </div>

            </div>

        </nav>

    )

}
