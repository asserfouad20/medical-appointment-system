# Medical Appointment System - Documentation

This folder contains the project documentation and Entity Relationship Diagram (ERD).

## Files

- **ERD.png** - Entity Relationship Diagram showing database structure
- **Documentation.pdf** - Complete project documentation including team info, problem statement, features, and test cases

## Database Schema

The system uses the following entities:

### **Patient**
- patient_id (PK)
- name
- email
- password
- phone

### **Doctor**
- doctor_id (PK)
- name
- email
- password
- phone
- specialty

### **Admin**
- admin_id (PK)
- name
- email
- password

### **Appointments**
- appointment_id (PK)
- patient_id (FK → Patient)
- doctor_id (FK → Doctor)
- date
- time
- status

## Relationships

- **Patient to Appointments**: One-to-Many (1:n)
  - A patient can have multiple appointments

- **Doctor to Appointments**: One-to-Many (1:n)
  - A doctor can have multiple appointments

- **Admin to Doctor**: One-to-Many (1:n)
  - An admin manages multiple doctors
