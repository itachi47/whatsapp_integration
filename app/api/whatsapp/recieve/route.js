import {NextResponse} from 'next/server';
import { post, postFormFlowData } from '@/lib/api';

//verfiy token to udpate the callback for message recieved.
export async function GET(request) {
    try {
        const query  = request.nextUrl.searchParams;
        if (
            query.get('hub.mode') === 'subscribe' &&
            query.get('hub.verify_token') === process.env.WA_SECRET
        ) {
            return new Response(query.get('hub.challenge'), {
                status: 200,
            });
        }
        throw new Error('Failed to verify the token');
    
    } catch (error) {
        console.log(error);
       return NextResponse.json(error, {status: 400});
    }
    
} 

//makes this request to post every message from the user
export async function POST(request) {
    try {
        const body = await request.json();
        if( body?.object && body?.entry[0]?.changes[0]?.value?.messages?.length > 0) {
            const from = body?.entry[0]?.changes[0]?.value?.messages[0]?.from || '';
            const message = body?.entry[0]?.changes[0]?.value?.messages[0];
            // send the data on the requested callback
            if (message?.type === 'interactive') {
                postFormFlowData(message);
            } else if (message?.type === 'button') {
                post(`${process.env.BASE_URL}/api/whatsapp/send/form_flow`, {
                    to: from,
                    body: "Hi, test we are here to help you with converting the link in the pdf data, click on the get started and provide some basic details, and let the magic happen",
                    footer: "connect: hello@suitable.ai"
                })
            }
        }
        return NextResponse.json('OK', {status: 200});
    } catch(error) {
        console.log(error)
        return NextResponse.json(error, {status: 400});
    }
}