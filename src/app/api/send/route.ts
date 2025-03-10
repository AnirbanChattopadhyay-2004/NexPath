import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req:Request) {
    const { Details , email } = await req.json()
    try {
        const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [process.env.SUPPORT_EMAIL as string],
        subject: 'Verify',
        react: EmailTemplate({ Details , email }),
        });

        if (error) {
        return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
