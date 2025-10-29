import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [activeField, setActiveField] = useState('');
    const [fieldValidation, setFieldValidation] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    };

    const validateName = (name) => {
        const trimmedName = name.trim();
        return trimmedName.length >= 2 && trimmedName.length <= 50 && /^[a-zA-Z\s]+$/.test(trimmedName);
    };

    const validateMessage = (message) => {
        const trimmedMessage = message.trim();
        return trimmedMessage.length >= 10 && trimmedMessage.length <= 500;
    };

    const validateField = (fieldName, value) => {
        let isValid = false;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                isValid = validateName(value);
                if (!value.trim()) {
                    errorMessage = 'Name is required';
                } else if (value.trim().length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                } else if (value.trim().length > 50) {
                    errorMessage = 'Name must be less than 50 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    errorMessage = 'Name can only contain letters and spaces';
                }
                break;
            case 'email':
                isValid = validateEmail(value);
                if (!value.trim()) {
                    errorMessage = 'Email is required';
                } else if (!isValid) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                isValid = validatePhone(value);
                if (!value.trim()) {
                    errorMessage = 'Phone number is required';
                } else if (!isValid) {
                    errorMessage = 'Please enter a valid phone number (10-15 digits)';
                }
                break;
            case 'message':
                isValid = validateMessage(value);
                if (!value.trim()) {
                    errorMessage = 'Message is required';
                } else if (value.trim().length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                } else if (value.trim().length > 500) {
                    errorMessage = 'Message must be less than 500 characters';
                }
                break;
            default:
                break;
        }

        return { isValid, errorMessage };
    };

    const validateForm = () => {
        const newErrors = {};
        const fields = ['name', 'email', 'phone', 'message'];

        fields.forEach(field => {
            const validation = validateField(field, formData[field]);
            if (!validation.isValid) {
                newErrors[field] = validation.errorMessage;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('https://vernanbackend.ezlab.in/api/contact-us/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                })
            });

            if (response.status === 200) {
                setSubmitMessage('Form Submitted');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setErrors({});
                setFieldValidation({});
                setIsFormValid(false);
            } else {
                setSubmitMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Phone field: only allow numeric characters
        if (name === 'phone') {
            processedValue = value.replace(/\D/g, '');
        }

        setFormData({
            ...formData,
            [name]: processedValue
        });

        // Real-time validation
        const validation = validateField(name, processedValue);
        
        setFieldValidation(prev => ({
            ...prev,
            [name]: validation.isValid
        }));

        // Clear or set errors in real-time
        if (validation.isValid) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        } else if (processedValue.trim() !== '') {
            setErrors(prev => ({
                ...prev,
                [name]: validation.errorMessage
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Check overall form validity for submit button
        const updatedFormData = { ...formData, [name]: processedValue };
        const allFieldsValid = Object.keys(updatedFormData).every(field => {
            const fieldValidation = validateField(field, updatedFormData[field]);
            return fieldValidation.isValid;
        });
        setIsFormValid(allFieldsValid);
    };

    const handleFocus = (e) => {
        setActiveField(e.target.name);
    };

    const handleBlur = (e) => {
        setActiveField('');
        
        const { name, value } = e.target;
        const validation = validateField(name, value);
        
        if (!validation.isValid && value.trim() !== '') {
            setErrors(prev => ({
                ...prev,
                [name]: validation.errorMessage
            }));
        }
    };

    // Handle key press for phone input - only allow numbers
    const handlePhoneKeyPress = (e) => {
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    // Calculate form completion percentage
    const calculateProgress = () => {
        const fields = ['name', 'email', 'phone', 'message'];
        const validFields = fields.filter(field => {
            const validation = validateField(field, formData[field]);
            return validation.isValid;
        });
        return (validFields.length / fields.length) * 100;
    };

    // Get field status for styling
    const getFieldStatus = (fieldName) => {
        const hasValue = formData[fieldName].trim() !== '';
        const isValid = fieldValidation[fieldName];
        const hasError = errors[fieldName];
        
        if (hasError) return 'error';
        if (hasValue && isValid) return 'valid';
        if (hasValue && !isValid) return 'invalid';
        return 'default';
    };

    return (
        <div className="container" style={{ backgroundColor: '#F8EDE3', minHeight: '100vh', padding: '2rem' }}>
            {/* Decorative patterns */}
            <div className="mandala mandala-top-right"></div>
            <div className="mandala mandala-bottom-left"></div>

            {/* Header */}
            <header className="header">
                <img src="/vfilms-logo.png" alt="V Films" className="logo" />
                <button className="menu-btn">
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                </button>
            </header>

            {/* Main content */}
            <main className="main-content">
                <div className="left-section">
                    <p className="description">
                        Whether you have an idea, a question, or simply want
                        to explore how V can work together, V're just a
                        message away.
                        <br />
                        Let's catch up over coffee,
                        <br />
                        Great stories always begin with a good conversation
                    </p>
                </div>

                <div className="right-section">
                    <h1 className="title">join the Story</h1>
                    <p className="subtitle">Ready to bring your vision to life? Let's talk</p>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div className="progress-label">
                            Form Completion: {Math.round(calculateProgress())}%
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${calculateProgress()}%` }}
                            ></div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name* (2-50 characters)"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                className={`form-input ${activeField === 'name' ? 'active' : ''} ${getFieldStatus('name')}`}
                            />
                            {getFieldStatus('name') === 'valid' && (
                                <span className="validation-icon valid">✓</span>
                            )}
                            {getFieldStatus('name') === 'error' && (
                                <span className="validation-icon error">✗</span>
                            )}
                        </div>
                        {errors.name && <span className="error-message">{errors.name}</span>}

                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email* (e.g., name@domain.com)"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                className={`form-input ${activeField === 'email' ? 'active' : ''} ${getFieldStatus('email')}`}
                            />
                            {getFieldStatus('email') === 'valid' && (
                                <span className="validation-icon valid">✓</span>
                            )}
                            {getFieldStatus('email') === 'error' && (
                                <span className="validation-icon error">✗</span>
                            )}
                        </div>
                        {errors.email && <span className="error-message">{errors.email}</span>}

                        <div className="input-container">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone* (numbers only, 10-15 digits)"
                                value={formData.phone}
                                onChange={handleChange}
                                onKeyDown={handlePhoneKeyPress}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`form-input ${activeField === 'phone' ? 'active' : ''} ${getFieldStatus('phone')}`}
                            />
                            {getFieldStatus('phone') === 'valid' && (
                                <span className="validation-icon valid">✓</span>
                            )}
                            {getFieldStatus('phone') === 'error' && (
                                <span className="validation-icon error">✗</span>
                            )}
                        </div>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}

                        <div className="input-container">
                            <textarea
                                name="message"
                                placeholder="Your message* (10-500 characters)"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                className={`form-textarea ${activeField === 'message' ? 'active' : ''} ${getFieldStatus('message')}`}
                                rows="4"
                            />
                            {getFieldStatus('message') === 'valid' && (
                                <span className="validation-icon valid">✓</span>
                            )}
                            {getFieldStatus('message') === 'error' && (
                                <span className="validation-icon error">✗</span>
                            )}
                        </div>
                        {errors.message && <span className="error-message">{errors.message}</span>}

                        <button 
                            type="submit" 
                            className={`submit-btn ${isFormValid ? 'ready' : ''}`} 
                            disabled={isSubmitting || !isFormValid}
                        >
                            {isSubmitting ? 'Submitting...' :  'Submit Form'}
                        </button>

                        {submitMessage && (
                            <div className={`submit-message ${submitMessage === 'Form Submitted' ? 'success' : 'error'}`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>

                    <div className="contact-info">
                        <a href="mailto:vermita@vemaxfilms.co.in" className="contact-link">
                            vermita@vemaxfilms.co.in
                        </a>
                        <div className="contact-divider">|</div>
                        <a href="tel:+919073684457" className="contact-link">
                            +91 90736 84457
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactForm;