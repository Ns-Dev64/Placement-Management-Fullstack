# Placement Manager Documentation

## Introduction

This project is a full-stack web application developed using the MERN (MongoDB, Express, React, Node.js) technology stack. The application features a responsive front-end designed with Bootstrap, React.js, jQuery, and CSS, ensuring a seamless user experience across different devices.

The backend is powered by a RESTful API that facilitates efficient data management and interaction with an ERP (Enterprise Resource Planning) system. This system optimizes the interactions between various entities, enhancing the overall functionality of the application. Additionally, the application supports advanced file uploading capabilities through the integration of Multer, leading to increased user engagement.

## Getting Started

### Software Tools

To get started with this project, ensure you have the following software tools installed:
- **Node.js**
- **Express.js**
- **React.js**
- **MongoDB**

### Installation

This application requires the installation of both Node.js and React.js dependencies. The React.js dependencies are located in the `Frontend` folder.

#### Node.js

To install all the necessary Node.js packages, you can either install them separately from the `nodeRequirements.txt` file or run the following command in your PowerShell:

```bash
Get-Content nodeRequirements.txt | ForEach-Object { npm install $_ }
```
#### React.js (in the Frontend folder)
To install all the necessary React.js packages, navigate to the Frontend folder and run the following command in your PowerShell:

```bash
Get-Content reactRequirements.txt | ForEach-Object { npm install $_ }
```
### Running the Application
After installing the required packages, you can start the application by following these steps:

To run the server (in the root folder):

```bash
npm run dev
```
To run the client (in the Frontend folder):

```bash
npm start
```

### Configuration
Before running the application, you need to set up environment variables to configure the following:

- `PORT`: The port number where the server will run.
- `CONNECTION_STRING`: The connection string for MongoDB.
- `EMAIL`: The email address used for application-related communication.
- `ACCESS_TOKEN` : Access token for jwt authentications.
- `PASSWORD`: The password for the email account.
You can create a .env file in the root directory and define these variables:

```.env
PORT=your_port_number
CONNECTION_STRING=your_mongodb_connection_string
EMAIL=your_email_address
ACCESS_TOKEN=your_access_token
PASSWORD=your_app_password
```
### Usage
To start using the application, follow these steps:

Start the backend server by running:

```bash
npm run dev
```

Start the frontend client by navigating to the Frontend folder and running:

```bash

npm start
```
### Endpoints
#### Student Endpoints
- POST /registerStu: Register a new student.
- POST /signStu: Sign in a student.
- POST /loginStu: Validate token and log in student.
- POST /updateStu: Validate token and update student details.
- POST /delStu: Validate token and delete student.
- POST /apply: Validate token, upload, and apply for placement.
- POST /affirm: Validate token and affirm student.
- POST /getStu: Validate token and get student details.
- GET /approve: Validate token and approve student.
- POST /getApply: Validate token and get application details.
#### Admin Endpoints
- POST /getStudent: Validate token and show student.
- POST /createAdmin: Create a new admin.
- POST /signAdmin: Sign in as admin.
- GET /verfiyAdmin: Validate token and verify admin.
- POST /logAdmin: Validate token and log in admin.
- POST /applications: Validate token and handle applications.
- POST /delapps: Validate token and delete applications.
- GET /viewapps: Validate token and view applications.
- POST /getStudents: Validate token and get student list.
- POST /getCompany: Validate token and get company details.
- GET /viewCompanies: Validate token and display companies.
- POST /getCompStu: Validate token and get company students.
- POST /getIntapps: Validate token and set applications.
- POST /addCompany: Validate token and add a company.
- POST /updateCompany: Validate token and update company details.
- POST /delCompany: Validate token and delete a company.
- POST /createInterview: Validate token and create an interview.
- GET /getApprovedStudents: Validate token and get approved students.
- GET /getInts: Validate token and get interviews.
- POST /updInts: Validate token and update interview details.
- POST /delInts: Validate token and end interview.
#### Other Endpoints
- GET /uploads: Serve static files from the uploads directory.
- USE /api/students: Mount the student-related routes.
- USE /api/admin: Mount the admin-related routes.
- POST /request_otp: Request OTP for verification.
- POST /verify_otp: Verify OTP.

### Code Structure
```perl
.
└── Root/
    ├── Frontend/
    │   ├── public/
    │   │   ├── favicon.ico          # Icon for the application
    │   │   ├── index.html           # Main HTML template
    │   │   ├── logo192.png          # Logo images for PWA
    │   │   ├── logo512.png
    │   │   ├── manifest.json        # Web app manifest for PWA
    │   │   └── robots.txt           # Instructions for web crawlers
    │   ├── src/
    │   │   ├── components           # Reusable UI components
    │   │   ├── screens              # Different pages/screens of the application
    │   │   ├── App.css              # Main CSS for the App component
    │   │   ├── App.test.js          # Tests for the App component
    │   │   ├── index.css            # Global CSS
    │   │   ├── index.js             # Entry point for the React application
    │   │   ├── reportWebVitals.js   # Performance reporting
    │   │   └── setupTests.js        # Setup for testing
    │   ├── .gitignore               # Files and directories to be ignored by Git
    │   ├── README.md                # Frontend-specific README
    │   ├── package-lock.json        # Lockfile for npm dependencies
    │   ├── package.json             # Lists frontend dependencies and scripts
    │   └── reactRequirements.txt    # Requirements and dependencies for React
    ├── config                       # Configuration files for the backend
    ├── controllers                  # Controllers to handle backend logic
    ├── middleware                   # Middleware for request handling
    ├── models                       # Database models/schemas
    ├── routes                       # API routes
    ├── uploads                      # Directory for file uploads
    ├── .gitignore                   # Files and directories to be ignored by Git (backend)
    ├── constants.js                 # Global constants for the backend
    ├── nodeRequirements.txt         # Requirements and dependencies for Node.js
    ├── package-lock.json            # Lockfile for npm dependencies (backend)
    ├── package.json                 # Lists backend dependencies and scripts
    └── server.js                    # Entry point for the backend server
```
### Contribution
Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1) Fork the repository.
2) Create a new branch (git checkout -b feature-branch).
3) Make your changes.
4) Commit your changes (git commit -m 'Add some feature').
5)Push to the branch (git push origin feature-branch).
6)Create a new Pull Request.

**Please ensure your code follows the existing code style and conventions.**

### Deployment
The application is deployed on the following platforms:

- **Frontend (Netlify)**: https://66c1b66f51ea824fe36ba273--thunderous-salamander-ada91d.netlify.app/
- **Backend (Render)**: https://placement-management-fullstack.onrender.com

### License
**This project is licensed under the MIT License**.
