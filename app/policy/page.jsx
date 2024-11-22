import Policy from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Policy'}

export default async function Page() {

    const data = await api('home');

    return <Policy settings={data.settings || {}}/>

}
