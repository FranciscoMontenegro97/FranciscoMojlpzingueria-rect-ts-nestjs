import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter;

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      // Verificar la configuración
      this.transporter.verify((error) => {
        if (error) {
          this.logger.error('Error en la configuración del email:', error);
        } else {
          this.logger.log('Servidor listo para enviar emails');
        }
      });
    } catch (error) {
      this.logger.error('Error al crear el transporter:', error);
    }
  }

  async sendContactForm(data: any) {
    try {
      if (!this.transporter) {
        throw new Error('Transporter no inicializado correctamente');
      }

      // Verificar datos requeridos
      if (!data.email || !data.name) {
        throw new Error('Faltan datos requeridos (email o nombre)');
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Nueva consulta desde el sitio web',
        html: `
          <h2>Nueva Consulta</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${data.message}</p>
        `,
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email enviado correctamente:', result);
      return result;
    } catch (error) {
      this.logger.error('Error al enviar email:', error);
      throw error; // Re-lanzamos el error con más contexto
    }
  }

  async sendCVForm(data: any) {
    try {
      if (!this.transporter) {
        throw new Error('Transporter no inicializado correctamente');
      }

      if (!data.email || !data.name || !data.cvBuffer) {
        throw new Error('Faltan datos requeridos (email, nombre o CV)');
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Nueva postulación desde el sitio web',
        html: `
          <h2>Nueva Postulación</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
        `,
        attachments: [
          {
            filename: data.cvFileName,
            content: data.cvBuffer,
          },
        ],
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log('CV enviado correctamente:', result);
      return result;
    } catch (error) {
      this.logger.error('Error al enviar CV:', error);
      throw error;
    }
  }
}