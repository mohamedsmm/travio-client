import "@/public/sass/main.scss";
import { api } from "@/public/script/public";

export const metadata = {
    description: 'Read Verified Reviews & Book Over 345,000 Things to Do on kimitours! Quick & Easy Purchase Process! Full Refund Available up to 24 Hours Before Your Tour Date. Over 300,000 Experiences. All Available in One App. Photos, Videos, & Maps. A TripAdvisor Compa',
}

export default async function Layout({ children }) {

    // const data = await api('home', 'post');
    const data = {settings: {name: 'Travio'}}

    if ( data.settings ) {
        metadata.title = {template: `%s | ${data.settings.name}`};
        // metadata.description = data.settings.description;
        // metadata.keywords = data.settings.keywords && data.settings.keywords.split(',');
        // metadata.authors = [{name: data.settings.name, url: `https:web.whatsapp.com/send/?phone=${data.settings.phone}`}];
        // metadata.creator = data.settings.name;
        // metadata.generator = data.settings.name;
        // metadata.applicationName = data.settings.name;
    }

    return (

        <html>
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="og:description" content="Read Verified Reviews & Book Over 345,000 Things to Do on kimitours! Quick & Easy Purchase Process! Full Refund Available up to 24 Hours Before Your Tour Date. Over 300,000 Experiences. All Available in One App. Photos, Videos, & Maps. A TripAdvisor Compa" />
                <meta name="description" content="Read Verified Reviews & Book Over 345,000 Things to Do on kimitours! Quick & Easy Purchase Process! Full Refund Available up to 24 Hours Before Your Tour Date. Over 300,000 Experiences. All Available in One App. Photos, Videos, & Maps. A TripAdvisor Compa" />
                <meta name="keywords" content="kimitours, viator, booking, tours, booking tours, tourism, kimitours.com" />
                <link rel="icon" href="/media/image/public/favicon.ico"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </head>
            <body>
                {children}
            </body>
        </html>

    )

}
