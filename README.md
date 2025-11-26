# Medical Appointment System - Front-End

A complete front-end implementation of a Medical Appointment System built with HTML, CSS, and JavaScript.

## Features

### For Patients
- User registration and login
- Browse and search doctors by name and specialty
- View doctor profiles and availability
- Book appointments with online payment or cash options
- View and cancel upcoming appointments
- View appointment history
- Rate doctors (1-5 stars)
- Manage profile and change password

### For Doctors
- Login to doctor dashboard
- View today's schedule
- View all appointments (past, upcoming, cancelled)
- Mark appointments as done
- Manage availability (add/remove time slots)
- View patient information

### For Admins
- System overview with statistics
- Manage doctors (add, edit, delete)
- View all appointments in the system
- Manage doctor schedules
- Filter appointments by doctor, date, and status

## Project Structure

```
medical-appointment-system/
├── index.html                  # Login page
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   └── app.js                 # Core JavaScript utilities and mock data
├── pages/
│   ├── patient-registration.html
│   ├── patient-dashboard.html
│   ├── doctor-list.html
│   ├── doctor-availability.html
│   ├── book-appointment.html
│   ├── payment.html
│   ├── my-appointments.html
│   ├── appointment-history.html
│   ├── patient-profile.html
│   ├── doctor-dashboard.html
│   ├── today-schedule.html
│   ├── manage-availability.html
│   ├── doctor-all-appointments.html
│   ├── admin-dashboard.html
│   ├── manage-doctors.html
│   ├── add-doctor.html
│   ├── edit-doctor.html
│   ├── admin-all-appointments.html
│   ├── manage-schedules.html
│   ├── settings.html
│   ├── about.html
│   └── 404.html
└── README.md
```

## Getting Started

1. **Open the project**: Simply open `index.html` in your web browser

2. **Demo Credentials**:
   - **Patient**:
     - Email: patient@test.com
     - Password: patient123

   - **Doctor**:
     - Email: sarah@hospital.com
     - Password: doctor123

   - **Admin**:
     - Email: admin@hospital.com
     - Password: admin123

3. **No server required**: This is a pure front-end application that runs entirely in the browser using localStorage for data persistence.

## Key Technologies

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**:
  - CSS Grid and Flexbox for layouts
  - CSS Variables for theming
  - Responsive design with media queries
  - Transitions and animations

- **JavaScript (Vanilla)**:
  - ES6+ features
  - DOM manipulation
  - LocalStorage for data persistence
  - SessionStorage for user sessions
  - No external dependencies or frameworks

## Features Implemented

### Authentication & Authorization
- Role-based access control (Patient, Doctor, Admin)
- Session management using sessionStorage
- Password validation
- User registration with form validation

### Data Management
- Mock database using JavaScript objects
- LocalStorage for persistent data storage
- CRUD operations for all entities
- Data validation and error handling

### User Interface
- Clean, modern design
- Responsive layout (mobile, tablet, desktop)
- Interactive components (modals, dropdowns, forms)
- Real-time search and filtering
- Star rating system
- Time slot picker
- Status badges and alerts

### Pages Breakdown

#### Patient Pages (9 pages)
1. Login Page (shared)
2. Patient Registration
3. Patient Dashboard
4. Doctor List with Search
5. Doctor Availability
6. Book Appointment
7. Payment Page
8. My Appointments
9. Appointment History with Rating

#### Doctor Pages (4 pages)
10. Doctor Dashboard
11. Today's Schedule
12. Manage Availability
13. All Appointments

#### Admin Pages (6 pages)
14. Admin Dashboard
15. Manage Doctors
16. Add Doctor
17. Edit Doctor
18. View All Appointments
19. Manage Schedules

#### Utility Pages (3 pages)
20. Settings (Theme, Language, Notifications)
21. About & Contact
22. 404 Error Page

**Total: 24 Unique Pages**

## How to Use

### As a Patient:
1. Register or login with demo credentials
2. Browse doctors by specialty or search by name
3. Click on a doctor to view their availability
4. Select a time slot and book an appointment
5. Choose payment method (Cash or Card)
6. View your upcoming appointments
7. Rate doctors after completed appointments

### As a Doctor:
1. Login with doctor credentials
2. View your dashboard with statistics
3. Check today's schedule
4. Mark appointments as done
5. Manage your availability by adding/removing time slots
6. View all past and upcoming appointments

### As an Admin:
1. Login with admin credentials
2. View system overview and statistics
3. Add, edit, or remove doctors
4. View all appointments across the system
5. Manage doctor schedules centrally
6. Filter appointments by various criteria

## Data Persistence

- All data is stored in **localStorage**
- User sessions are managed with **sessionStorage**
- Data persists across browser sessions
- Clear browser data to reset the system

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* ... more colors */
}
```

### Adding Mock Data
Edit the `mockData` object in `js/app.js`:
```javascript
const mockData = {
    patients: [...],
    doctors: [...],
    admins: [...],
    appointments: [...]
};
```

## Future Enhancements (Backend Integration)

When connecting to a backend:
1. Replace localStorage calls with API calls
2. Implement real authentication with JWT tokens
3. Add server-side validation
4. Implement email/SMS notifications
5. Add payment gateway integration
6. Implement image upload for doctor profiles
7. Add real-time notifications using WebSockets

## Notes

- This is a **front-end only** implementation
- All data is stored locally in the browser
- No actual payments are processed
- Email notifications are simulated
- Perfect for demonstration, learning, or as a template for full-stack development

## License

Free to use for educational and commercial purposes.

## Contact

For questions or suggestions, use the contact form in the About page or reach out through the demo contact information.

---

**Enjoy using the Medical Appointment System!**
