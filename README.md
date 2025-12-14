# Doctor Web Project

This repository contains a full-stack **Doctor Appointment Web Application**.  
It consists of:  

- **Backend:** `doctor-app-new` (Laravel API)  
- **Frontend:** `doctor-frontend` (React / Vue / JS client)  
- **Database:** PostgreSQL  

---

## Table of Contents

- [Features](#features)  
- [Requirements](#requirements)  
- [Setup & Installation](#setup--installation)  
- [Docker Compose Setup](#docker-compose-setup)  
- [Running the Project](#running-the-project)  
- [API Documentation](#api-documentation)  
- [License](#license)  

---

## Features

- Doctor management (CRUD)  
- Appointment booking  
- Availability checks  
- PostgreSQL database integration  

---

## Requirements

- Docker & Docker Compose  
- PHP >= 8.1  
- Composer  
- Node.js & npm/yarn  

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Lahoucine-hrird/doctor-web-project.git
cd doctor-web-project


### 2. Backend Setup

cd doctor-app-new

# Copy environment file
cp .env.example .env

# Update database credentials in .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=doctor_app
# DB_USERNAME=
# DB_PASSWORD=

# Install PHP dependencies
composer install

# Generate application key
php artisan key:generate

# Run database migrations to create tables
php artisan migrate

#test Add Doctors
php artisan tinker --execute="App\Models\Doctor::create(['name'=>'Dr. John Doe','specialization'=>'Cardiology']); App\Models\Doctor::create(['name'=>'Dr. Jane Doe','specialization'=>'Dermatology']);"


3. Frontend Setup


cd ../doctor-frontend

# Install dependencies
npm install

# Optional: build frontend for production
npm run build



