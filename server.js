const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    let body = req.body;
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_NAME, 
          pass: process.env.PASSWORD, 
        },
    });
    let body_html = `\
    <h1>${body.name}</h1>
    <h2>${body.email}</h2>
    <h3>${body.phone}</h3>
    <p>Message: ${body.message}</p>`;
    transporter.sendMail({
        from: `"CNC App Server" <${process.env.USER_NAME}>`, // sender address
        to: process.env.RECIPIENT, // list of receivers
        subject: "Feedback - Called & Chosen", // Subject line
        html: body_html
    });
    res.sendFile("./index.html");
});

app.listen(PORT);
console.log(`Running!`);