const nodemailer = require('nodemailer');

module.exports= async function enviar_email(mensaje,tipo,data){
        
        console.log(data);
        console.log("El email es : " + data.email);

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
            to: data.email, 
            subject: "✔ FastteachCorp ✔", 
            html: "<h1>"+ tipo + " </h1><br><h4>"+mensaje+"</h4>" // html body
        });
        console.log('Message sent : %s',info.messageId);

}