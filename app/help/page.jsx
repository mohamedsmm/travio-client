import Help from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Help Center'}

export default async function Page() {

    const data = await api('home');

    return <Help settings={data.settings || {}}/>

}
