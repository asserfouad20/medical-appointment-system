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
            name: "Dr. Sarah Wilson",
            email: "sarah@hospital.com",
            password: "doctor123",
            specialty: "Cardiology",
            phone: "555-0201",
            rating: 4.8,
            bio: "Experienced cardiologist with 15 years of practice.",
            availability: [
                { date: "2025-11-22", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
                { date: "2025-11-23", slots: ["09:00", "10:00", "13:00", "14:00"] },
                { date: "2025-11-25", slots: ["10:00", "11:00", "15:00", "16:00"] }
            ]
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            email: "michael@hospital.com",
            password: "doctor123",
            specialty: "Dermatology",
            phone: "555-0202",
            rating: 4.9,
            bio: "Board-certified dermatologist specializing in cosmetic procedures.",
            availability: [
                { date: "2025-11-22", slots: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
                { date: "2025-11-24", slots: ["09:00", "10:00", "11:00"] }
            ]
        },
        {
            id: 3,
            name: "Dr. Emily Brown",
            email: "emily@hospital.com",
            password: "doctor123",
            specialty: "Pediatrics",
            phone: "555-0203",
            rating: 4.7,
            bio: "Pediatrician with a passion for children's health.",
            availability: [
                { date: "2025-11-23", slots: ["09:00", "10:00", "11:00", "13:00", "14:00"] },
                { date: "2025-11-25", slots: ["09:00", "10:00", "15:00"] }
            ]
        },
        {
            id: 4,
            name: "Dr. James Taylor",
            email: "james@hospital.com",
            password: "doctor123",
            specialty: "Orthopedics",
            phone: "555-0204",
            rating: 4.6,
            bio: "Orthopedic surgeon with expertise in sports injuries.",
            availability: [
                { date: "2025-11-22", slots: ["09:00", "13:00", "14:00"] },
                { date: "2025-11-24", slots: ["10:00", "11:00", "14:00", "15:00"] }
            ]
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
    appointments: [
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            date: "2025-11-22",
            time: "10:00",
            status: "booked",
            paymentMethod: "cash",
            notes: "",
            rating: null
        }
    ]
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
        const newAppointment = {
            id: mockData.appointments.length + 1,
            ...appointmentData,
            status: 'booked',
            rating: null
        };
        mockData.appointments.push(newAppointment);
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
        const exists = mockData.patients.find(p => p.email === patientData.email);
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
