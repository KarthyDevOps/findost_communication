var nodemailer = require('nodemailer');

const mail = async function (mailOption) {
    console.log('mailOption', mailOption)
    var transporter = nodemailer.createTransport({
        service:"Gmail",
        port: 587,
        // secure: true,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.USERPASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        }
    });
    let mailOptions;
        mailOptions = {
            from: mailOption.from,
            subject: mailOption.subject,
            to: mailOption.to,
            text: mailOption.url,
            cc: mailOption?.cc

        };

    try {
        console.log(mailOptions);
        var info = await transporter.sendMail(mailOptions);
        console.log(info.response);
        return { status: 200, response: info.response };
    } catch (e) {
        console.log(e);
        return { error: e, status: 500 };
    }
}


module.exports = { mail }