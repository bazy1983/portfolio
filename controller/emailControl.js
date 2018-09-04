const nodemailer = require('nodemailer');

module.exports = function (name, email, message = "", res) {
    require("dotenv").config()
    let account = require("../emailInfo")
    // console.log(account)



    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // true for 465, false for other ports
        service : "gmail",
        auth: {
            user: account.email, // generated ethereal user
            pass: account.password // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mohammed Hameed" <mohammed.b.hameed@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        bcc: "mohammed.b.hameed@gmail.com",
        subject: 'Thank You', // Subject line
        text: ` Hello ${name}
            Thank You for your input,
            I will gat back to you as soon as possible.
            Your message:
            ${message}`, // plain text body
        html: `<p> Hello ${name}</p>
            <p>Thank you for your input.</p>
            <p>I will get back to you as soon as possible.</p>
            <i>Your Message:</i>
            <p>${message}</p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send("okay")
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });


}
