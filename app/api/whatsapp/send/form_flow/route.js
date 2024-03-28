
import { sendWhatsAppMessage } from '@/lib/api';
import {NextResponse} from 'next/server';

export async function POST(request) {
  try {
    const {to, body, footer} = await request.json();
    const messagePayload =  JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": to,
        "type": "interactive",
        "interactive": {
          "type": "flow",
          "body": {
            "text": body
          },
          "footer": {
            "text": footer
          },
          "action": {
            "name": "flow",
            "parameters": {
              "flow_message_version": "3",
              "flow_id": process.env.FLOW_ID,
              "flow_cta": "Get started",
              "flow_action": "navigate",
              "flow_token": "FLOW_FORM_DATA",
              "flow_action_payload": {
                "screen": "QUESTION_ONE",
              }
            }
          }
        }
      });
    const res = await sendWhatsAppMessage(messagePayload)
    const resJson = await res.json();
    return NextResponse.json(resJson, {status: 200})
  } catch (e) {
    return NextResponse.json({message: e.message}, {status: 400})
  }
}