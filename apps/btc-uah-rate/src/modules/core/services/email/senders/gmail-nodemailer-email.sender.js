'use strict';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const EmailSender = require('./email.sender');

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  OAUTH_REFRESH_TOKEN,
  USER_MAIL_ADDRESS,
} = process.env;

const OAuth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI
);

// eslint-disable-next-line camelcase
OAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

class GmailNodemailerEmailSender extends EmailSender {
  constructor() {
    super();

    this.sendEmails = this.sendEmails.bind(this);

    this.OAUTH_CLIENT_ID = OAUTH_CLIENT_ID;
    this.OAUTH_CLIENT_SECRET = OAUTH_CLIENT_SECRET;
    this.OAUTH_REDIRECT_URI = OAUTH_REDIRECT_URI;
    this.OAUTH_REFRESH_TOKEN = OAUTH_REFRESH_TOKEN;
    this.USER_MAIL_ADDRESS = USER_MAIL_ADDRESS;

    this.OAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      OAUTH_REDIRECT_URI
    );
  }
  async sendEmails(mailReceivers, subject, text) {
    try {
      if (!mailReceivers.length) return [];

      const accessToken = await OAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: USER_MAIL_ADDRESS,
          clientId: OAUTH_CLIENT_ID,
          clientSecret: OAUTH_CLIENT_SECRET,
          refreshToken: OAUTH_REFRESH_TOKEN,
          accessToken,
        },
      });

      const sendEmailsPromises = mailReceivers.map(reciever =>
        transporter.sendMail({
          from: USER_MAIL_ADDRESS,
          to: reciever,
          subject,
          text,
        })
      );

      const results = await Promise.allSettled(sendEmailsPromises);

      const emailsSentToSuccessfully = results.flatMap(result =>
        result.status === 'fulfilled' ? result.value.accepted : []
      );

      const emailAddressesNotSentTo = mailReceivers.filter(
        email => !emailsSentToSuccessfully.includes(email)
      );
      return emailAddressesNotSentTo;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GmailNodemailerEmailSender;
