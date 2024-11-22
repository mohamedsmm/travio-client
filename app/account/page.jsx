import Account from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Account'}

export default async function Page () {

    const data = await api('home');

    return <Account settings={data.settings || {}}/>

}
