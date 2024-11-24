import React, { useState, ChangeEvent } from 'react';
import { Upload, CheckCircle, AlertCircle, User, Mail, Phone, FileText } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  cv?: string;
}

const Careers = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.match(/^[a-zA-Z\s]{1,25}$/)) {
      newErrors.name = 'El nombre solo puede contener letras (máximo 25 caracteres)';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.match(/^\d{1,25}$/)) {
      newErrors.phone = 'El teléfono solo puede contener números';
    }

    if (!cvFile) {
      newErrors.cv = 'Debes adjuntar tu CV';
    } else {
      if (cvFile.size > 1024 * 1024) {
        newErrors.cv = 'El archivo no debe superar 1MB';
      }
      if (!cvFile.type.includes('pdf')) {
        newErrors.cv = 'Solo se permiten archivos PDF';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }

      const response = await fetch('http://localhost:3000/mail/cv', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '' });
        setCvFile(null);
        setFileName('');
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
    <section id="careers" className="careers">
      <div className="careers__content">
        <div className="careers__text">
          <h2 className="careers__title">Trabaja con Nosotros</h2>
          <p className="careers__subtitle">
            Sumate a nuestro equipo de profesionales y sé parte de grandes proyectos
          </p>
        </div>

        <div className="careers__form-container">
          <form onSubmit={handleSubmit} className="careers__form">
            <div className="careers__form-group">
              <div className="careers__input-wrapper">
                <User className="careers__input-icon" />
                <input
                  type="text"
                  placeholder="Nombre y Apellido"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={25}
                  className={errors.name ? 'error' : ''}
                />
              </div>
              {errors.name && <span className="careers__error">{errors.name}</span>}
            </div>

            <div className="careers__form-group">
              <div className="careers__input-wrapper">
                <Mail className="careers__input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="careers__error">{errors.email}</span>}
            </div>

            <div className="careers__form-group">
              <div className="careers__input-wrapper">
                <Phone className="careers__input-icon" />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  maxLength={25}
                  className={errors.phone ? 'error' : ''}
                />
              </div>
              {errors.phone && <span className="careers__error">{errors.phone}</span>}
            </div>

            <div className="careers__file-upload">
              <label className="careers__file-label">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="careers__file-input"
                />
                <Upload className="careers__file-icon" />
                <span>{fileName || 'Seleccionar CV (PDF, max 1MB)'}</span>
              </label>
              {errors.cv && <span className="careers__error">{errors.cv}</span>}
            </div>

            <button
              type="submit"
              className={`careers__submit ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="careers__loader"></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar CV
                  <FileText className="careers__submit-icon" />
                </>
              )}
            </button>
          </form>

          {submitStatus && (
            <div className={`careers__status careers__status--${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  <CheckCircle />
                  <p>CV enviado correctamente. Revisaremos tu perfil y nos contactaremos a la brevedad.</p>
                </>
              ) : (
                <>
                  <AlertCircle />
                  <p>Hubo un error al enviar el CV. Por favor, intenta nuevamente.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="careers__background"></div>
    </section>
  );
};

export default Careers;