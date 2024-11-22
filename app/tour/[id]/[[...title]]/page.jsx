import Tour from "./component";
import { api } from "@/public/script/public";
import { redirect } from "next/navigation";

export const metadata = {title: 'Tour'}

export default async function Page({ params }) {

    const data = await api(`home/products/${params.id}`);
    if ( !data.tour ) redirect('/');
    
    metadata.title = `${JSON.parse(data.tour.name).en}`;
    metadata.keywords = data.tour.keys && data.tour.keys.split(',');

    return <Tour data={data.tour} tours={data.recommend_tours} settings={data.settings || {}}/>

}
