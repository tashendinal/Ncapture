# Ncapture Event Management System

---

## Introduction

The Ncapture Event Management System was developed to improve and automate event management at NSBM Green University. Traditionally, campus event organization was managed manually with significant inefficiencies such as scheduling conflicts, resource mismanagement, and communication issues. This project addresses these challenges by providing a centralized, web-based platform to streamline event scheduling, resource allocation, communication, and reporting — enhancing the overall university event management experience.

---

## Background

Campus events at NSBM include academic seminars, cultural activities, and student engagements crucial to student development and community building. The manual system using emails and Microsoft Forms is prone to double bookings, delayed communication, and high administrative overhead. A digital event management system is needed to:

- Automate scheduling and resource management  
- Provide real-time event status updates  
- Enhance communication among organizers, participants, and staff  
- Enable data-driven decisions through reporting  

---

## Objectives

- Streamline event scheduling and reduce manual errors  
- Optimize resource utilization (venues, equipment, media personnel)  
- Improve communication via real-time notifications and updates  
- Deliver an intuitive, role-based user interface  
- Ensure system scalability, security, and cross-device accessibility  
- Support sustainable paperless workflows  

---

## Deliverables

- Fully functional web-based application  
- Role-based dashboards and access controls  
- Automated scheduling and conflict prevention tools  
- Resource allocation module  
- Real-time notifications and feedback collection  
- Analytics dashboard for event performance  
- User manuals and training materials  
- Testing and quality assurance documentation  
- Maintenance and update plan  

---

## User Requirements

Through stakeholder consultation, the following key requirements were identified:

- Secure authentication and role management  
- Comprehensive event lifecycle handling (creation, approval, updates, cancellation)  
- Efficient resource allocation avoiding conflicts  
- Real-time communication and notifications  
- Feedback mechanisms for continuous improvement  
- Mobile and desktop accessibility with an easy-to-use UI  

---

## Data Gathering

A detailed survey was conducted among students, lecturers, media club members, and staff using Google Forms. The survey collected data on:

- Frequency and nature of events attended/organized  
- Pain points in current manual event management  
- Satisfaction with communication and scheduling  
- Desired features for a new digital system  

Survey results confirmed strong demand for an automated web application and guided design priorities.

---

## Method of Approach

### Development Environment and Technologies

| Component       | Technology/Tool          |
|-----------------|-------------------------|
| Frontend        | React.js, React Big Calendar |
| Backend         | Node.js, Express.js      |
| Database        | MongoDB                 |
| Authentication  | JSON Web Tokens (JWT)    |
| Development IDE | Visual Studio Code       |
| Version Control | Git, GitHub             |
| Deployment      | Microsoft Azure Cloud    |

### Methodology

An Agile Scrum methodology was adopted, allowing iterative development with frequent user feedback incorporation. The project progressed through sprints involving:

- Requirement gathering and analysis  
- Feature design and implementation  
- Testing and quality assurance  
- User feedback sessions  
- Incremental refinements  

This approach ensured alignment with stakeholder expectations and adaptability to changing requirements.

---

## Requirements

### Functional Requirements

- User registration and secure login  
- Event creation, editing, approval, rejection, and deletion  
- Centralized scheduling with conflict detection  
- Resource allocation and monitoring  
- Role-based dashboards for administrators, staff, lecturers, media admins, and members  
- Real-time notifications and alerts  
- Feedback submission on events  
- Analytics reporting on event attendance and resource usage  

### Non-Functional Requirements

- Fast system response (under 2 seconds)  
- Scalability to support growing user base and event volume  
- Robust error handling and user-friendly messages  
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)  
- Secure storage and transmission of data  
- Mobile responsiveness for accessibility on smartphones and tablets  

### Hardware/Software Requirements

- Hardware: Minimum 4GB RAM, Intel Core i3 or equivalent, 20GB free storage  
- Software:  
  - Node.js v14+  
  - MongoDB v4.4+  
  - Modern web browsers  
  - Internet connection for cloud-hosted components  

---

## Project Overview

Ncapture provides a unified platform to replace manual event management at NSBM Green University. Users can submit event requests, manage schedules, allocate resources, and communicate through role-specific dashboards. The system reduces manual errors and administrative overhead while improving event quality and participation.

---

## Project Objectives and Results

| Objective                            | Result                                                | Status           |
|------------------------------------|-------------------------------------------------------|------------------|
| Automate event management processes| Fully functional web platform supporting event scheduling | Achieved         |
| Enhance communication and real-time updates | Notifications and dashboard alerts implemented | Achieved         |
| Provide analytics for event/resource usage | Basic analytics dashboard with reporting capabilities | Partially achieved|
| Design user-friendly interface      | Role-based, intuitive UI accessible on multiple devices | Achieved         |

---

## Challenges and Adjustments

- Machine Learning features simplified due to limited datasets  
- Migration from MySQL to MongoDB for better scalability and performance  
- Time constraints limited some advanced analytics features  

---

## Future Directions

- Add multilingual support to cater to diverse users  
- Integrate AI-based event scheduling and recommendations  
- Implement IoT-based resource tracking for real-time monitoring  
- Enhance analytics dashboard with richer data visualization  
- Incorporate sustainability tracking for paperless workflows  

---

## Usage

### Start backend server:

```bash
cd ncapture-backend
npm install
npm run dev

### Start backend server:

cd ../ncapture-frontend
npm install
npm run dev

	Access the application on http://localhost:3000.

	Register or log in based on your role.

	Use your dashboard to manage or participate in events.





* Admin User Credentials

Use the following credentials to log in as an administrator for testing and management:
	•	Email: admin@gmail.com
	•	Password: admin123

⸻

* Frontend Deployment

The live frontend of the Ncapture Event Management System is deployed on Vercel and accessible here:

https://ncapture-tashendinals-projects.vercel.app/



* Testing


	•	Unit tests for backend APIs and frontend components
	•	Integration tests for end-to-end workflows
	•	User acceptance testing with sample users
	•	Test cases include user authentication, event lifecycle management, resource allocation, notifications, and feedback processing



Screenshot

  ## User Main Interface Preview

Here is a screenshot of the Main Interface:

![Main Interface](Screenshots/1.jpg)


# Ncapture Event Management System

[![Release](https://img.shields.io/github/v/release/tashendinal/Ncapture-Event-Management-System)](https://github.com/tashendinal/Ncapture-Event-Management-System/releases)
[![Build Status](https://github.com/tashendinal/Ncapture-Event-Management-System/actions/workflows/deploy.yml/badge.svg)](https://github.com/tashendinal/Ncapture-Event-Management-System/actions/workflows/deploy.yml)
[![Vercel Deployment](https://vercelbadge.vercel.app/api/tashendinal/ncapture-tashendinals-projects)](https://ncapture-tashendinals-projects.vercel.app/)



