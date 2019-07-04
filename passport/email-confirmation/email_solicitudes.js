const nodemailer = require('nodemailer');

module.exports= async function enviar_email(mensaje,tipo,receptor){
        
        console.log(receptor);
        console.log("El email es : " + receptor.email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            }
        });

        console.log(mensaje);
        const info = await transporter.sendMail({
            from: process.env.EMAIL, 
            to: receptor.email, 
            subject: "✔ FastteachCorp ✔", 
            html: "<h1>"+ tipo + " </h1><br><h4>"+mensaje+"</h4>" // html body
        });
        console.log('Message sent : %s',info.messageId);

}