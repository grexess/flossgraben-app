import { Meteor } from 'meteor/meteor';
import '../imports/api/tweets.js';
import '../imports/api/runners.js';
import '../imports/api/users.js';
import '../imports/api/datatable.js';

Meteor.startup(function () {

    process.env.MAIL_URL = "smtp://administrator%40flossgraben.run:ghfsdkghkxdgf@smtp.1und1.de:587/";
    console.log('set ' + process.env.MAIL_URL);
    /*
    Email.send({
        to: "gregor@hexenhaus.online",
        from: "administrator@flossgraben.run",
        subject: "Example Email",
        text: "The contents of our email in plain text.",
    });
    */
});

Accounts.emailTemplates.siteName = "Flossgrabenlauf";
Accounts.emailTemplates.from = "Flossgrabenlauf <administrator@flossgraben.run>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[Flossgrabenlauf] Email Address bestätigen";
    },
    text(user, url) {
        let emailAddress = user.emails[0].address,
            urlWithoutHash = url.replace('#/', ''),
            supportEmail = "administrator@flossgraben.run",
            emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
    }
};

Meteor.methods({
    sendVerificationLink() {
        let userId = Meteor.userId();
        if (userId) {
            return Accounts.sendVerificationEmail(userId);
        }
    }
});

