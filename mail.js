var nodemailer = require('nodemailer');

module.exports = {

    send(mailOptions){
        console.log('aqui')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'concyinfo@gmail.com',
              pass: '22d108383'
            }
          })
          
          console.log('aqui')
          
          transporter.sendMail(mailOptions, (error, info) => {

            console.log(error, info)

            if (error) {
              return error
            } else {
              return 'Enviado com sucesso'
            }
          })
    }

}