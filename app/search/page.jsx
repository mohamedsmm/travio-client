import Search from "./component";
import { api } from "@/public/script/public";
import { redirect } from "next/navigation";

export const metadata = {title: 'Search'}

export default async function Page(props) {

    const query = props.searchParams.query || '';
    const date = props.searchParams.date || '';
    if ( !query && !date ) redirect('/');
    
    const data = await api('home/search', {text: query, date: date});
    return <Search tours={data.tours || []} query={query} date={date} settings={data.settings || {}}/>

}
