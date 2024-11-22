import Register from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Register'}

export default async function Page() {

    const data = await api('home');

    return <Register settings={data.settings || {}}/>

}
