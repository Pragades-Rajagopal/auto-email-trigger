const path = require('path');
require('dotenv').config({
    path: path.resolve('./.env'),
});

const nodemailer = require('nodemailer');
const db = require('./database');


const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const globalData = [];
module.exports = {
    getData: (data) => {
        for (const i of data) {
            globalData.push(i);
        }
    },
    sendEmail: async (attachments) => {
        try {
            for (const i of globalData) {
                await transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: i.email,
                    subject: 'Application',
                    html: i.content,
                    attachments: attachments
                });
                console.log(`Email triggered to ${i.email}`);
                const result = await db.saveData(i.email, i.content);
                console.log(result);
            }
        } catch (error) {
            console.log('Something went wrong while triggering email');
        }
    },
}

