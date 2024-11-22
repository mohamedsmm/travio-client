import Login from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Login'}

export default async function Page() {
    
    const data = await api('home');

    return <Login settings={data.settings || {}}/>

}
