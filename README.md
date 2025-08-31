# EduWorld – A Social Media Platform for Students

EduWorld is a prototype social media web application created as part of my final year BSc Computing Project at Oxford Brookes University. The platform is designed to help students connect with each other and explore courses offered by various universities, making the decision-making process for higher education easier and more informed.


##  Project Overview

EduWorld provides students with a dedicated space to:

* Connect and communicate with other students globally
* Share posts and articles related to education
* View and search university courses
* Exchange knowledge and advice via a built-in messaging system

Universities can also participate by creating course listings with details and admission requirements.

## Aim

The aim of this project was to design and implement a social media website that assists students in choosing the right course and university while building a supportive educational network.


## Features

### Student Features

* User registration, login, and email verification
* Profile creation and management
* Create, edit, and delete posts and articles
* View posts and articles from other students
* Search for students and universities
* Real-time messaging using Socket.io

### University Features

* Admin-managed registration for universities (ensuring only accredited institutions join)
* Profile creation and management
* Create, edit, and delete courses
* Display available courses with detailed information

### Security

* Password hashing with **Bcrypt**
* Authentication and authorization via **JWT (JSON Web Token)**

### Additional Features

* Responsive design with accessibility in mind
* Image storage and optimization using **Cloudinary**
* Navigation bar for seamless user experience


## Technologies Used

* **Frontend:**

  * React
  * CSS
* **Backend:**

  * Node.js
  * Express.js
* **Database:**

  * MongoDB (NoSQL)
* **Real-Time Messaging:**

  * Socket.io
* **Authentication & Security:**

  * JWT
  * Bcrypt
* **Media Storage:**

  * Cloudinary

## Testing

The application was tested through:

* **Unit & functionality testing** for each feature
* **End-to-end testing** for feature integration
* **Accessibility testing** using Google Lighthouse
* **Beta testing** with university students


## Results & Findings

* All planned features were successfully implemented and tested
* Accessibility scores ranged between 80–100 for different pages
* Beta testers found the platform useful and expressed willingness to use such a system

##  Business Perspective

EduWorld has strong potential as a commercial product:

* **Target Market:** Initially the UK, with future global expansion
* **Revenue Model:**

  * Advertisements
  * Data-driven insights (with consent)
  * University subscriptions
* **Unique Selling Point:** A dedicated social platform focused solely on education and informed decision-making for students

## Conclusion

EduWorld demonstrates the potential of a student-focused social media platform that combines networking with informed course selection. While still a prototype, the project lays a strong foundation for further development into a fully scalable product that could support students worldwide in their educational journeys.
