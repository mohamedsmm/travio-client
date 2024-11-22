import Home from "@/app/component/home";
import { api } from "@/public/script/public";

export const metadata = {
    title: 'Kimitours',
    description: 'Read Verified Reviews & Book Over 345,000 Things to Do on kimitours! Quick & Easy Purchase Process! Full Refund Available up to 24 Hours Before Your Tour Date. Over 300,000 Experiences. All Available in One App. Photos, Videos, & Maps. A TripAdvisor Compa',
}

export default async function Page () {

    const data = await api('home');
    return <Home data={data} settings={data.settings || {}}/>
        
}
