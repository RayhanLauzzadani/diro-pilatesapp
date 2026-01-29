# Diro Pilates App

A modern web application for booking Pilates studio sessions, built with a Go backend and a Next.js 14 frontend. This application allows users to view class schedules, book sessions, and manage their bookings with integrated payments via Midtrans.

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI, Lucide React
- **Authentication:** Supabase Auth (Client-side)

### Backend
- **Language:** Go (Golang) v1.22+
- **Framework:** Gin Web Framework
- **ORM:** GORM
- **Database:** PostgreSQL (via Supabase)
- **Payment Gateway:** Midtrans

## 📂 Project Structure

```bash
├── backend/            # Go backend code
│   ├── cmd/            # Entry points
│   ├── config/         # Configuration loaders
│   ├── database/       # Database connection & seeds
│   ├── handlers/       # HTTP request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routing
│   └── services/       # External services (Midtrans, etc.)
├── src/                # Frontend source code
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   └── lib/            # Utility functions
├── public/             # Static assets
└── ...
```

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Go](https://go.dev/) (v1.22 or higher)
- PostgreSQL Database (or a [Supabase](https://supabase.com/) project)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install Go dependencies:
    ```bash
    go mod tidy
    ```

3.  Create a `.env` file in the `backend` directory based on your configuration:
    ```env
    # Server
    PORT=8080
    FRONTEND_URL=http://localhost:3000

    # Database (Supabase PostgreSQL)
    DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require

    # Payment Gateway - Midtrans
    MIDTRANS_SERVER_KEY=your_midtrans_server_key
    MIDTRANS_CLIENT_KEY=your_midtrans_client_key
    ```

4.  Run the backend server:
    ```bash
    go run main.go
    ```
    The server will start on `http://localhost:8080`.

### 2. Frontend Setup

1.  Open a new terminal and verify you are in the project root.

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env.local` file in the root directory:
    ```env
    # API Backend
    NEXT_PUBLIC_API_URL=http://localhost:8080/api

    # Midtrans Payment Gateway
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key

    # Supabase Auth
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✨ Features

- **Class Scheduling**: View available pilates classes and timeslots.
- **Booking System**: Book classes directly through the app.
- **Secure Payments**: Integrated with Midtrans for secure transactions.
- **User Authentication**: Secure login and signup powered by Supabase.
- **Responsive Design**: optimized for both desktop and mobile devices.

## 📄 License

This project is for educational/internship purposes.
