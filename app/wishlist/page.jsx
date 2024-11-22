import Wishlist from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Wishlist'}

export default async function Page() {

    const data = await api('home');
    
    return <Wishlist settings={data.settings || {}}/>

}
