import Change from "./component";
import { api } from "@/public/script/public";

export const metadata = {title: 'Change Password'}

export default async function Page ({ params }) {

    const data = await api(`auth/check-token/${params.token}`);

    return <Change token={params.token} status={data.status} settings={data.settings || {}}/>

}
