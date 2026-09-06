# 🎟️ Event Ticketing Platform

### Full-Stack Event Discovery, Ticket Booking & Real-Time Ticketing System

A personal full-stack project built to explore the architecture of a modern event-ticketing platform.

The system allows users to discover events, interact with ticketing workflows, place orders, and receive real-time updates through a dedicated frontend and backend architecture.

The application is split into:

- a **Next.js frontend**
- a **NestJS backend**
- a **PostgreSQL database**
- **Clerk authentication**
- real-time communication using **Socket.IO / WebSockets**
- background processing using **BullMQ**
- containerized local infrastructure using **Docker / Docker Compose**

---

## 🎯 Project Goal

The goal of this project is to build a scalable event-ticketing platform while exploring more advanced full-stack concepts such as:

- frontend/backend separation
- secure authentication
- real-time communication
- event-driven workflows
- background job processing
- relational data modelling
- ticket and order management
- containerized development environments

---

# ✨ Core Features

## 🔐 Authentication

Authentication is handled using **Clerk**.

The frontend integrates Clerk for:

- user sign-in
- sign-up
- session management
- authenticated user state
- protected user functionality

The backend also integrates with Clerk so authenticated frontend users can securely access protected application resources.

---

## 🎫 Event Management

The application includes a dedicated event domain for managing event-related functionality.

This keeps event logic separate from ticketing and order processing and helps maintain a cleaner application architecture.

---

## 🎟️ Ticket Management

Tickets are handled through a dedicated backend module.

This separation allows ticket availability, booking logic, and ticket lifecycle functionality to remain independent from other parts of the system.

---

## 🛒 Order Processing

The backend includes a dedicated order module responsible for purchase-related workflows.

This allows the application to manage order creation and ticket-related transactions separately from event management.

---

## ⚡ Real-Time Communication

The application uses **Socket.IO and WebSockets** to support real-time communication between the frontend and backend.

This architecture can support features such as:

- live ticket availability
- event updates
- order status changes
- booking notifications
- real-time user feedback

  📸 Screenshots

Screenshots will be added as development progresses.


Homepage / Event Discovery
  <img width="1920" height="896" alt="image" src="https://github.com/user-attachments/assets/74995673-1576-47f9-b3fa-8a52c4f2530b" />

Authentication Screen
  <img width="1920" height="900" alt="image" src="https://github.com/user-attachments/assets/39d6e53b-9b4f-4a6b-8fd0-13ec0261c1cd" />


## 🧵 Background Processing

The backend uses **BullMQ** for asynchronous background processing.

This allows long-running or delayed tasks to be handled outside normal request-response flows.

Potential use cases include:

- reservation expiry
- ticket release
- notification jobs
- email processing
- order-related background tasks

---

## 🐳 Docker & Local Infrastructure

Docker is used to simplify local development and maintain a consistent environment.

The project includes **Docker Compose** configuration for supporting backend infrastructure such as the PostgreSQL database and other development services.

This helps reduce manual setup and makes the application easier to run consistently across different machines.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────┐
│          Next.js Frontend                │
│                                          │
│ React + TypeScript + Clerk               │
│ Socket.IO Client + Tailwind CSS          │
└───────────────────┬──────────────────────┘
                    │
                    │ REST / WebSockets
                    │ Authenticated Requests
                    ▼
┌──────────────────────────────────────────┐
│            NestJS Backend                │
│                                          │
│ Clerk Authentication                     │
│ Auth • Events • Orders • Tickets         │
│ Socket.IO • BullMQ • TypeORM             │
└───────────────────┬──────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│              PostgreSQL                  │
│                                          │
│ Events • Tickets • Orders • Users        │
└──────────────────────────────────────────┘

          Local Development
                  │
                  ▼
        Docker / Docker Compose
