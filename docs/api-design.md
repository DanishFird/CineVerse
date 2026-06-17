# CineVerse API Design Document

## Overview
CineVerse is a movie discovery and booking platform built as a distributed microservices system. This document outlines all API endpoints across services.

---

## Auth Service (Port 8081)

| Endpoint | Method | Auth Required | Description |
|---|---|---|---|
| `/auth/register` | POST | No | Register a new user |
| `/auth/login` | POST | No | Login, returns JWT token |
| `/auth/logout` | GET | Yes | Logout (client-side token discard) |
| `/auth/forgot-password` | POST | No | Trigger password reset flow |
| `/auth/reset-password` | POST | No | Reset password with token |

### POST /auth/register
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "role": "USER"
}
```
**Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### POST /auth/login
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```
**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

## Movie Service (Port 8082)

| Endpoint | Method | Auth Required | Description |
|---|---|---|---|
| `POST /movies` | POST | Yes (ADMIN/OWNER) | Create a new movie |
| `GET /movies` | GET | Yes | Get all movies (paginated) |
| `GET /movies/{id}` | GET | Yes | Get movie by ID |
| `PUT /movies/{id}` | PUT | Yes (ADMIN/OWNER) | Update movie |
| `DELETE /movies/{id}` | DELETE | Yes (ADMIN/OWNER) | Delete movie |
| `GET /movies/search?title=` | GET | Yes | Search movies by title |
| `GET /movies/genre?genre=` | GET | Yes | Filter movies by genre |
| `POST /movies/upload` | POST | Yes (ADMIN/OWNER) | Upload movie poster |
| `POST /reviews` | POST | Yes | Add a review |
| `GET /reviews/{movieId}` | GET | Yes | Get reviews for a movie |

### POST /movies
**Request Body:**
```json
{
  "title": "Inception",
  "genre": ["Sci-Fi", "Thriller"],
  "rating": 8.8,
  "language": "English",
  "duration": 148,
  "releaseDate": "2010-07-16",
  "posterUrl": "/uploads/inception.jpg",
  "description": "A thief who steals corporate secrets...",
  "director": "Christopher Nolan"
}
```

### POST /reviews
**Request Body:**
```json
{
  "movieId": "64abc123",
  "rating": 5,
  "review": "Absolutely mind-bending!"
}
```

---

## Booking Service (Port 8083)

| Endpoint | Method | Auth Required | Description |
|---|---|---|---|
| `GET /theatres` | GET | Yes | List all theatres |
| `POST /theatres` | POST | Yes (OWNER/ADMIN) | Add a theatre |
| `GET /shows` | GET | Yes | List all shows |
| `POST /shows` | POST | Yes (OWNER/ADMIN) | Create a show |
| `GET /seats/{showId}` | GET | Yes | Get seat layout with availability |
| `POST /booking` | POST | Yes | Create a booking |
| `GET /booking/{id}` | GET | Yes | Get booking by ID |
| `PUT /booking/{id}/cancel` | PUT | Yes | Cancel a booking |

### POST /booking
**Request Body:**
```json
{
  "showId": 1,
  "seatNumbers": ["A1", "A2"]
}
```
**Response (200):**
```json
{
  "status": "success",
  "message": "Booking confirmed",
  "data": {
    "bookingId": 42,
    "showId": 1,
    "seatNumbers": ["A1", "A2"],
    "totalAmount": 500.00,
    "status": "CONFIRMED",
    "createdAt": "2024-01-15T14:30:00"
  }
}
```

### Booking Workflow
```
POST /booking
  → Extract userId from JWT header
  → Validate showId exists
  → Check each seat: not already booked
  → Lock seats in Redis (5-minute TTL)
  → Create Booking (status = LOCKED)
  → Simulate payment (always success)
  → Update status = CONFIRMED
  → Publish event to RabbitMQ
  → Return booking confirmation
```

---

## API Gateway (Port 8080)

All requests are routed through the API Gateway. JWT validation is performed at the gateway level for all routes except `/auth/**`.

### Route Configuration
| Route | Target Service |
|---|---|
| `/auth/**` | Auth Service (8081) |
| `/movies/**`, `/reviews/**` | Movie Service (8082) |
| `/theatres/**`, `/shows/**`, `/seats/**`, `/booking/**` | Booking Service (8083) |

---

## Standard Error Response Format
```json
{
  "status": "error",
  "message": "Detailed error message",
  "timestamp": "2024-01-15T14:30:00"
}
```

## HTTP Status Codes Used
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized (missing/invalid JWT) |
| 403 | Forbidden (insufficient role) |
| 404 | Not Found |
| 409 | Conflict (seat already booked) |
| 500 | Internal Server Error |
