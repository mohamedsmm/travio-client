"use client";
import { host, fix_number, parse } from "@/public/script/public";
import Stars from "@/app/component/stars";
import Link from "next/link";
import { Countries } from "@/utils/countries";

export default function Card ({ data, favore }) {

    let discount = Math.round((data.old_price - data.new_price) / data.old_price * 100);
    discount = discount < 10 ? `0${discount}` : discount;

    return (

        <div className="flex-column relative tour-card" data-id={data.id}>
            
            <Link href={`/tour/${data.id}/${parse(data.name).replace(/\//g, "")}`} className="image full-width flex">
                
                <img src={`${host}${data.image}`}/>

            </Link>

            <Link href={`/tour/${data.id}/${parse(data.name).replace(/\//g, "")}`} className="full-width flex-column info">

                <p className="full-width flex-start">
                    <i className="fa fa-globe" style={{ fontSize: '1.05rem' }}></i>
                    <span style={{ fontSize: '.85rem', margin: '-1px .6rem 0', color: '#000' }}>
                        {parse(data.location)}
                    </span>
                </p>

                <h1 className="full-width">{parse(data.name)}</h1>

                <div className="free full-width flex flex-start">
                    {
                        data.cancellation &&
                        <div className="flex">
                            <span className="material-symbols-outlined icon">check_circle</span>
                            <span>Free Cancellation</span>
                        </div>
                    }
                </div>

                <div className="full-width flex-space card-price">

                    <div className="replys flex-start full-width">

                        <Stars count={data.rate || 5}/>

                        <span className="flex" style={{ fontSize: '.8rem' }}>
                            ({fix_number(data.reviews || Math.floor(Math.random() * (1000 - 100 + 1)) + 100)})
                        </span>

                    </div>

                    <p className="flex-end p">
                        { data.old_price > data.new_price && <span className="bold old-price">${data.old_price}</span> }
                        <span className="bold">${data.new_price}</span>
                    </p>

                </div>

            </Link>

            {/* { data.old_price > data.new_price && <div className="discount">{discount}%</div> } */}

            {
                data.old_price > data.new_price &&
                <div className="discount1">
                    <img src="/media/image/public/coupon.png"/>
                    <div>
                        <span>Hot</span>
                        <span>{discount}%</span>
                    </div>
                </div>
            }

            <div className={`favor absolute flex pointer circle del ${!favore && 'hide'}`}><i className="fa fa-heart"></i></div>
            <div className={`favor absolute flex pointer circle add ${favore && 'hide'}`}><i className="fa fa-heart-o"></i></div>

        </div>
        
    )

}
