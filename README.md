# Surasa Restaurant Management Website

## Overview
The Surasa Restaurant Management Website is a comprehensive solution designed for the Agricultural Faculty of Sabaragamuwa University of Sri Lanka. This project aims to streamline the management processes of the university's restaurant, providing an efficient and user-friendly interface for both staff and students.

## Technologies Used
- **Frontend:** React, Tailwind CSS, Framer Motion, MUI, Redux, Axios
- **Backend:** Laravel, MySQL
- **Design:** Figma
- **Architecture:** MVC (Model-View-Controller)

## Features
- User-friendly interface for restaurant management
- Seamless integration between frontend and backend
- Efficient database management and API handling

## Installation

### Prerequisites
- Node.js
- Composer
- PHP
- MySQL

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/surasa-restaurant-management.git
   cd surasa-restaurant-management
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   composer install
   ```

4. **Set up the database:**
   - Create a MySQL database and update the `.env` file with your database credentials.
   ```env
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Run migrations:**
   ```bash
   php artisan migrate
   ```

6. **Run the development server:**
   - **In Root:**
     ```bash
     npm start
     ```

## Usage
- Access the frontend at `http://localhost:3000`
- Access the backend at `http://localhost:8000`
