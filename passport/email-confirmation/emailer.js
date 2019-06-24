const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = async function enviar_email(data,req){
    
  
  JSON.stringify(data);
  console.log(data);
  const token  = jwt.sign({data},process.env.JWTSECRET,{expiresIn:'1h'});
    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host:'smtpout.secureserver.net',
        service: 'gmail',
        auth: {
               user: process.env.EMAIL, 
               pass: process.env.EMAILPASSWORD
           },
        secure:true
       });
  
    const linkGenerado = 'http:\/\/' + req.headers.host + '\/api/confirmation\/' + token;

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: data.email, // list of receivers
      subject: "Confirmacion de cuenta - FastteachCorp ✔", // Subject line
      html: "<b>Confirmación de usuario</b><br><p>Presione este <a href=" +linkGenerado+">enlace</a> para la confirmacion de su cuenta</p>" // html body
    });
  /*
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...*/
    
    console.log('Message sent : %s',info.messageId);
    }



