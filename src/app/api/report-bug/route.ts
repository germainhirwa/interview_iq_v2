import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { description } = body

        if (!description) {
            return NextResponse.json(
                { error: 'Description is required' },
                { status: 400 }
            )
        }

        // In a real production app, you would integrate Resend or Sendgrid here.
        // Example: 
        // await resend.emails.send({
        //   from: 'bugs@interviewiq.app',
        //   to: 'higermain1@gmail.com',
        //   subject: 'New Bug Report',
        //   text: description
        // })

        // For now, we simulate success and log it to the server console:
        console.log('--- NEW BUG REPORT ---')
        console.log(`To: higermain1@gmail.com`)
        console.log(`Description: ${description}`)
        console.log('----------------------')

        return NextResponse.json({ success: true, message: 'Bug report sent successfully.' })
    } catch (error) {
        console.error('Error processing bug report:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
