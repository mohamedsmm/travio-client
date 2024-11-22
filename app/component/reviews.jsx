"use client";
import { Fragment, useEffect, useState } from "react";
import Stars from "@/app/component/stars";
import { date, print } from "@/public/script/public";
import $ from "jquery";

export default function Reviews ({ stars, data, length }) {

    const [reviews, setReviews] = useState([]);
    const [count, setCount] = useState(0);

    const like = (id) => {

        print(id);

    }
    const dislike = (id) => {

        print(id);

    }
    const more = () => {
        
        let data_ = [
            {
                id: 1, name: 'Coding Master', date: '2023-11-02 04:19:23', stars: 4,
                content: 'Welcome to python and enter your name here sir please give me your option'
            }
        ];

        setReviews(data_);

    }
    useEffect(() => {

        let data_ = [
            {
                id: 1, name: 'Coding Master', date: '2023-11-02 04:19:23', stars: 4,
                content: 'Welcome to python and enter your name here sir please give me your option'
            }
        ];

        setReviews(data_.slice(0, 2));
        setCount(length);

    }, []);
    
    return (

        <Fragment>

            <div className="reviews flex-column full-width">

                <h1 className="full-width flex-start">Reviews</h1>

                <div className="data-info flex-space align-start full-width">

                    <div className="counts flex-column">
                        
                        <div className="replys flex-start full-width default">

                            <span>{parseFloat(stars).toFixed(1)}</span>

                            <Stars count={stars}/>

                        </div>

                        <span className="flex-start full-width default">{count} reviews</span>

                    </div>

                    <div className="divs flex-column">
                        
                        <ul className="flex full-width">
                            <li className="type">5 stars</li>
                            <li className="div"><div style={{width: "90%"}}></div></li>
                            <li className="count">40</li>
                        </ul>
                        <ul className="flex full-width">
                            <li className="type">4 stars</li>
                            <li className="div"><div style={{width: "70%"}}></div></li>
                            <li className="count">70</li>
                        </ul>
                        <ul className="flex full-width">
                            <li className="type">3 stars</li>
                            <li className="div"><div style={{width: "30%"}}></div></li>
                            <li className="count">80</li>
                        </ul>
                        <ul className="flex full-width">
                            <li className="type">2 stars</li>
                            <li className="div"><div style={{width: "10%"}}></div></li>
                            <li className="count">50</li>
                        </ul>
                        <ul className="flex full-width">
                            <li className="type">1 star</li>
                            <li className="div"><div style={{width: "5%"}}></div></li>
                            <li className="count">65</li>
                        </ul>

                    </div>

                </div>

                <div className="review full-width flex-column">

                    {
                        reviews.map((item) =>

                            <div key={item.id} className="flex-column full-width">

                                <div className="first flex-column full-width">
                                
                                    <div className="replys flex-start full-width default">
        
                                        <span>{item.name}</span>
        
                                        <Stars count={item.stars}/>
        
                                    </div>
        
                                    <span className="flex-start full-width default">
                                        {date('mon_name', item.date)}&nbsp;
                                        {date('day', item.date)},&nbsp;
                                        {date('year', item.date)}
                                    </span>
        
                                </div>
        
                                <div className="content full-width flex-start">
        
                                    <p className="full-width flex-start default left-text">{item.content}</p>
        
                                </div>
        
                                <div className="action full-width flex-end">
        
                                    <div className="like flex-start pointer" onClick={_ =>
                                            {
                                                $(_.target).parents('.action').find('.like').hide();
                                                $(_.target).parents('.action').find('.dislike').css("display", "flex");
                                                like(item.id)
                                            }
                                        }>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                                            <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
                                            <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 
                                                1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/>
                                        </svg>
        
                                        <span>Helpful</span>
                                        
                                    </div>
        
                                    <div className="dislike flex-start pointer hide" onClick={_ =>
                                            {
                                                $(_.target).parents('.action').find('.dislike').hide();
                                                $(_.target).parents('.action').find('.like').css("display", "flex");
                                                dislike(item.id)
                                            }
                                        }>
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 
                                            7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                                        </svg>
        
                                        <span>Liked</span>
                                        
                                    </div>
        
                                </div>
        
                            </div>

                        )
                    }


                </div>

                {
                    count > 3 ? <div className="buttons full-width flex-start" onClick={_ => { _.target.remove(); more(); }}>
                        <a className="show-more pointer">Show <span>{reviews.length}</span> More</a>
                    </div> : null
                }
                

            </div>

        </Fragment>

    )

}
