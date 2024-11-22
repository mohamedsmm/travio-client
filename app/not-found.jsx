import Error from "@/app/component/error";
import { api } from "@/public/script/public";

export const metadata = { title: 'Error - 404 !' }

export default async function Page () {

    const data = await api('all-data');

    return <Error settings={data.settings || {}}/>

}
