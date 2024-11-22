"use client"
import Nav from "@/app/component/nav";
import Chat from "@/app/component/chat/index";
import Footer from "@/app/component/footer";
import Tours from "@/app/component/tours";
import { Fragment, useEffect, useState } from "react";
import { api, get_session, host, parse } from "@/public/script/public";
import { tables } from "@/public/script/table";
import Link from "next/link";
import $ from "jquery";

export default function Bookings ({ settings }) {

    const [tours, setTours] = useState([]);
    const [data, setData] = useState([]);
    let user = {};

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
    
    }
    const get_bookings = async() => {

        user = get_session('user') || {id: 0, name: 'Dear'};
        let response = await api('home/history');
        if ( response.recent_tours && !tours.length ) setTours(response.recent_tours);
        setData(response.bookings || []);
        setTimeout(_ => { tables(); favorites(); }, 100);

    }
    const change_status = async(status, ids) => {

        ids.forEach((id) => {
            $('.table').find(`tr[data-id='${id}'] .book_status`).find('span').hide();
            $('.table').find(`tr[data-id='${id}'] .book_status`).find(`span.${status}`).show();
            if ( status == 'active' ) $('.table').find(`tr[data-id='${id}'] .book_status`).html(`<span class="warning-state active">Pending</span>`);
            else $('.table').find(`tr[data-id='${id}'] .book_status`).html(`<span class="danger-state cancel">Stopped</span>`);
        });

        let response = await api('home/update-history', {'status': status == 'active' ? 'pending' : 'request', 'ids': JSON.stringify(ids)})

    }
    const remove_booking = async(ids) => {

        ids.forEach((id) => {
            let tr = $('.table').find(`tr[data-id='${id}']`);
            if ( tr.attr('remove') == '1' ) tr.remove();
        });

        let response = await api('home/delete-history', {'ids': JSON.stringify(ids)})

        if ( ! $(".table").find("tr:not(.thead):not(.fade) td").length ) {
            $(".pagination, .box, .option").hide();
            $(".table").find(".emptys").css("display", "flex");
        }

    }
    useEffect(() => {

        get_bookings();

        $('.bookings').on('click', '.table-menu .cancel', function(){
            change_status('cancel', [parseInt($(this).parents('.table-menu').attr('id'))]);
        });
        $('.bookings').on('click', '.table-menu .active', function(){
            change_status('active', [parseInt($(this).parents('.table-menu').attr('id'))]);
        });
        $('.bookings').on('click', '.table-menu .remove', function(){
            remove_booking([parseInt($(this).parents('.table-menu').attr('id'))]);
        });
        $('.bookings').on('click', '.full-actions li.active_', function(){
            let ids = [];
            $('.table tbody tr .checkbox.active').each(function(){
                ids.push(parseInt($(this).parents('tr').attr('data-id')));
            });
            $('.table tr .checkbox.active').removeClass('active');
            ids.length ? change_status('active', ids) : '';
        });
        $('.bookings').on('click', '.full-actions li.cancel', function(){
            let ids = [];
            $('.table tbody tr .checkbox.active').each(function(){
                ids.push(parseInt($(this).parents('tr').attr('data-id')));
            });
            $('.table tr .checkbox.active').removeClass('active');
            ids.length ? change_status('cancel', ids) : '';
        });
        $('.bookings').on('click', '.full-actions li.remove', function(){
            let ids = [];
            $('.table tbody tr .checkbox.active').each(function(){
                ids.push(parseInt($(this).parents('tr').attr('data-id')));
            });
            $('.table tr .checkbox.active').removeClass('active');
            ids.length ? remove_booking(ids) : '';
        });

    }, []);

    return (

        <Fragment>

            <Nav searchbox settings={settings}/> <Chat settings={settings}/>

            <div className="main-container">

                <main className="flex-column relative bookings">

                    <div className="table relative">

                        <div className="table-div">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Booking</th>
                                        <th>Tour</th>
                                        <th>Price</th>
                                        <th>Travel Date</th>
                                        <th>Pick up</th>
                                        <th>Paying</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, index) =>
                                        <tr key={index} data-id={item.id} remove={`${item.status > 2 ? 1 : 0}`}>
                                            <td>#{1000 + item.id}</td>
                                            <td>
                                                <Link href={`/tour/${item.product?.id}/${parse(item.product?.name).replace(/\//g, "")}`}>
                                                    <div className="img">
                                                        <img src={`${host}${item.product.image}`} className="full-width full-height"/>
                                                    </div>
                                                    <span>
                                                        {parse(item.product?.name)}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                {item.book_date}&nbsp;
                                                {
                                                    item.book_time ?
                                                    parseInt(item.book_time.split(':')[0]) > 12 ? 
                                                    `${item.book_time || '00'} PM` : `${item.book_time || '00'} AM` : ''
                                                }
                                            </td>
                                            <td>{item.pick_up || '-'}</td>
                                            <td>
                                                {
                                                    item.paid ?
                                                    <span className="success-state">Paid</span> :
                                                    <span className="danger-state">No</span>

                                                }
                                            </td>
                                            <td className="book_status">
                                                {
                                                    item.status == 'pending' ?
                                                    <span className="warning-state active">Pending</span>
                                                    : item.status == 'request' ?
                                                    <span className="danger-state cancel">Stopped</span>
                                                    : item.status == 'cancelled' ?
                                                    <span className="danger-state">Cancelled</span>
                                                    :
                                                    <span className="success-state">Confirmed</span>

                                                }
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>

                            <div className="emptys no-select">No Bookings Available .</div>

                        </div>

                        <div className="loader fill"></div>

                    </div>

                    <div className="lets full-width flex-column relative">

                        <h1 className="full-width left-text">Let's design your holidays,&nbsp;
                            <span>{user.name}</span> !
                        </h1>

                        <p className="full-width flex-start">See personalised recommendations based on the things.</p>

                        <div className="buttons flex-start full-width">
                            <Link href="/">See More</Link>
                        </div>

                        <img src="/media/image/public/booking.png" className="absolute"/>

                    </div>

                    {
                        tours.length > 0 &&
                        <div className="main flex-column full-width no-border">

                            <h1 className="title full-width flex-start">Recently Tours</h1><br />

                            <Tours data={tours} cards={4} />

                        </div>
                    }

                </main>

                <Footer page="Bookings" settings={settings}/>

            </div>

        </Fragment>

    )

}
