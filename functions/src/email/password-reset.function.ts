import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from '../modules/mail';
import { APP_NAME } from '../constants/app.name';
// import * as Admin from 'firebase-admin';
// User Password Reset and Response
export function passwordReset(admin: any) {
    return functions.firestore
        .document(`password-resets/{requestId}`)
        .onCreate((snap, context) => {
            const resource = context.resource;
            const request: any = snap.data();
            if (snap.exists) {
                return admin.auth().generatePasswordResetLink(request.email, {
                    url: 'https://localhost:4200/login'
                })
                    .then((link: string) => {
                        return sendPasswordResetLink(
                            request.email,
                            link,
                        )
                        .catch(err => console.log('error sending password reset link', err));
                    }).catch((err: any) => console.log('Error! Failed to add password reset request to collection'))

            } else {
                console.log(`failed to send password reset on ${resource}`, snap, context);
                return null;
            }
        });
}

async function sendPasswordResetLink(email: string, link: string) {
    const mailOptions: MailOptions = {
        from: `"Team Noxious" info@teamnoxious.com`,
        to: email,
        subject: `Password Reset ${APP_NAME}!`,
        html: `<h2>You have requestede to reset your password</h2><br><br><p>${APP_NAME} has provided a reset link.</p><br><br><p>Use this link or copy and paste it in your browser url bar:</p><br><br><p>Link: <a href="${link}">${link}</a><br><br>If you did not request this, please ignore this email, or for more information contact us at <a href="mailto: info@teamnoxious.com">Info@teamnoxious.com</a>.<br><p>Thanks.</p>`
    };

    // The user subscribed to updates and the newsletter, send welcome email to user.
    await sendEmail(mailOptions);
    return null;
}
