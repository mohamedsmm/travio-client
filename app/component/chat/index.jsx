"use client";
import { api, date, host, fix_date, sound, scroll_down, scroll_to, fix_time, is_down, read_file, print, get_session } from '@/public/script/public';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Loader from '@/app/component/loader';
import Broadcast from './broadcast';

export default function Chatbox () {

    const fileRef = useRef(null);
    const ref = useRef(null);
    const [model, setModel] = useState(false);
    const [tab, setTab] = useState(1);
    const [messages, setMessages] = useState([]);
    const [last, setLast] = useState('');
    const [content, setContent] = useState('');
    const [scroller, setScroller] = useState(false);
    const [loader, setLoader] = useState(false);
    const [opened, setOpened] = useState(false);
    const [unreaden, setUnreaden] = useState(0);
    const [user, setUser] = useState({});

    const change_file = async( f ) => {

        let file = await read_file(f);
        _send_(file);

    }
    const on_file = async( files ) => {

        Array.from(files).forEach((f) => change_file(f));
        ref.current.value = '';

    }
    const _start_room_ = ( messages ) => {

        let new_messages = messages.filter(_ => _.sender_id !== 'system');
        let last_date = '', unread = 0, unreadIndex = 0;

        messages.forEach((message) => {

            if ( message.created_at?.split(' ')[0] !== last_date ) {

                let new_msg = {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)};
                last_date = message.created_at?.split(' ')[0];
                new_messages.splice(new_messages.indexOf(message), 0, new_msg);
                setLast(last_date);

            }
            if ( !message.readen && message.sender_id !== get_session('user')?.id ){

                unread++;
                unreadIndex = unreadIndex || new_messages.indexOf(message);

            }

        });
       
        let unread_msg = {id: 'unread-message', sender_id: 'system', created_at: date(), content: `${unread} Unread Messages`};
        if ( unread ) new_messages.splice(unreadIndex, 0, unread_msg);
        
        if ( get_session('user')?.id ) setUnreaden(messages.filter(_ => _.sender_id !== get_session('user')?.id && !_.readen).length);
        setMessages(new_messages);
        if ( unread ) scroll_to('unread-message');
        else scroll_down('.display-content');

    }
    const _update_room_ = ( message ) => {

        if ( date('date') !== last ) {
            setMessages([...messages, {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)}, message]);
            setLast(date('date'));
        }
        else setMessages([...messages, message]);

        setContent('');
        scroll_down('.display-content');
        sound('send');

    }
    const _send_ = async( file ) => {

        let message = {
            id: date(),
            created_at: date(),
            sender_id: user.id,
            receiver_id: 1,
            type: file ? 'file' : 'text',
            content: ref.current?.value || '',
            file: file,
            local: true,
        }

        _update_room_(message);
        let request = {content: message.content, type: message.type, file: message.file?.file}
        const response = await api('home/chat/send', request);

    }
    const _active_ = async() => {

        if ( unreaden ) api('home/chat/active');
        setUnreaden(0);
        if ( unreaden ) scroll_to('unread-message');
        else scroll_down('.display-content');
        // setTimeout(() => ref.current?.focus(), 500);

    }
    const _get_ = async() => {

        setLoader(true);
        const response = await api('home/chat');
        _start_room_(response.messages || []);
        setTimeout(() => setLoader(false), 500);
        setOpened(true);

    }
    useEffect(() => {

        if ( !unreaden ) return;
        sound('notify', 1);
        setTimeout(() => document.querySelector('.notification-svg')?.classList.add('active'));
        setTimeout(() => document.querySelector('.notification-svg')?.classList.remove('active'), 1000);

    }, [unreaden]);
    useEffect(() => {

        if ( tab === 2 ) _active_();

    }, [tab]);
    useEffect(() => {

        setUser(get_session('user') || {});
        if ( get_session('user')?.id && !opened ) _get_();

    }, []);

    return (

        <div>

            <div onClick={() => { setTab(1); setModel(!model); }} className="notification-button">

                <div className="notification-button-container">
                    
                    {
                        unreaden > 0 && !model ?
                        <div className="unread-notification notification-svg">
                            <span className="unread-notification-text">{unreaden}</span>
                        </div> : ''
                    }

                    <div className="toggle-icon">
                        {model ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(90deg) scale(1.3)', }}>
                                <path d="M9 5L15 12L9 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(1.1)' }}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4036 22.4797L10.6787 22.015C11.1195 21.2703 11.3399 20.8979 11.691 20.6902C12.0422 20.4825 12.5001 20.4678 13.4161 20.4385C14.275 20.4111 14.8523 20.3361 15.3458 20.1317C16.385 19.7012 17.2106 18.8756 17.641 17.8365C17.9639 17.0571 17.9639 16.0691 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C5.43314 6.03516 4.04489 6.03516 3.02507 6.66011C2.45442 7.0098 1.97464 7.48958 1.62495 8.06023C1 9.08006 1 10.4683 1 13.2448V14.093C1 16.0691 1 17.0571 1.32282 17.8365C1.75326 18.8756 2.57886 19.7012 3.61802 20.1317C4.11158 20.3361 4.68882 20.4111 5.5477 20.4385C6.46368 20.4678 6.92167 20.4825 7.27278 20.6902C7.6239 20.8979 7.84431 21.2703 8.28514 22.015L8.5602 22.4797C8.97002 23.1721 9.9938 23.1721 10.4036 22.4797ZM13.1928 14.5171C13.7783 14.5171 14.253 14.0424 14.253 13.4568C14.253 12.8713 13.7783 12.3966 13.1928 12.3966C12.6072 12.3966 12.1325 12.8713 12.1325 13.4568C12.1325 14.0424 12.6072 14.5171 13.1928 14.5171ZM10.5422 13.4568C10.5422 14.0424 10.0675 14.5171 9.48193 14.5171C8.89637 14.5171 8.42169 14.0424 8.42169 13.4568C8.42169 12.8713 8.89637 12.3966 9.48193 12.3966C10.0675 12.3966 10.5422 12.8713 10.5422 13.4568ZM5.77108 14.5171C6.35664 14.5171 6.83133 14.0424 6.83133 13.4568C6.83133 12.8713 6.35664 12.3966 5.77108 12.3966C5.18553 12.3966 4.71084 12.8713 4.71084 13.4568C4.71084 14.0424 5.18553 14.5171 5.77108 14.5171Z" fill="white"></path>
                                <path opacity="0.8" d="M15.486 1C16.7529 0.999992 17.7603 0.999986 18.5683 1.07681C19.3967 1.15558 20.0972 1.32069 20.7212 1.70307C21.3632 2.09648 21.9029 2.63623 22.2963 3.27821C22.6787 3.90219 22.8438 4.60265 22.9226 5.43112C22.9994 6.23907 22.9994 7.24658 22.9994 8.51343V9.37869C22.9994 10.2803 22.9994 10.9975 22.9597 11.579C22.9191 12.174 22.8344 12.6848 22.6362 13.1632C22.152 14.3323 21.2232 15.2611 20.0541 15.7453C20.0249 15.7574 19.9955 15.7691 19.966 15.7804C19.8249 15.8343 19.7039 15.8806 19.5978 15.915H17.9477C17.9639 15.416 17.9639 14.8217 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C7.22423 6.03516 6.41369 6.03516 5.73242 6.06309V4.4127C5.76513 4.29934 5.80995 4.16941 5.86255 4.0169C5.95202 3.75751 6.06509 3.51219 6.20848 3.27821C6.60188 2.63623 7.14163 2.09648 7.78361 1.70307C8.40759 1.32069 9.10805 1.15558 9.93651 1.07681C10.7445 0.999986 11.7519 0.999992 13.0188 1H15.486Z" fill="white"></path>
                            </svg>
                        )}
                    </div>

                </div>

            </div>

            <div className={`modal-container ${model ? 'modal-active' : 'modal-inactive'}`}>

                <div className={`tab-content ${tab === 1 ? 'tab-active' : 'tab-inactive'}`}>

                    <div className="content-container">
                        
                        <div className="header">

                            <div className="avatars">
                                <div className="avatar"><img src="/media/image/user/2.png" /></div>
                                <div className="avatar"><img src="/media/image/user/4.png" /></div>
                                <div className="avatar"><img src="/media/image/user/1.png" /></div>
                            </div>
                            
                            <div onClick={() => { setTab(1); setModel(false); }} className="close-btn">
                                <span className='material-symbols-outlined'>close</span>
                            </div>

                        </div>

                        <div className="greeting">
                            <div className="message w-full flex flex-start">Hi there <div className="wave">✋</div></div>
                            <div>How can I help?</div>
                        </div>

                        <div className="message-btn relative" onClick={() => setTab(2)}>

                            <div className="message-card">
                                <div className="message-title">Recently Message</div>
                                <div className="message-info">
                                    <div className="user-avatar">
                                        <img src="/media/image/user/4.png" />
                                    </div>
                                    <div className="message-details">
                                        <p>Hello! How are you today?</p>
                                        <p className="timestamp">3 days ago.</p>
                                    </div>
                                    <div className="arrow-icon">
                                        <svg onClick={() => setTab(2)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {
                                unreaden > 0 &&
                                <div className="notification-badge notification-svg">
                                    <span>{unreaden}</span>
                                </div>
                            }

                        </div>

                        <div className="send-message-btn" onClick={() => setTab(2)}>
                            <div className="send-message-card">
                                <div className="send-message-text">
                                    <p>Send a Message</p>
                                    <p>We will return back later.</p>
                                </div>
                                <div className="send-icon">
                                    <span className="material-symbols-outlined">send</span>
                                </div>
                            </div>
                        </div>

                        <div className="footer">
                            <div className="footer-item active">
                                <span className="material-symbols-outlined">home</span>
                                <span>Home</span>
                            </div>
                            <div onClick={() => setTab(2)} className="footer-item">
                                <span className="material-symbols-outlined">chat</span>
                                <span>Messages</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={`chat-wrapper ${tab === 2 ? 'active' : 'inactive'}`}>

                    <div className="container-header">

                        <div onClick={() => setTab(1)} className="chevron-button">
                            <span className="chevron-icon material-symbols-outlined" translate="no">chevron_left</span>
                        </div>

                        <p className="brand-text">
                            <span>Kimitours</span>
                        </p>

                    </div>
                    
                    {
                        messages.length ?
                        <div onScroll={(e) => setScroller(is_down(e))} className="message-container display-content">

                            <div className="chat-conversation-box">
                                {
                                    messages?.map((message, index) => {
                                        const sender = message.sender_id === user?.id;
                                        const image = sender ? user?.image : 'user/1.png';
                                        const file_url = message.local ? message.file?.url : `${host}${message.file?.url}`;

                                        return (
                                            <div key={index} id={message.id} className="message-container">
                                                {
                                                    message.sender_id === 'system' ?
                                                    <div className="system-message">
                                                        <div className="system-message-box">
                                                            <span>{message.content}</span>
                                                        </div>
                                                    </div> :
                                                    <div className={`message ${sender ? 'sent' : 'received'}`}>

                                                        <div className={`message-content ${message.type === 'file' && 'file-msg'}`} title={fix_time(message.created_at)}>

                                                            <div className={`message-bubble ${sender ? 'sent-bubble' : 'received-bubble'}`}>
                                                                {
                                                                    message.type === 'file' ?
                                                                    <Link href={file_url} target="_blank" download className="file-link">
                                                                        {
                                                                            message.file.type === 'image' ?
                                                                            <div className="file-image">
                                                                                <img src={file_url} className="file-media"/>
                                                                            </div> :
                                                                            message.file.type === 'video' ?
                                                                            <div className="file-video">
                                                                                <video src={file_url} className="file-media"></video>
                                                                            </div> :
                                                                            <div className="file-document">

                                                                                <div className={`file-info ${sender ? 'sent-file' : 'received-file'}`}>

                                                                                    <div className="file-details">

                                                                                        <span className="file-icon material-symbols-outlined" translate="no">
                                                                                            description
                                                                                        </span>

                                                                                        <div className="file-meta">
                                                                                            <span className="file-name">{message.file.name.slice(0, 22)}..</span>
                                                                                            <span className="file-size">{message.file.size}</span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <span className="download-icon material-symbols-outlined" translate="no">
                                                                                        download
                                                                                    </span>

                                                                                </div>

                                                                            </div>
                                                                        }
                                                                    </Link> :
                                                                    <div className="text-message">{message.content}</div>
                                                                }
                                                            </div>

                                                        </div>

                                                        {
                                                            messages[index + 1]?.sender_id !== message.sender_id &&
                                                            <div className={`message-time ${sender ? 'time-sent' : 'time-received'}`}>
                                                                {fix_time(message.created_at)}
                                                            </div>
                                                        }

                                                    </div>
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            {
                                scroller &&
                                <div onClick={() => scroll_down('.message-container', true)} className="scroll-button">
                                    <span className="material-symbols-outlined expand-more" translate='no'>expand_more</span>
                                </div>
                            }

                        </div> :
                        <div className="centered-container">

                            <svg viewBox="0 0 891.29496 745.19434" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className='icon-text'>
                                <ellipse cx="418.64354" cy="727.19434" rx="352" ry="18" fill={'#e6e6e6'}/>
                                <path d="M778.64963,250.35008h-3.99878V140.80476a63.40187,63.40187,0,0,0-63.4018-63.40193H479.16232a63.40188,63.40188,0,0,0-63.402,63.4017v600.9744a63.40189,63.40189,0,0,0,63.4018,63.40192H711.24875a63.40187,63.40187,0,0,0,63.402-63.40168V328.32632h3.99878Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
                                <path d="M761.156,141.24713v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35084,47.35084,0,0,1-47.35-47.35v-600.09a47.3509,47.3509,0,0,1,47.35-47.35h28.29a22.50659,22.50659,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,761.156,141.24713Z" transform="translate(-154.35252 -77.40283)" fill="currentColor" />
                                <path d="M686.03027,400.0032q-2.32543,1.215-4.73047,2.3-2.18994.99-4.4497,1.86c-.5503.21-1.10987.42-1.66992.63a89.52811,89.52811,0,0,1-13.6001,3.75q-3.43506.675-6.96,1.06-2.90991.33-5.87989.47c-1.41015.07-2.82031.1-4.24023.1a89.84124,89.84124,0,0,1-16.75977-1.57c-1.44043-.26-2.85009-.57-4.26025-.91a88.77786,88.77786,0,0,1-19.66992-7.26c-.56006-.28-1.12012-.58-1.68018-.87-.83008-.44-1.63965-.9-2.4497-1.38.38964-.54.81005-1.07,1.23974-1.59a53.03414,53.03414,0,0,1,78.87012-4.1,54.27663,54.27663,0,0,1,5.06006,5.86C685.25977,398.89316,685.6499,399.44321,686.03027,400.0032Z" transform="translate(-154.35252 -77.40283)" fill='#00aa6c'/>
                                <circle cx="492.14325" cy="234.76352" r="43.90974" fill="#2f2e41" />
                                <circle cx="642.49883" cy="327.46205" r="32.68086" transform="translate(-232.6876 270.90663) rotate(-28.66315)" fill="#a0616a" />
                                <path d="M676.8388,306.90589a44.44844,44.44844,0,0,1-25.402,7.85033,27.23846,27.23846,0,0,0,10.796,4.44154,89.62764,89.62764,0,0,1-36.61.20571,23.69448,23.69448,0,0,1-7.66395-2.63224,9.699,9.699,0,0,1-4.73055-6.3266c-.80322-4.58859,2.77227-8.75743,6.488-11.567a47.85811,47.85811,0,0,1,40.21662-8.03639c4.49246,1.16124,8.99288,3.12327,11.91085,6.731s3.78232,9.16981,1.00224,12.88488Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
                                <path d="M644.5,230.17319a89.98675,89.98675,0,0,0-46.83984,166.83l.58007.34q.72.43506,1.43995.84c.81005.48,1.61962.94,2.4497,1.38.56006.29,1.12012.59,1.68018.87a88.77786,88.77786,0,0,0,19.66992,7.26c1.41016.34,2.81982.65,4.26025.91a89.84124,89.84124,0,0,0,16.75977,1.57c1.41992,0,2.83008-.03,4.24023-.1q2.97-.135,5.87989-.47,3.52513-.39,6.96-1.06a89.52811,89.52811,0,0,0,13.6001-3.75c.56005-.21,1.11962-.42,1.66992-.63q2.26464-.87,4.4497-1.86,2.40015-1.08,4.73047-2.3a90.7919,90.7919,0,0,0,37.03955-35.97c.04-.07995.09034-.16.13038-.24a89.30592,89.30592,0,0,0,9.6499-26.41,90.051,90.051,0,0,0-88.3501-107.21Zm77.06006,132.45c-.08008.14-.1499.28-.23.41a88.17195,88.17195,0,0,1-36.48,35.32q-2.29542,1.2-4.66992,2.25c-1.31006.59-2.64991,1.15-4,1.67-.57032.22-1.14991.44-1.73.64a85.72126,85.72126,0,0,1-11.73,3.36,84.69473,84.69473,0,0,1-8.95019,1.41c-1.8501.2-3.73.34-5.62012.41-1.21.05-2.42969.08-3.6499.08a86.762,86.762,0,0,1-16.21973-1.51,85.62478,85.62478,0,0,1-9.63037-2.36,88.46592,88.46592,0,0,1-13.98974-5.67c-.52-.27-1.04-.54-1.5503-.82-.73-.39-1.46972-.79-2.18994-1.22-.54-.3-1.08008-.62-1.60986-.94-.31006-.18-.62012-.37-.93018-.56a88.06851,88.06851,0,1,1,123.18018-32.47Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
                                <path d="M624.2595,268.86254c-.47244-4.968-6.55849-8.02647-11.3179-6.52583s-7.88411,6.2929-8.82863,11.19308a16.0571,16.0571,0,0,0,2.16528,12.12236c2.40572,3.46228,6.82664,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59956,8.90127-10.32105s.00667-9.58929-.91854-14.31234Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
                                <path d="M691.24187,275.95964c-.47245-4.968-6.5585-8.02646-11.3179-6.52582s-7.88412,6.29289-8.82864,11.19307a16.05711,16.05711,0,0,0,2.16529,12.12236c2.40571,3.46228,6.82663,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59955,8.90127-10.32105s.00667-9.58929-.91853-14.31234Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
                                <path d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169Z" transform="translate(-154.35252 -77.40283)" fill="currentColor" />
                                <path d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169ZM169.3618,176.01571A13.024,13.024,0,0,0,156.35252,189.025v94.5625a13.024,13.024,0,0,0,13.00928,13.00927H431.5814a8.02436,8.02436,0,0,1,5.90039,2.59571l49.62208,54.1333a2.50253,2.50253,0,0,0,4.34716-1.69092v-47.0332a8.0137,8.0137,0,0,1,8.00464-8.00489H509.087a13.024,13.024,0,0,0,13.00928-13.00927V189.025A13.024,13.024,0,0,0,509.087,176.01571Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
                                <circle cx="36.81601" cy="125.19345" r="13.13371" fill='#00aa6c'/>
                                <path d="M493.76439,275.26947H184.68447a7.00465,7.00465,0,1,1,0-14.00929H493.76439a7.00465,7.00465,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill={'#e6e6e6'}/>
                                <path d="M393.07263,245.49973H184.68447a7.00465,7.00465,0,1,1,0-14.00929H393.07263a7.00464,7.00464,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill={'#e6e6e6'}/>
                                <path d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065Z" transform="translate(-154.35252 -77.40283)" fill="currentColor" />
                                <path d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065ZM690.913,497.01571A13.024,13.024,0,0,0,677.9037,510.025v94.5625A13.024,13.024,0,0,0,690.913,617.59676h9.63135a8.0137,8.0137,0,0,1,8.00464,8.00489v47.0332a2.50253,2.50253,0,0,0,4.34716,1.69092l49.62208-54.1333a8.02436,8.02436,0,0,1,5.90039-2.59571h262.2196a13.024,13.024,0,0,0,13.00928-13.00927V510.025a13.024,13.024,0,0,0-13.00928-13.00928Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
                                <path d="M603.53027,706.11319a89.06853,89.06853,0,0,1-93.65039,1.49,54.12885,54.12885,0,0,1,9.40039-12.65,53.43288,53.43288,0,0,1,83.90967,10.56994C603.2998,705.71316,603.41992,705.91318,603.53027,706.11319Z" transform="translate(-154.35252 -77.40283)" fill='#00aa6c'/>
                                <circle cx="398.44256" cy="536.68841" r="44.20157" fill="#2f2e41"/>
                                <circle cx="556.81859" cy="629.4886" r="32.89806" transform="translate(-416.96496 738.72884) rotate(-61.33685)" fill="#ffb8b8" />
                                <path d="M522.25039,608.79582a44.74387,44.74387,0,0,0,25.57085,7.9025,27.41946,27.41946,0,0,1-10.8677,4.47107,90.22316,90.22316,0,0,0,36.85334.20707,23.852,23.852,0,0,0,7.71488-2.64973,9.76352,9.76352,0,0,0,4.762-6.36865c.80855-4.61909-2.7907-8.81563-6.53113-11.64387a48.17616,48.17616,0,0,0-40.4839-8.08981c-4.52231,1.169-9.05265,3.144-11.99,6.77579s-3.80746,9.23076-1.0089,12.97052Z" transform="translate(-154.35252 -77.40283)" fill="#2f2e41" />
                                <path d="M555.5,721.17319a89.97205,89.97205,0,1,1,48.5708-14.21875A89.87958,89.87958,0,0,1,555.5,721.17319Zm0-178a88.00832,88.00832,0,1,0,88,88A88.09957,88.09957,0,0,0,555.5,543.17319Z" transform="translate(-154.35252 -77.40283)" fill="#3f3d56" />
                                <circle cx="563.81601" cy="445.19345" r="13.13371" fill='#00aa6c'/>
                                <path d="M1020.76439,595.26947H711.68447a7.00465,7.00465,0,1,1,0-14.00929h309.07992a7.00464,7.00464,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill={'#e6e6e6'}/>
                                <path d="M920.07263,565.49973H711.68447a7.00465,7.00465,0,1,1,0-14.00929H920.07263a7.00465,7.00465,0,0,1,0,14.00929Z" transform="translate(-154.35252 -77.40283)" fill={'#e6e6e6'}/>
                                <ellipse cx="554.64354" cy="605.66091" rx="24.50394" ry="2.71961" fill={'#e6e6e6'}/>
                                <ellipse cx="335.64354" cy="285.66091" rx="24.50394" ry="2.71961" fill={'#e6e6e6'}/>
                            </svg>

                        </div>
                    }

                    <div className="bottom-container">

                        <form onSubmit={(e) => { e.preventDefault(); _send_(); }} className="message-form">

                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} ref={ref} placeholder="Write a Message ..." required className="input-field" autoComplete="off"/>

                            <div className="icon-container">

                                <div className="icon mood-icon">
                                    <span className="icon-symbol material-symbols-outlined" translate="no">mood</span>
                                </div>

                                <div onClick={() => fileRef.current?.click()}>

                                    <div className="icon attachment-icon">
                                        <span className="icon-symbol material-symbols-outlined" translate="no">attachment</span>
                                    </div>

                                    <input type="file" ref={fileRef} onChange={(e) => on_file(e.target.files || [])} multiple className="file-input"/>
                                
                                </div>

                            </div>

                        </form>

                    </div>

                </div>

                <Loader className={`bg ${loader && tab ? 'scale-1 opacity-1' : 'transition-all duration-500 scale-0 opacity-0'}`}/>

            </div>

            <Broadcast 
                user={user || {}} messages={messages} setMessages={setMessages} 
                unreaden={unreaden} setUnreaden={setUnreaden} model={model} tab={tab}
            />

        </div>

    )

}
