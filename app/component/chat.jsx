"use client";
import { date, api, get_session, host, sound, file_info, check_hidden, set_session, print } from "@/public/script/public";
import { Fragment, useEffect, useState } from "react";
import $ from "jquery";

export default function Chat ({ settings }) {

    const [messages, setMessages] = useState([]);
    const [counter, setCounter] = useState(0);
    let socket = '';
    let last_date = '0-0-0';

    const fix_date = ( _date_ ) => {
        
        if ( _date_ == "Just now" ) return "Now";
        let hour = parseInt(_date_.split(" ")[1].split(":")[0]);
        let minute = parseInt(_date_.split(" ")[1].split(":")[1]);
        if ( minute == date("minute") ) return "Now";
        let p = "AM";
        if ( hour > 12 ) { hour -= 12; p = "PM" }
        if ( hour < 10 ) hour = `0${hour}`;
        if ( minute < 10 ) minute = `0${minute}`;
        let time = `${hour}:${minute} ${p}`;
        return time;
    
    }
    const shorten_date = ( _date_ ) => {
    
        let today = `${date('year')}-${date('month')}-${date('day')} 0:0:0`;
        let diff = new Date(today).getTime() - new Date(_date_).getTime();
        if ( diff <= 0 ) return "Today";
        if ( Math.floor(diff / 1000 / 60 / 60) < 24 ) return "Yasterday";
        return _date_.split(" ")[0];
    
    }
    const find_msg = ( id ) => {
        
        let el = $(`.chat-div .content #${id}`);
        if ( !el.length ) return;
        el.addClass("selected");
        el.prev()[0].scrollIntoView();
        setTimeout(_ => el.prev()[0].scrollIntoView(), 100);
        setTimeout(_ => el.prev()[0].scrollIntoView(), 200);
        setTimeout(_ => el.prev()[0].scrollIntoView(), 500);
    
    }
    const write_message = (id, content, date, type, link, name, size, sender) => {
        
        let diff = parseInt(date.split(" ")[0].split("-")[2]) - parseInt(last_date.split(" ")[0].split("-")[2]);
        last_date = date;
        if ( diff > 0 ) {
            let msg = $(`.chat-div .test-content .message.system.text`).first().clone();
            msg.appendTo(".chat-div .content").fadeIn(300).css("display", "flex").attr("id", id);
            msg.find("p").html(shorten_date(date));
        }

        let cls = '';
        if ( sender === get_session('chat') ) cls = "receiver";
        else if ( sender === 'system' ) cls = "system";
        else cls = "sender";
    
        if ( type == "text" ) {
    
            let msg = $(`.chat-div .test-content .message.${cls}.text`).first().clone();
            msg.appendTo(".chat-div .content").fadeIn(300).css("display", "flex").attr("id", id);
            msg.find("p").html(content);
            msg.find(".date").html(fix_date(date));
    
        }
        if ( type == "file" ) {
    
            let msg = $(`.chat-div .test-content .message.${cls}.file`).first().clone();
            msg.appendTo(".chat-div .content").fadeIn(300).css("display", "flex").attr("id", id);
            msg.find(".name").text(name);
            msg.find(".size").text(size);
            msg.find(".date").html(fix_date(date));
            msg.on('click', () => download(link));
            
        }
        if ( type == "image" ) {
    
            let msg = $(`.chat-div .test-content .message.${cls}.image`).first().clone();
            msg.appendTo(".chat-div .content").fadeIn(300).css("display", "flex").attr("id", id);
            msg.find("img").attr("src", link);
            msg.find(".date").html(fix_date(date));
            msg.on('click', () => download(link));
    
        }
        if ( type == "video" ) {
    
            let msg = $(`.chat-div .test-content .message.${cls}.video`).first().clone();
            msg.appendTo(".chat-div .content").fadeIn(300).css("display", "flex").attr("id", id);
            msg.find("video").attr("src", link);
            msg.find(".date").html(fix_date(date));
            msg.on('click', () => download(link));
    
        }
        setTimeout(_ => {
            $(".chat-div .content")[0].scrollBy(0, 10000);
        }, 100);
    
    }
    const get_messages = async() => {
            
        const response = await api('get-messages', {'user': get_session('chat')});
        if ( response.messages ) setMessages(response.messages);

    }
    const send_message = async() => {

        let content = $(".chat-div input[type='text']").val().trim();
        $(".chat-div input[type='text']").val('');
        if ( !content ) return;
        let data = {id: 0, user: get_session('chat'), content: content, type: "text"};
        write_message(data.id, data.content, "Just now", data.type, "", "", "", data.user);
        setTimeout(_ => sound("send", .3), 300);

        const response = await api('send-message', data);
        if ( !response.message ) return;
        try{ socket.send(JSON.stringify(response.message)); }catch(e){}
        if ( !data.user && response.user_id ) set_session('chat', response.user_id);

    }
    const send_file = async(e) => {

        let file = e.target.files[0];
        if ( !file ) return;
    
        var fr = new FileReader();
        fr.readAsDataURL(file);

        let data = {
            id: 0,
            user: get_session('chat'),
            content: '',
            type: file_info(file, "type"),
            name: file_info(file, "name"),
            size: file_info(file, "size"),
            ext: file_info(file, "ext"),
            file: file
        }
        fr.onload = async() => {

            if ( data.type !== 'image' && data.type !== 'video' ) data.type = 'file';
            write_message(data.id, "", "Just now", data.type, fr.result, data.name, data.size, data.user);
            setTimeout(_ => sound("send", .3), 300);
            $(".chat-div .input input.file").val("");

            const response = await api('send-message', data);
            if ( !response.message ) return;
            try{ socket.send(JSON.stringify(response.message)); }catch(e){}
            if ( !data.user && response.user_id ) set_session('chat', response.user_id);

        }

    }
    const active_messages = async() => {
        
        setCounter(0);
        await api('active-messages', {user: get_session('chat')});
 
    }
    const start_chat = () => {
        
        $(".chat-div input").val("");
        $(".chat-div .wlc p, .chat-div .wlc h1, .chat-div .wlc span, .chat-div .wlc button").fadeOut(50);
        $(".chat-div .wlc").fadeOut(500);
        if ( $(".chat-div .content #none-active").length ) find_msg("none-active");
        else down();
        active_messages();
    
        setTimeout( _ => {

            if ( !messages.length) {

                let content = "Hello sir, how can i help you ?";
                let date_ = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} 0:0:0`;
                write_message (0, content, date_, "text", "", "", "", "user");
                if ( !check_hidden(".chat-div") ) sound("receive", .5);

            }

        }, 200);
    
    }
    const show_chat = () => {
    
        $(".chat-div").fadeIn(100).css("display", "flex");
        $(".chat-div > div").css("margin", "0");
        $(".chat-div input").val("");
        if ( $(".chat-div .content #none-active").length ) find_msg("none-active");
        else down();
        if ( check_hidden('.chat-div .wlc') ) active_messages();
    
    }
    const hide_chat = () => {
    
        $(".chat-div > div").css("margin-right", -$(".chat-div > div").outerWidth());
        $(".chat-div").fadeOut(200);
        if ( !counter ) $(".chat-div .content").find("#none-active").remove();
    
    }
    const down = () => {

        let top = $(".chat-div  .content")[0].scrollHeight + 10000;
        $(".chat-div .content")[0].scrollTo(0, top);
        setTimeout( _ => { $(".chat-div .content")[0].scrollTo(0, top); }, 100);
        
    }
    const download = ( src ) => {

        let link = document.createElement("a");
        // link.setAttribute('download', "file");
        link.setAttribute('target', "_blank");
        link.href = src;
        document.body.appendChild(link);
        link.click();
        link.remove();

    }
    const socket_message = ( data ) => {
        
        if ( !check_hidden(".chat-div") ) {

            sound("receive", .5);
            active_messages();

        }
        else {

            if ( !counter ) write_message("none-active", `( ${counter+1} ) not readen`, date(), "text", "", "", "", "system");
            else $(".chat-div .content #none-active p").html(`( ${counter+1} ) not readen`);
            setCounter(counter+1);

        }

        write_message(data.id, data.content, data.date, data.type, `${host}/${item.link}`, data.name, data.size, data.sender);
    
    }
    useEffect(() => {

        let not_readen = messages.filter(item => !item.active && item.sender !== get_session('chat')).length;
        let alert_counter = true;
        setCounter(not_readen);

        messages.forEach((item) => {

            if ( !item.active && item.sender !== get_session('chat') && alert_counter ) {
                write_message("none-active", `( ${not_readen} ) not readen`, date(), "text", "", "", "", "system");
                alert_counter = false;
            }

            write_message(item.id, item.content, item.date, item.type, `${host}/${item.link}`, item.name, item.size, item.sender);

        });

    }, [messages]);
    useEffect(() => {
        
        $(".tour .show-chat").on("click", show_chat);
        $(".chat-div .content").on("scroll", function(){
            if ( parseInt($(this).scrollTop() + $(this).outerHeight()) > ( $(this).get(0).scrollHeight - 100 ) )
                $(".chat-div .down").fadeOut();
            else $(".chat-div .down").fadeIn().css("display", "flex");
        });
    
        get_messages();
        // try{ socket = new WebSocket(`ws://${host}/${user}`); }catch(e){}
        // try{ socket.onmessage = (e) => socket_message(JSON.parse(e.data)) }catch(e){}
        
    }, []);

    return (

        <Fragment>

            <div className="chat-icon fixed pointer flex circle" onClick={show_chat}>

                <span className="material-symbols-outlined go-icon">contact_support</span>

                { counter > 0 && <div className="count absolute flex no-select">{counter}</div> }

            </div>

            <div className="chat-div flex flex-end full-width full-height hide" onClick={_ => $(_.target).hasClass('chat-div') && hide_chat()}>

                <div className="full-height relative">

                    <div className="first full-width flex flex-space">

                        <div className="flex-start">

                            <span className="material-symbols-outlined go-icon">contact_support</span>
                            
                            <p>{settings.name}</p>

                        </div>

                        <span className="material-symbols-outlined close-chat circle pointer flex" onClick={hide_chat}>close</span>

                    </div>

                    <div className="wlc over-hide default">
                        
                        <span className="material-symbols-outlined icon">contact_support</span>

                        <h1 className="full-width flex">{settings.name} chat</h1>

                        {/* <p className="full-width flex">You can now start chat with specialist</p> */}

                        <p className="full-width flex"><span>You can now start chat with specialist Click the Start button to start 'Chat'</span></p>

                        <div className="full-width flex">
                            <button className="pointer flex start" onClick={start_chat}>Start chat</button>
                        </div>
                        
                        <p className="full-width flex absolute foot">
                            <span className="material-symbols-outlined icon">lock</span>
                            <span>Messages are completely encrypted.</span>
                        </p>

                    </div>

                    <div className="content"></div>

                    <div className="test-content hide">

                        <div className="message system date full-width flex no-select text hide">
                            <p className="flex"></p>
                        </div>

                        <div className="message full-width flex flex-start sender text hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                                    <path fill="" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                                </svg>
                                    
                                <div className="flex flex-column layer">

                                    <p></p>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-start sender file hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                                    <path fill="" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                                </svg>

                                <div className="flex flex-column full-width">
                                    
                                    <div className="file flex flex-space full-width">
                                        <div className="flex flex-start align-start">
                                            <span className="material-symbols-outlined icon">description</span>
                                            <div className="flex flex-column">
                                                <span className="name flex flex-start full-width"></span>
                                                <span className="flex flex-start full-width size"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="material-symbols-outlined icon download-icon">download</span>
                                        </div>
                                    </div>
                           
                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-start sender image hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                                    <path fill="" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                                </svg>

                                <div className="flex flex-column">
                                    
                                    <div className="image flex pointer"><img/></div>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-start sender video hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                                    <path fill="" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                                </svg>

                                <div className="flex flex-column">
                                    
                                    <div className="video flex pointer"><video></video></div>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>

                        <div className="message full-width flex flex-end receiver text hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                                    <path fill="" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                                </svg>
                                    
                                <div className="flex flex-column layer">

                                    <p></p>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-end receiver file hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                                    <path fill="" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                                </svg>

                                <div className="flex flex-column full-width">
                                    
                                    <div className="file flex flex-space full-width">
                                        <div className="flex flex-start align-start">
                                            <span className="material-symbols-outlined icon">description</span>
                                            <div className="flex flex-column">
                                                <span className="name flex flex-start full-width"></span>
                                                <span className="flex flex-start full-width size"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="material-symbols-outlined icon download-icon">download</span>
                                        </div>
                                    </div>
                                 
                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-end receiver image hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                                    <path fill="" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                                </svg>

                                <div className="flex flex-column">
                                    
                                    <div className="image flex pointer"><img/></div>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>
                        <div className="message full-width flex flex-end receiver video hide">

                            <div className="flex flex-start relative">

                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute">
                                    <path fill="" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                                    <path fill="" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                                </svg>

                                <div className="flex flex-column">
                                    
                                    <div className="video flex pointer"><video></video></div>

                                    <div className="date"></div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="input full-width flex">

                        <span className="material-symbols-outlined icon pointer emojy">sentiment_satisfied</span>
                        <span className="material-symbols-outlined icon flex pointer file" onClick={_ => $(".chat-div .input input.file").click()}>attach_file</span>
                        <input type="text" placeholder="write a message" onKeyUp={_ => _.key === 'Enter' ? send_message() : ''}/>
                        <span className="material-symbols-outlined icon flex pointer send" onClick={send_message}>send</span>
                        <input type="file" className="hide file" onChange={send_file}/>

                    </div>

                    <div className="down pointer flex circle fixed hide" onClick={down}>
                        <span className="material-symbols-outlined icon">expand_more</span>
                    </div>
                    
                </div>

            </div>

        </Fragment>

    )

}
