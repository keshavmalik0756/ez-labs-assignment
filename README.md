# EZ Labs Contact Form

A responsive React application with a contact form that integrates with the provided API, built with Tailwind CSS.

## Features

- ✅ Responsive design for all specified screen sizes
- ✅ Form validation (empty fields and email validation)
- ✅ API integration with POST request
- ✅ Success/error message handling
- ✅ Modern UI design with Tailwind CSS
- ✅ JSX components for better development experience

## Responsive Breakpoints

- **Mobile (480px)**: Optimized for mobile devices
- **Tablet (720p)**: Medium screen layout
- **Desktop (1080p)**: Standard desktop view
- **iPad (2732x2048)**: Large tablet optimization
- **MacBook (1440x823)**: Large desktop view

## API Integration

- **Endpoint**: `https://vernanbackend.ezlab.in/api/contact-us/`
- **Method**: POST
- **Required Fields**: name, email, phone, message
- **Validation**: Front-end validation for all fields and email format
- **Success Response**: Displays "Form Submitted" message

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build for Production

```bash
npm run build
```

## Form Validation Rules

1. All fields are required
2. Email must be in valid format
3. Empty form submission is prevented
4. Real-time error clearing when user starts typing

## Technologies Used

- React 18 with JSX
- Tailwind CSS for styling and responsive design
- Fetch API for HTTP requests
- Inter font family for modern typography
- PostCSS and Autoprefixer for CSS processing

## Tailwind Configuration

Custom breakpoints configured for all specified screen sizes:
- `xs`: 480px (Mobile)
- `tablet`: 720px
- `desktop`: 1080px
- `ipad`: 1024px
- `macbook`: 1440px