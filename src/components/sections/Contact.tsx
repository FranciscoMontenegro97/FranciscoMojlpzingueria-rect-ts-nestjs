import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // Validación nombre
    if (!formData.name.match(/^[a-zA-Z\s]{1,30}$/)) {
      newErrors.name = 'Solo se permiten letras (máximo 30 caracteres)';
    }

    // Validación email
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email inválido';
    }

    // Validación teléfono
    if (!formData.phone.match(/^\d{1,15}$/)) {
      newErrors.phone = 'Solo se permiten números (máximo 15 dígitos)';
    }

    // Validación mensaje
    if (formData.message.length === 0) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length > 500) {
      newErrors.message = 'Máximo 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contacto" className="contact">
      <div className="contact__container">
        <div className="contact__content-wrapper">
          {/* Header */}
          <div className="contact__header">
            <h2 className="contact__title">Contacto</h2>
            <p className="contact__subtitle">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
            </p>
          </div>

          {/* Info Cards */}
          <div className="contact__info">
            <div className="contact__info-card">
              <Phone className="contact__info-icon" />
              <h3>Teléfono</h3>
              <p>+54 341 635-4040</p>
            </div>

            <div className="contact__info-card">
              <Mail className="contact__info-icon" />
              <h3>Email</h3>
              <p>ventas@jlpzingueria.com.ar</p>
            </div>

            <div className="contact__info-card contact__info-card--map">
              <div className="contact__info-header">
                <MapPin className="contact__info-icon" />
                <h3>Ubicación</h3>
                <p>24 de Septiembre 3264, S2003 Rosario, Santa Fe, Argentina</p>
              </div>
              <a
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.7397180497437!2d-60.67726034097322!3d-32.97541226224829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ac7fbfe76671%3A0xbca74f0219d8decf!2s24+de+Septiembre+3264%2C+S2004+Rosario%2C+Santa+Fe!5e0!3m2!1ses-419!2sar!4v1551319765128"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__map-wrapper"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.7397180497437!2d-60.67726034097322!3d-32.97541226224829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ac7fbfe76671%3A0xbca74f0219d8decf!2s24+de+Septiembre+3264%2C+S2004+Rosario%2C+Santa+Fe!5e0!3m2!1ses-419!2sar!4v1551319765128"
                  className="contact__map"
                  loading="lazy"
                  title="Ubicación de JLPZingueria"
                />
              </a>
            </div>
          </div>

          {/* Form Container */}
          <div className="contact__form-section">
            <h3 className="contact__form-title">
              ¿Tiene alguna consulta? Escríbanos
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-group">
                <div className="contact__input-wrapper">
                  <User className="contact__input-icon" />
                  <input
                    type="text"
                    placeholder="Nombre y Apellido"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={30}
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <span className="contact__error">{errors.name}</span>}
              </div>

              <div className="contact__form-group">
                <div className="contact__input-wrapper">
                  <Mail className="contact__input-icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>

              <div className="contact__form-group">
                <div className="contact__input-wrapper">
                  <Phone className="contact__input-icon" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    maxLength={15}
                    className={errors.phone ? 'error' : ''}
                  />
                </div>
                {errors.phone && <span className="contact__error">{errors.phone}</span>}
              </div>

              <div className="contact__form-group">
                <div className="contact__input-wrapper">
                  <MessageSquare className="contact__input-icon" />
                  <textarea
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={errors.message ? 'error' : ''}
                  />
                </div>
                {errors.message && <span className="contact__error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`contact__submit ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                <Send className="contact__submit-icon" />
              </button>
            </form>
          </div>

          {/* Status Messages */}
          {submitStatus && (
            <div className={`contact__status contact__status--${submitStatus}`}>
              {submitStatus === 'success'
                ? '¡Mensaje enviado correctamente! Te responderemos a la brevedad.'
                : 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;