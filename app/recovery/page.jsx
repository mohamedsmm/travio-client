import Recovery from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Recovery'}

export default async function Page () {

    const data = await api('home');

    return <Recovery settings={data.settings || {}}/>

}
