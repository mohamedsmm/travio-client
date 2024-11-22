import CryptoJS from "./crypto";
// export const backendUrl = "http://127.0.0.1:8000";
// export const host = "http://127.0.0.1:8000/storage/";
export const backendUrl = "http://server.travio.ru";
export const host = "http://server.travio.ru/storage/";

export function sound (src, vol) {
        
    const audio = new Audio();
    audio.pause();
    audio.src = `/media/image/public/${src}.wav`;
    audio.volume = vol || 1;
    audio.play();

}
export function bootstrap () {

    const styling = (e) => {
  
        const px_rm = _ => {
            if ( !_.endsWith("px") && !_.endsWith("rem") && !_.endsWith("em") && !_.endsWith("%") ) _ += "px";
            return _;
        }
        const family = _ => {
            _ = _.split("-").slice(1);
            if ( _.length > 1 ) return _.join("-");
            _ = _[0];
            let font = "";
            if ( _.includes("_")) {
                _.split("_").forEach(c => { font += `${c} `; });
                font = font.slice(0, -1);
            }
            else font = _;
            return font;
        }
        const set_css = (classes, el) => {
    
            classes.split(" ").forEach( _ => {
                if ( _.startsWith("l-") ) el.style.cssText = `left: ${px_rm(_.split("-")[1])}; right: auto;`;
                if ( _.startsWith("r-") ) el.style.cssText = `right: ${px_rm(_.split("-")[1])}; left: auto;`;
                if ( _.startsWith("t-") ) el.style.cssText = `top: ${px_rm(_.split("-")[1])}; bottom: auto;`;
                if ( _.startsWith("b-") ) el.style.cssText = `bottom: ${px_rm(_.split("-")[1])}; top: auto;`;
                if ( _.startsWith("pl-") ) el.style.cssText = `padding-left: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("pr-") ) el.style.cssText = `padding-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("plr-") ) el.style.cssText = `padding-left: ${px_rm(_.split("-")[1])}; padding-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("prl-") ) el.style.cssText = `padding-left: ${px_rm(_.split("-")[1])}; padding-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("pt-") ) el.style.cssText = `padding-top: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("pb-") ) el.style.cssText = `padding-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("ptb-") ) el.style.cssText = `padding-top: ${px_rm(_.split("-")[1])}; padding-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("pbt-") ) el.style.cssText = `padding-top: ${px_rm(_.split("-")[1])}; padding-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("p-") ) el.style.cssText = `padding: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("ml-") ) el.style.cssText = `margin-left: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mr-") ) el.style.cssText = `margin-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mlr-") ) el.style.cssText = `margin-left: ${px_rm(_.split("-")[1])}; margin-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mrl-") ) el.style.cssText = `margin-left: ${px_rm(_.split("-")[1])}; margin-right: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mt-") ) el.style.cssText = `margin-top: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mb-") ) el.style.cssText = `margin-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mtb-") ) el.style.cssText = `margin-top: ${px_rm(_.split("-")[1])}; margin-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("mbt-") ) el.style.cssText = `margin-top: ${px_rm(_.split("-")[1])}; margin-bottom: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("m-") ) el.style.cssText = `margin: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("w-") ) el.style.cssText = `width: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("maxw-") ) el.style.cssText = `max-width: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("minw-") ) el.style.cssText = `min-width: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("h-") ) el.style.cssText = `height: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("maxh-") ) el.style.cssText = `max-height: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("minh-") ) el.style.cssText = `min-height: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("size-") ) el.style.cssText = `font-size: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("family-") ) el.style.cssText = `font-family: ${family(_)}`;
                if ( _.startsWith("radius-") ) el.style.cssText = `border-radius: ${px_rm(_.split("-")[1])}`;
                if ( _.startsWith("back-") ) el.style.cssText = `background: ${_.split("-")[1]}`;
                if ( _.startsWith("color-") ) el.style.cssText = `color: ${_.split("-")[1]}`;
                if ( _.startsWith("transition-") ) el.style.cssText = `transition: all ${px_rm(_.split("-")[1])} linear`;
                if ( _.startsWith("cursor-") ) el.style.cssText = `cursor: ${_.split("-")[1]}`;
                if ( _.startsWith("z-") ) el.style.cssText = `z-index: ${_.split("-")[1]}`;
                if ( _.startsWith("backdropFilter-") ) el.style.cssText = `backdrop-filter: ${_.split("-")[1]}`;
            });
    
        }
        
        let data_child = e.getAttribute("data-child");
        let classes = e.getAttribute("class");
        if ( classes ) set_css(classes, e);
        if ( data_child ) Array.from(e.children).forEach( _ => set_css(data_child, _));
        
    }
    document.querySelectorAll("*").forEach(() => {
        
        styling(_);

    });

}
export function set_session (key, value, local=true) {

    value = value ? JSON.stringify(value) : '';
    value = CryptoJS.AES.encrypt(value, "Coding Master").toString();
    if ( local ) localStorage.setItem(key, value);
    else sessionStorage.setItem(key, value);

}
export function get_session (key, local=true) {

    if ( typeof window === "undefined" ) return;
    let value = localStorage.getItem(key);
    if ( !local ) value = sessionStorage.getItem(key);
    if ( !value ) return value;
    value = CryptoJS.AES.decrypt(value, "Coding Master").toString(CryptoJS.enc.Utf8);
    return value ? JSON.parse(value) : value;

}
export function remove_session (key, local=true) {

    if ( local ) localStorage.removeItem(key);
    else sessionStorage.removeItem(key);

}
export function print (..._) {
    
    console.log(..._);

}
export function position (element, query) {

    if (query === "top") return element.offsetTop;

    if (query === "bottom") return window.outerHeight - element.offsetTop;

    if (query === "left") return element.offsetLeft;

    else if (query === "right") return window.outerWidth - element.offsetLeft;

    else return [element.offsetTop, element.offsetLeft];

}
export function cookie(name) {

    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {

            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + "=")) {

                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;

            }

        }

    }

    return cookieValue;

}
export async function api ( url, data ) {

    url = `${backendUrl}/api/client/old/${url}`;
    let form = new FormData();
    Object.keys(data || {}).forEach(_ => form.append(_, data[_]));

    const response = await fetch(url, {
        method: 'POST',
        body: form,
        cache: 'no-store',
        headers: {'Authorization': `Bearer ${get_session("user")?.token}`}
    });
    
    const res = await response.text();
    try{ return JSON.parse(res); }catch(e){ return res; }

}
export function query ( query ) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[query] ? params[query] : params;

}
export function date (query, _) {

    query = query ? query.toLowerCase().replace(/\s+/g, "") : "full";
    var cur_date = _ ? new Date(_.toString().trim()) : new Date();
    let Months = ["January","February","March","April","May","June","July","August",
                    "September","October","November","December"];
    let Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let Mon_name = Months[cur_date.getMonth()];
    let Day_name = Days[cur_date.getDay()];
    let Week_day = cur_date.getDay();
    let years = cur_date.getFullYear();
    let months = cur_date.getMonth() + 1;
    let days = cur_date.getDate();
    let hours = cur_date.getHours();
    let hrs = cur_date.getHours();
    let minutes = cur_date.getMinutes();
    let seconds = cur_date.getSeconds();
    let p = cur_date.getHours() > 12 ? "PM" : "AM";

    hrs = hrs > 12 ? hrs - 12 : hrs;
    hrs = hrs === 0 ? 12 : hrs < 10 ? `0${hrs}` : `${hrs}`;
    years = years < 10 ? `0${years}` : `${years}`;
    months = months < 10 ? `0${months}` : `${months}`;
    days = days < 10 ? `0${days}` : `${days}`;
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if (query === 'y') return cur_date.getFullYear();
    else if (query === 'm') return cur_date.getMonth() + 1;
    else if (query === 'd')  return cur_date.getDate();
    else if (query === 'h') return cur_date.getHours();
    else if (query === 'mi') return cur_date.getMinutes();
    else if (query === 's') return cur_date.getSeconds();
    else if ("years".includes(query)) return cur_date.getFullYear();
    else if ("months".includes(query)) return cur_date.getMonth() + 1;
    else if ("days".includes(query))  return cur_date.getDate();
    else if ("hours".includes(query)) return cur_date.getHours();
    else if ("minutes".includes(query)) return cur_date.getMinutes();
    else if ("seconds".includes(query)) return cur_date.getSeconds();
    else if ("weekdays".includes(query)) return cur_date.getDay();
    else if ("ps".includes(query)) return p;
    else if ("month_lists".includes(query)) return Months;
    else if ("mon_lists".includes(query)) return Months.map(_ => _.slice(0, 3));
    else if ("day_lists".includes(query)) return Days;
    else if ("d_lists".includes(query)) return Days.map(_ => _.slice(0, 3));
    else if ("day_names".includes(query)) return Day_name;
    else if ("d_names".includes(query)) return Day_name.slice(0, 3);
    else if ("month_names".includes(query)) return Mon_name;
    else if ("mon_names".includes(query)) return Mon_name.slice(0, 3);
    else if ("weekdays".includes(query)) return Week_day;
    else if ("dates".includes(query)) return `${years}-${months}-${days}`;
    else if ("times".includes(query)) return `${hours}:${minutes}:${seconds}`;
    else if ("dts".includes(query)) return `${years}-${months}-${days} ${hrs}:${minutes} ${p}`;
    else if ("datetimes".includes(query)) return `${years}-${months}-${days} ${hrs}:${minutes}:${seconds} ${p}`;
    else if ("todays".includes(query)) return `${Days[Week_day]}, ${Months[months-1].slice(0, 3)} ${days.replace(/^0/, '')}, ${years}`;
    return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;

}
export function seconds_to_date ( seconds ) {

    let dt = new Date(1970, 0, 1);
    dt.setSeconds(seconds);
    let full_date = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDay()}`;
    let full_time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
    return `${full_date} ${full_time}`;

}
export function diff_date (start, end) {

    start = start ? new Date(start) : new Date();
    end = end ? new Date(end) : new Date();
    return Math.floor((end.getTime() - start.getTime()) / 1000);

}
export function file_info ( File, query ) {
    
    query = query ? query.toLowerCase() : '';
    if ( !File ) return '';
    let Size = File['size'];
    let Real_Size = File['size'];
    let Name = File['name'].split(".").slice(0, -1).join(".");
    let Type = File['type'].split("/")[0];
    let Extention = File['name'].split(".").slice(-1)[0];
    let LastModifiedDate = File['lastModifiedDate'];
 

    if ( !File['type'] ) Extention = "";
    if (Size < 1000) Size = `${Size} Byte`
    else if (Size >= 1000 && Size < 1000000) Size = `${(Size / 1000).toFixed(2)} KB`;
    else if (Size >= 1000000 && Size < 1000000000) Size = `${(Size / 1000000).toFixed(2)} MB`;
    else if (Size >= 1000000000 && Size < 1000000000000) Size = `${(Size / 1000000000).toFixed(2)} GB`;
    else Size = `${(Size / 1000000000000).toFixed(2)} TB`;

    Type = Type === 'image' ? 'image' : Type === 'video' ? 'video' : 'file';
    Extention = Extention || 'png';
    if (query === "size") return Size;
    else if (query === "real_size") return Real_Size;
    else if (query === "name") return Name;
    else if (query === "type") return Type;
    else if (query === "ext") return Extention;
    else if (query === "last_modify") return LastModifiedDate;
    return { file: File, name: Name, size: Size, type: Type, ext: Extention };

}
export function read_file ( file, type ) {

    return new Promise((resolve) => {

        if ( !file ) return resolve();

        let info = file_info(file);
        if ( type === 'image' && info.type !== 'image' ) return resolve();
        if ( type === 'image_video' && !['image', 'video'].includes(info.type) ) return resolve();
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => resolve({...info, url: e.target.result});

    });

}
export function fix_files ( data ) {

    let _new_ = {};
    data?.new_files?.forEach((f, index) => _new_[`file_${index}`] = f.file);
    if ( data.deleted_files ) _new_.deleted_files = JSON.stringify(data.deleted_files);
    return _new_;
    
}
export function image_ext( ext ) {

    let list_ = ["png", "jpg", "jpeg", "gif", "svg", "apng", "ico",
        "avif", "jfif", "pjpeg", "pjp", "webp", "bmp", "eps"];

    return list_.includes(ext.toString().toLowerCase()) ? ext : 'png';

}
export function full_screen () {

    (document.fullScreenElement && null !== document.fullScreenElement) || 
    (!document.mozFullScreen && !document.webkitIsFullScreen) ? document.documentElement.requestFullScreen ?
    document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ?
    document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen
    && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ?
    document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
    document.webkitCancelFullScreen && document.webkitCancelFullScreen()

}
export function get (_) {

    return document.querySelector(_);

}
export function get_all (_) {

    return document.querySelectorAll(_);

}
export function check_hidden(_){ 
    
    return document.querySelector(_).style.display === "none";

}
export function check_class(el, class_name, check_parent=true) {

    let same = false;

    class_name.split(" ").forEach( _ => {

        if ( check_parent ) {
            if ( el.classList.contains(_) || el.closest(`.${_}`) ) same = true
        }
        else {
            if ( el.classList.contains(_) ) same = true;
        }
    
    });

    return same;

}
export function lower ( str ) {
    
    return str ? str.toString().toLowerCase() : str;

}
export function upper ( str ) {
    
    return str ? str.toString().toUpperCase() : str;

}
export function capitalize ( str ) {
    
    if ( !str ) return str;
    str = lower(str);
    return str.replace(str.slice(0, 1), upper(str.slice(0, 1)));

}
export function title ( str ) {
    
    if ( !str ) return str;
    str = lower(str);
    return str.split(" ").map(_ => capitalize(_)).join(" ");

}
export function trim ( str ) {
    
    return str ? str.toString().trim(): str;

}
export function no_space ( str ) {
    
    return str ? str.toString().replace(/\s+/g, '') : str;

}
export function int (_) {
    
    return parseInt(_);

}
export function float (_) {
    
    return parseFloat(_)

}
export function round (num, _) {

    if ( !_ ) return parseInt(num);

    return parseFloat(num).toFixed(_);

}
export function parse ( _ ) {

    if ( typeof window === 'undefined' ) return JSON.parse(_ || "{}").en || '';
    return JSON.parse(_ || "{}")[localStorage.getItem('lang') || 'en'] || '';

}
export function language () {

    let lang = navigator.language || navigator.userLanguage || 'en';
    lang = lang.split("-")[0].toLowerCase();
    return lang
    
}
export function fix_number (num) {

    if ( !num ) return 0;
    let text = num.toString().split('').reverse();
    let number = "";
    text.forEach((_, i) => {
        number += _;
        if ( (i + 1) % 3 === 0 && i < text.length - 1) number += ","
    });
    number = number.split('').reverse().join('');
    return number;

}
export function fix_date (dt) {
    
    let seconds = diff_date(dt || '');
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(seconds / 60 / 60);
    let days = Math.floor(seconds / 60 / 60 / 24);
    let months = Math.floor(seconds / 60 / 60 / 24 / 30);
    let years = Math.floor(seconds / 60 / 60 / 24 / 365);

    let fixed_date = "Now";
    if ( years ) fixed_date = `${years === 1 ? "year ago" : "years ago"}`;
    else if ( months ) fixed_date = `${months === 1 ? "month ago" : "months ago"}`;
    else if ( days ) fixed_date = `${days === 1 ? "day ago" : "days ago"}`;
    else if ( hours ) fixed_date = `${hours === 1 ? "hour ago" : "hours ago"}`;
    else if ( minutes ) fixed_date = `${minutes === 1 ? "minute ago" : "minutes ago"}`;

    return fixed_date;

}
export function fix_time ( dt ) {
    
    dt = dt || ''
    let hours = parseInt(dt?.split(" ")[1]?.split(':')?.slice(0, 2)[0] || 0);
    let minutes = parseInt(dt?.split(" ")[1]?.split(':')?.slice(0, 2)[1] || 0);
    let p = 'PM';

    if ( hours > 10 ) { hours -= 12; p = 'PM'; }
    if ( hours === 0 ) { hours = 12; p = 'AM'; }

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${p}`;

}
export function copy ( text ) {

    navigator.clipboard.writeText(text);

}
export function scroll_down ( e, smooth ) {

    let element = document.querySelector(e);
    if ( smooth ) element?.classList.add('scroll-smooth');
    else element?.classList.remove('scroll-smooth');

    setTimeout(() => {
        element?.scrollBy(0, 100000);
        if ( element ) element.scrollTop = element.scrollHeight;
    }, 100);

}
export function is_down ( e, space ) {

    space = space || 100;
    let result = parseInt(e.target.scrollTop + e.target.offsetHeight) > ( e.target.scrollHeight - space );
    return !result;

}
export function scroll_to ( id ) {

    setTimeout(() => {

        let element = document.querySelector(`#${id}`);
        if ( !element ) return;
        let parent = element.closest('.chat-conversation-box');

        if ( parent ) {
            let list = Array.from(parent.children);
            let prev = list[list.indexOf(element)-1];
            prev.scrollIntoView();
        }

    }, 500);

}
