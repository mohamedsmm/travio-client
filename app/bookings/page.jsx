import Bookings from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Bookings'}

export default async function Page() {

    const data = await api('home');

    return <Bookings settings={data.settings || {}}/>

}
