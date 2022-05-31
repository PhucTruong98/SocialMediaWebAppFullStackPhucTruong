const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const {EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET} = process.env;
const {OAuth2} = google.auth;

const oauth_link = "https://developers.google.com/oauthplayground/";
const auth = new OAuth2(MAILING_ID, MAILING_REFRESH, MAILING_SECRET, oauth_link);

exports.sendVerificationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    
}