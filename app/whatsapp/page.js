'use client'
import {post} from "@/lib/api";

export default async function SendWhatsAppMessage(){

    const handleOnClick = async () => {
        console.log('sending message')
        const url = '/api/whatsapp/send/welcome'
        const payload = {to: '919971456988'}
        const response = await post(url, payload);
    }
    return (
        <div>
            <button onClick={handleOnClick}>Cick Here</button>
        </div>
        )
}