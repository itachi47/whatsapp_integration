
import { sendWhatsAppMessage } from '@/lib/api';
import {NextResponse} from 'next/server';
import { post } from '@/lib/api';

export async function POST(request) {
  try {
    const {to} = await request.json();
    const messagePayload =  JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "template",
        "template": {
            "name": "welcome_message",
            "language": {
                "code": "en_US"
            },
            "components": []
        }
      });
    const res = await sendWhatsAppMessage(messagePayload)
    const resJson = await res.json();
    return NextResponse.json(resJson, {status: 200})
  } catch (e) {
    return NextResponse.json({message: e.message}, {status: 400})
  }
}