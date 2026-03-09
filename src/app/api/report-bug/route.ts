import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

        // Send email via Resend
        await resend.emails.send({
            from: 'InterviewIQ <onboarding@resend.dev>', // Resend's default test sender
            to: 'higermain1@gmail.com',
            subject: 'New Bug Report 🐛',
            text: `You have a new bug report from InterviewIQ:\n\n${description}`
        })

        console.log('--- NEW BUG REPORT SENT ---')
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
