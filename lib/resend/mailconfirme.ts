
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function MailConfirm({token,email}:{token:string,email:string}) {
    const url=`http://localhost:3000/auth/confirme?token=${token}`
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: "mounkassajaphet@gmail.com",
      subject: 'confirmation',
      html:`<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333; margin: 0; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); padding: 30px; max-width: 600px; margin: auto; border-left: 6px solid #0073e6;">
        <h3 style="color: #0073e6; font-size: 1.5em; margin-bottom: 10px;">
            Bonjour : <p style="color: #0073e6; text-decoration: none; border-bottom: 1px dashed #0073e6;">${email}</p>
        </h3>
        <p style="color: #555555; font-size: 1.1em; line-height: 1.5;">
            Merci de vous être inscrit sur [ EDUC ] ! Pour finaliser la création de votre compte, veuillez confirmer votre adresse e-mail en cliquant sur le lien ci-dessous :
        </p>
        <a href="${url}" style="display: inline-block; color: #ffffff; background-color: #0073e6; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-size: 1.1em;">Confirmer mon adresse e-mail</a>
        <h2 style="color: #333333; margin-top: 40px; font-size: 1.3em;">
            Si vous n'avez pas créé de compte, veuillez ignorer cet e-mail.
        </h2>
        <h3 style="color: #333333; margin-top: 20px; font-size: 1.2em;">
            Merci,<br>
            L'équipe JAPHET
        </h3>
    </div>
</body>`
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
