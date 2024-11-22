import Checkout from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Checkout'}

export default async function Page () {

    const data = await api('home');

    return <Checkout settings={data.settings || {}}/>

}
