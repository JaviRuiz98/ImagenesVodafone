import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.HOST_MAIL,
  port: parseInt(process.env.PORT_MAIL as string), // Asegurando que el puerto sea un número
  secure: true, // Establecido en true para habilitar SSL
  auth: {
    user: process.env.MY_EMAIL, // Tu dirección de correo electrónico
    pass: process.env.MY_PSW, // Tu contraseña
  },
});

transporter.verify().then(() => {
    console.log('Server is ready to take our messages');
});

// Funcion para enviar correos electronicos
export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
      await transporter.sendMail({
        from: process.env.MY_EMAIL,
        to,
        subject,
        text,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };