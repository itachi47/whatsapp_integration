
import { sendWhatsAppMessage } from '@/lib/api';
import {NextResponse} from 'next/server';

export async function POST(request) {
  try {
    const {to, link, filename } = await request.json();
    const messagePayload =  JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "template",
        "template": {
            "name": "send_pdf",
            "language": {
                "code": "en_US"
            },
            "components": [
                {
                    "type" : "header",
                    "parameters": [
                        {
                            "type": "document",
                            "document": {
                                "link": link,
                                "filename": filename
                            }
                        }
                    ]
                }
            ]
        }
      });
    const res = await sendWhatsAppMessage(messagePayload)
    const resJson = await res.json();
    return NextResponse.json(resJson, {status: 200})
  } catch (e) {
    return NextResponse.json({message: e.message}, {status: 400})
  }
}