import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from './mail.service';

// Interfaces para tipar los datos
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface CVFormData {
  name: string;
  email: string;
  phone: string;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('contact')
  async sendContactForm(@Body() formData: ContactFormData) {
    try {
      await this.mailService.sendContactForm(formData);
      return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar email:', error); // Log del error completo
      return {
        success: false,
        message: 'Error al enviar el email',
        error: error.message, // Agregamos el mensaje de error
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined // Stack trace en desarrollo
      };
    }
  }

  @Post('cv')
  @UseInterceptors(FileInterceptor('cv'))
  async sendCVForm(
    @Body() formData: CVFormData,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const data = {
        ...formData,
        cvFileName: file.originalname,
        cvBuffer: file.buffer,
      };
      await this.mailService.sendCVForm(data);
      return { success: true, message: 'CV enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar CV:', error); // Log del error completo
      return {
        success: false,
        message: 'Error al enviar el CV',
        error: error.message, // Agregamos el mensaje de error
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined // Stack trace en desarrollo
      };
    }
  }
}