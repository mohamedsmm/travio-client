"use client";
import { api, get_session } from '@/public/script/public';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Echo from "@/utils/echo";
import Pending from './pending';
import Successful from './successful';
import Failed from './failed';

export default function Redirect () {

    const router = useRouter();
    const [channel, setChannel] = useState(null);
    const [data, setData] = useState({});
    const [verified, setVerified] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const set_transaction = ( transaction ) => {

        if ( verified ) return;
        localStorage.removeItem('transaction_id');
        setData(transaction?.order || {});
        setSuccessful(transaction?.status === 'successful');
        setVerified(transaction ? true : false);

    }
    const manual_verify = async() => {

        const transaction_id = localStorage.getItem('transaction_id');
        if ( !transaction_id ) router.replace('/checkout');
        
        const response = await api(`home/pay/verify`, { transaction_id: transaction_id });
        set_transaction(response.transaction);
    
    }
    useEffect(() => {

        if ( !channel ) return;
        channel.listen('.payment.completed', ( e ) => set_transaction(e.transaction));

    }, [channel]);
    useEffect(() => {

        manual_verify();
        setChannel(Echo.private(`payment.${get_session('user')?.id}`));

    }, []);

    return (

        <div className='w-full my-8'>

            <main>
                {
                    !verified ? <Pending data={data}/> :
                    successful ? <Successful data={data}/> : <Failed data={data}/>
                }
            </main>

        </div>

    )

}
