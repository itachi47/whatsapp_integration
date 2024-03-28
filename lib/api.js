export const post = async (url, data) => {
    console.log('post', url, data)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(1200000)
        });
        return response.json()
    } catch (e) {
        console.log(e)
        return e;
    }
}


export const sendWhatsAppMessage = async (payload) =>  {
    try {
        const res = fetch(`https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`, {
            method: 'post',
            body: payload,
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
                },
        })
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const postFormFlowData = async (payload) => {
    console.log('postFormFlow', payload);
    return;
    try {
        const res = fetch(`${process.env.FORM_DATA_CALLBACK}`, {
            method: 'post',
            body: payload,
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
                },
        })
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}