// Helper function to generate future dates
function getFutureDates() {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        dates.push(futureDate.toISOString().split('T')[0]);
    }
    return dates;
}

const mockData = {
    currentUser: null,
    patients: [
        {
            id: 1,
            name: "John Doe",
            email: "patient@test.com",
            password: "patient123",
            phone: "555-0101",
            gender: "male",
            dob: "1990-05-15"
        }
    ],
    doctors: [
        {
            id: 1,
            name: "Dr. Asser Fouad",
            email: "doctor@test.com",
            password: "doctor123",
            specialty: "Cardiology",
            phone: "555-0201",
            rating: 4.8,
            bio: "Experienced cardiologist with 15 years of practice.",
            availability: (() => {
                const dates = getFutureDates();
                return [
                    { date: dates[0], slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
                    { date: dates[1], slots: ["09:00", "10:00", "13:00", "14:00"] },
                    { date: dates[3], slots: ["10:00", "11:00", "15:00", "16:00"] }
                ];
            })()
        },
        {
            id: 2,
            name: "Dr. Noor Ihab",
            email: "doctor@test.com",
            password: "doctor123",
            specialty: "Dermatology",
            phone: "555-0202",
            rating: 4.9,
            bio: "Board-certified dermatologist specializing in cosmetic procedures.",
            availability: (() => {
                const dates = getFutureDates();
                return [
                    { date: dates[0], slots: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
                    { date: dates[2], slots: ["09:00", "10:00", "11:00"] }
                ];
            })()
        },
        {
            id: 3,
            name: "Dr. Mohamed Mostafa",
            email: "doctor@test.com",
            password: "doctor123",
            specialty: "Pediatrics",
            phone: "555-0203",
            rating: 4.7,
            bio: "Pediatrician with a passion for children's health.",
            availability: (() => {
                const dates = getFutureDates();
                return [
                    { date: dates[1], slots: ["09:00", "10:00", "11:00", "13:00", "14:00"] },
                    { date: dates[3], slots: ["09:00", "10:00", "15:00"] }
                ];
            })()
        },
        {
            id: 4,
            name: "Dr. Mohannad Hamouda",
            email: "doctor@test.com",
            password: "doctor123",
            specialty: "Orthopedics",
            phone: "555-0204",
            rating: 4.6,
            bio: "Orthopedic surgeon with expertise in sports injuries.",
            availability: (() => {
                const dates = getFutureDates();
                return [
                    { date: dates[0], slots: ["09:00", "13:00", "14:00"] },
                    { date: dates[2], slots: ["10:00", "11:00", "14:00", "15:00"] }
                ];
            })()
        }
    ],
    admins: [
        {
            id: 1,
            name: "Admin User",
            email: "admin@hospital.com",
            password: "admin123"
        }
    ],
    appointments: []
};
const utils = {
    saveData: function() {
        localStorage.setItem('medicalSystemData', JSON.stringify(mockData));
    },
    loadData: function() {
        const data = localStorage.getItem('medicalSystemData');
        if (data) {
            Object.assign(mockData, JSON.parse(data));
        }
        // Update availability dates to ensure they're always in the future
        this.updateDoctorAvailabilityDates();
    },
    updateDoctorAvailabilityDates: function() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        mockData.doctors.forEach(doctor => {
            // Filter out past dates
            doctor.availability = doctor.availability.filter(slot => {
                const slotDate = new Date(slot.date);
                slotDate.setHours(0, 0, 0, 0);
                return slotDate >= today;
            });

            // If doctor has less than 3 availability slots, add more future dates
            if (doctor.availability.length < 3) {
                const futureDates = getFutureDates();
                const existingDates = doctor.availability.map(slot => slot.date);

                // Default time slots
                const defaultSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

                // Add new dates that don't exist yet
                let addedCount = 0;
                for (let i = 0; i < futureDates.length && doctor.availability.length < 5; i++) {
                    if (!existingDates.includes(futureDates[i])) {
                        doctor.availability.push({
                            date: futureDates[i],
                            slots: [...defaultSlots]
                        });
                        addedCount++;
                    }
                }

                // Sort availability by date
                doctor.availability.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
        });
    },
    getCurrentUser: function() {
        const userStr = sessionStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },
    setCurrentUser: function(user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        mockData.currentUser = user;
    },
    logout: function() {
        sessionStorage.removeItem('currentUser');
        mockData.currentUser = null;
        window.location.href = '../index.html';
    },
    requireAuth: function(userType) {
        const user = this.getCurrentUser();
        if (!user || user.type !== userType) {
            window.location.href = '../index.html';
            return false;
        }
        return true;
    },
    formatDate: function(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    getDoctorById: function(id) {
        return mockData.doctors.find(doc => doc.id === parseInt(id));
    },
    getPatientById: function(id) {
        return mockData.patients.find(patient => patient.id === parseInt(id));
    },
    getPatientAppointments: function(patientId) {
        return mockData.appointments.filter(apt => apt.patientId === parseInt(patientId));
    },
    getDoctorAppointments: function(doctorId) {
        return mockData.appointments.filter(apt => apt.doctorId === parseInt(doctorId));
    },
    getTodayAppointments: function(doctorId) {
        const today = new Date().toISOString().split('T')[0];
        return mockData.appointments.filter(apt =>
            apt.doctorId === parseInt(doctorId) && apt.date === today
        );
    },
    cancelAppointment: function(appointmentId) {
        const appointment = mockData.appointments.find(apt => apt.id === parseInt(appointmentId));
        if (appointment) {
            appointment.status = 'cancelled';
            appointment.cancelledAt = new Date().toISOString();

            // Release the time slot back to doctor's availability
            const doctor = this.getDoctorById(appointment.doctorId);
            if (doctor) {
                let dateSlot = doctor.availability.find(slot => slot.date === appointment.date);
                if (!dateSlot) {
                    // Create new date slot if it doesn't exist
                    dateSlot = { date: appointment.date, slots: [] };
                    doctor.availability.push(dateSlot);
                    // Sort availability by date
                    doctor.availability.sort((a, b) => new Date(a.date) - new Date(b.date));
                }
                // Add time back if not already there
                if (!dateSlot.slots.includes(appointment.time)) {
                    dateSlot.slots.push(appointment.time);
                    dateSlot.slots.sort();
                }
            }

            this.saveData();
            return true;
        }
        return false;
    },
    markAppointmentDone: function(appointmentId) {
        const appointment = mockData.appointments.find(apt => apt.id === parseInt(appointmentId));
        if (appointment) {
            appointment.status = 'done';
            this.saveData();
            return true;
        }
        return false;
    },
    bookAppointment: function(appointmentData) {
        // Check for duplicate appointments (same patient, doctor, date, and time)
        const duplicate = mockData.appointments.find(apt =>
            apt.patientId === appointmentData.patientId &&
            apt.doctorId === appointmentData.doctorId &&
            apt.date === appointmentData.date &&
            apt.time === appointmentData.time &&
            apt.status === 'booked'
        );

        if (duplicate) {
            return { error: 'You already have an appointment with this doctor at this time.' };
        }

        // Check if patient already has an appointment at the same time on the same date
        const timeConflict = mockData.appointments.find(apt =>
            apt.patientId === appointmentData.patientId &&
            apt.date === appointmentData.date &&
            apt.time === appointmentData.time &&
            apt.status === 'booked'
        );

        if (timeConflict) {
            return { error: 'You already have another appointment at this time.' };
        }

        // Generate more realistic appointment ID
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const appointmentId = parseInt(`${timestamp.toString().slice(-6)}${randomNum}`);

        const newAppointment = {
            id: appointmentId,
            ...appointmentData,
            status: 'booked',
            rating: null,
            bookedAt: new Date().toISOString()
        };
        mockData.appointments.push(newAppointment);

        // Remove the booked time slot from doctor's availability
        const doctor = this.getDoctorById(appointmentData.doctorId);
        if (doctor) {
            const dateSlot = doctor.availability.find(slot => slot.date === appointmentData.date);
            if (dateSlot) {
                const timeIndex = dateSlot.slots.indexOf(appointmentData.time);
                if (timeIndex !== -1) {
                    dateSlot.slots.splice(timeIndex, 1);
                    // Remove date slot if no more times available
                    if (dateSlot.slots.length === 0) {
                        doctor.availability = doctor.availability.filter(slot => slot.date !== appointmentData.date);
                    }
                }
            }
        }

        this.saveData();
        return newAppointment;
    },
    rateAppointment: function(appointmentId, rating) {
        const appointment = mockData.appointments.find(apt => apt.id === parseInt(appointmentId));
        if (appointment) {
            appointment.rating = rating;
            this.saveData();
            return true;
        }
        return false;
    },
    addDoctor: function(doctorData) {
        const newDoctor = {
            id: mockData.doctors.length + 1,
            ...doctorData,
            rating: 0,
            availability: []
        };
        mockData.doctors.push(newDoctor);
        this.saveData();
        return newDoctor;
    },
    updateDoctor: function(doctorId, doctorData) {
        const doctor = mockData.doctors.find(doc => doc.id === parseInt(doctorId));
        if (doctor) {
            Object.assign(doctor, doctorData);
            this.saveData();
            return true;
        }
        return false;
    },
    deleteDoctor: function(doctorId) {
        const index = mockData.doctors.findIndex(doc => doc.id === parseInt(doctorId));
        if (index !== -1) {
            mockData.doctors.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    },
    addTimeSlot: function(doctorId, date, time) {
        const doctor = this.getDoctorById(doctorId);
        if (doctor) {
            let dateSlot = doctor.availability.find(slot => slot.date === date);
            if (!dateSlot) {
                dateSlot = { date, slots: [] };
                doctor.availability.push(dateSlot);
            }
            if (!dateSlot.slots.includes(time)) {
                dateSlot.slots.push(time);
                dateSlot.slots.sort();
                this.saveData();
                return true;
            }
        }
        return false;
    },
    removeTimeSlot: function(doctorId, date, time) {
        const doctor = this.getDoctorById(doctorId);
        if (doctor) {
            const dateSlot = doctor.availability.find(slot => slot.date === date);
            if (dateSlot) {
                const index = dateSlot.slots.indexOf(time);
                if (index !== -1) {
                    dateSlot.slots.splice(index, 1);
                    if (dateSlot.slots.length === 0) {
                        doctor.availability = doctor.availability.filter(slot => slot.date !== date);
                    }
                    this.saveData();
                    return true;
                }
            }
        }
        return false;
    },
    getStatistics: function() {
        const today = new Date().toISOString().split('T')[0];
        return {
            totalDoctors: mockData.doctors.length,
            totalPatients: mockData.patients.length,
            totalAppointments: mockData.appointments.length,
            todayAppointments: mockData.appointments.filter(apt => apt.date === today).length
        };
    },
    registerPatient: function(patientData) {
        const exists = mockData.patients.find(p => p.email.toLowerCase() === patientData.email.toLowerCase());
        if (exists) {
            return { success: false, message: "Email already registered" };
        }
        const newPatient = {
            id: mockData.patients.length + 1,
            ...patientData
        };
        mockData.patients.push(newPatient);
        this.saveData();
        return { success: true, patient: newPatient };
    },
    updatePatient: function(patientId, patientData) {
        const patient = mockData.patients.find(p => p.id === parseInt(patientId));
        if (patient) {
            Object.assign(patient, patientData);
            this.saveData();
            return true;
        }
        return false;
    },
    showAlert: function(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },
    getSettings: function() {
        const settings = localStorage.getItem('appSettings');
        return settings ? JSON.parse(settings) : { theme: 'light', language: 'en' };
    },
    saveSettings: function(settings) {
        localStorage.setItem('appSettings', JSON.stringify(settings));
        this.applySettings(settings);
    },
    applySettings: function(settings) {
        if (settings.theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
};
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
function showConfirmModal(message, onConfirm, onCancel) {
    const existingModal = document.querySelector('.confirm-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'confirm-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="confirm-modal">
            <div class="confirm-modal-icon">⚠️</div>
            <div class="confirm-modal-message">${message}</div>
            <div class="confirm-modal-buttons">
                <button class="btn btn-outline confirm-cancel-btn">Cancel</button>
                <button class="btn btn-danger confirm-yes-btn">Remove</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
    setTimeout(() => modalOverlay.classList.add('show'), 10);
    modalOverlay.querySelector('.confirm-yes-btn').addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.remove();
            if (onConfirm) onConfirm();
        }, 300);
    });
    modalOverlay.querySelector('.confirm-cancel-btn').addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.remove();
            if (onCancel) onCancel();
        }, 300);
    });
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                modalOverlay.remove();
                if (onCancel) onCancel();
            }, 300);
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    utils.loadData();
    const settings = utils.getSettings();
    utils.applySettings(settings);
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockData, utils };
}
