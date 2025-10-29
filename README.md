# EZ Labs Contact Form

A responsive React application with a contact form that integrates with the provided API, built with modern CSS and React.

## Features

- ✅ Responsive design for all specified screen sizes (480p, 720p, 1080p, iPad, MacBook)
- ✅ Form validation (empty fields and email validation)
- ✅ API integration with POST request
- ✅ Toast notification system for success/error messages
- ✅ Modern UI design with glassmorphism effects
- ✅ Real-time form validation with visual feedback
- ✅ Progress bar showing form completion
- ✅ No-scroll design optimized for all screen sizes

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
- **Success Response**: Toast notification with success message
- **Error Handling**: Comprehensive error handling with specific error messages

## Postman Collection

Postman collection for API testing is included under `/postman/EZ Labs Assignment.postman_collection.json`.

The collection includes:
- Complete API request with proper headers
- Sample request body with test data
- Example successful response (201 Created)
- Ready-to-use for testing the contact form API

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

1. **Name**: 2-50 characters, letters and spaces only
2. **Email**: Valid email format required
3. **Phone**: 10-15 digits, numbers only
4. **Message**: 10-500 characters required
5. **Real-time validation**: Visual feedback with ✓/✗ icons
6. **Progress tracking**: Form completion percentage display
7. **Empty form submission**: Prevented with comprehensive validation

## Technologies Used

- **React 18** with JSX and Hooks
- **Vanilla CSS** with modern features (Grid, Flexbox, CSS Variables)
- **Fetch API** for HTTP requests
- **Glassmorphism design** with backdrop filters
- **Responsive design** with CSS media queries
- **Toast notifications** for user feedback

## Design Features

- **Glassmorphism UI**: Modern glass-like effects with backdrop blur
- **Mandala decorative elements**: Artistic background patterns
- **Toast notification system**: Non-intrusive success/error messages
- **Progress indicators**: Visual form completion tracking
- **Responsive typography**: Optimized text sizes for each device
- **No-scroll layout**: Content fits perfectly within viewport on all devices

## File Structure

```
src/
├── components/
│   ├── ContactForm.jsx    # Main form component
│   └── ContactForm.css    # Component styles
postman/
└── EZ Labs Assignment.postman_collection.json    # API testing collection
```
## Projec
t Highlights

### Responsive Design
- **Mobile-first approach**: Optimized for all specified screen sizes
- **No horizontal scrolling**: Content fits perfectly within viewport
- **Adaptive layouts**: Different layouts for mobile, tablet, and desktop
- **Hidden elements**: Left section hidden on small screens for better UX

### User Experience
- **Toast notifications**: Success and error messages with auto-dismiss
- **Real-time validation**: Immediate feedback as user types
- **Progress tracking**: Visual indication of form completion
- **Accessibility**: Proper form labels and keyboard navigation

### Performance Optimizations
- **No animations**: Static interface for better performance
- **Optimized CSS**: Clean, efficient stylesheets
- **Minimal JavaScript**: Lightweight React implementation
- **Fast loading**: Optimized for quick page loads

## Testing

The application has been tested on:
- ✅ Mobile devices (480px)
- ✅ Tablets (768px)
- ✅ Desktop (1080p)
- ✅ iPad (2732x2048)
- ✅ MacBook (1440x823)

## API Testing

Use the included Postman collection to test the API:
1. Import `/postman/EZ Labs Assignment.postman_collection.json` into Postman
2. The collection includes sample data and expected responses
3. Test both successful submissions and error scenarios

## Submission Notes

- Postman collection maintained original filename as requested
- All responsive breakpoints implemented and tested
- Form validation meets all specified requirements
- API integration working with proper error handling
--
-

## 📁 Project Structure

```
EZ-Labs-Contact-Form/
├── public/
│   ├── index.html
│   ├── vfilms-logo.png
│   ├── background.png
│   ├── mandala-top-right copy.svg
│   └── mandala-bottom-left copy.svg
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx
│   │   └── ContactForm.css
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── postman/
│   └── EZ Labs Assignment.postman_collection.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Quick Start

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm start`
4. **Open**: [http://localhost:3000](http://localhost:3000)

## 📋 Assignment Checklist

- ✅ **Responsive Design**: All specified breakpoints (480p, 720p, 1080p, iPad, MacBook)
- ✅ **Form Validation**: Empty fields and email validation at front-end
- ✅ **API Integration**: POST request to provided endpoint
- ✅ **Success Handling**: Toast notification on successful submission
- ✅ **Error Handling**: Comprehensive error messages for different scenarios
- ✅ **Postman Collection**: Included in `/postman/` folder with original filename
- ✅ **Modern UI**: Glassmorphism design with visual feedback
- ✅ **Performance**: Optimized with no animations for better performance

## 📞 Contact

For any questions about this implementation, please refer to the code comments or test using the provided Postman collection.