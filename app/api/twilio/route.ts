// Your AccountSID and Auth Token from console.twilio.com
import { NextRequest, NextResponse } from 'next/server'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function POST(req: NextRequest, res: NextResponse){
    const data = await req.json()
    console.log(data)

    client.verify.v2.services('VA06003fa9c706d2072eacc9e779575dbf')
    .verifications
    .create({to: '+15593304353', channel: 'sms'})
    .then((verification: any) => console.log(verification.status));
    
    return NextResponse.json(data)
} 