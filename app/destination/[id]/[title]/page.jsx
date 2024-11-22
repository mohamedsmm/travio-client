import Destination from "./component";
import { api } from "@/public/script/public";
import { redirect } from "next/navigation";

export const metadata = {title: "Destination"}

export default async function Page({ params }) {

    const data = await api(`home/categories/${params.id}`);
    if ( !data.destination ) return redirect('/');

    metadata.title = `${JSON.parse(data.destination.name).en}`;

    return <Destination data={data.destination} tours={data.tours || []} recent_tours={data.recent_tours || []} settings={data.settings || {}}/>
    
}
