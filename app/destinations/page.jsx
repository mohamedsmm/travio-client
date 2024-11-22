import Destinations from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Destinations'}

export default async function Page () {

    const data = await api('home');

    return <Destinations data={data} settings={data.settings || {}}/>
        
}
