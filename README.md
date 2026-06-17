# 🎬 CineVerse

A **movie discovery and booking platform** built as a distributed microservices system — a simplified Netflix + BookMyShow hybrid.

---

## 🏗️ Architecture

```
User (Browser)
      ↓
  [React Frontend :3000]
      ↓ HTTP
  [NGINX Reverse Proxy]
      ↓
  [API Gateway :8080]  ← validates JWT
      ↙        ↓        ↘
[Auth :8081] [Movie :8082] [Booking :8083]
      ↓           ↓              ↓
[PostgreSQL] [MongoDB]    [PostgreSQL]
                               ↓
                          [Redis :6379]
                          (seat locks + cache)
                               ↓
                         [RabbitMQ :5672]
                               ↓
                    [Notification Service :8084]
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js + React Router + Axios | UI, routing, API calls |
| Backend | Spring Boot 3 (Java 17) | REST APIs, business logic |
| Auth | JWT + BCrypt | Stateless authentication |
| SQL DB | PostgreSQL | Users, bookings, shows, theatres |
| NoSQL DB | MongoDB | Movies, reviews, ratings |
| Cache/Lock | Redis | Seat locking, caching |
| Messaging | RabbitMQ | Async booking events |
| Gateway | Spring Cloud Gateway | Routing, JWT validation |
| Containers | Docker + Docker Compose | Full system packaging |
| CI/CD | GitHub Actions | Automated build & deploy |

---

## 📁 Project Structure

```
cineverse/
├── frontend/                        # React.js app (Vite)
├── backend/
│   ├── auth-service/                # Spring Boot – JWT auth
│   ├── movie-service/               # Spring Boot – MongoDB
│   ├── booking-service/             # Spring Boot – PostgreSQL + Redis
│   └── notification-service/        # Spring Boot – RabbitMQ consumer
├── gateway/                         # Spring Cloud Gateway
├── docker/
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
└── docs/
    └── api-design.md
```

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- MongoDB 6+
- Redis 7+
- RabbitMQ 3+

### Run with Docker Compose
```bash
# Build all services
cd backend/auth-service && mvn clean package -DskipTests && cd ../..
cd backend/movie-service && mvn clean package -DskipTests && cd ../..
cd backend/booking-service && mvn clean package -DskipTests && cd ../..
cd backend/notification-service && mvn clean package -DskipTests && cd ../..
cd gateway && mvn clean package -DskipTests && cd ..

# Start everything
docker-compose -f docker/docker-compose.yml up --build
```

### Run Individually (Development)
```bash
# Start infrastructure (PostgreSQL, MongoDB, Redis, RabbitMQ)
# Then start each service:
cd backend/auth-service && mvn spring-boot:run
cd backend/movie-service && mvn spring-boot:run
cd backend/booking-service && mvn spring-boot:run
cd backend/notification-service && mvn spring-boot:run
cd gateway && mvn spring-boot:run

# Start frontend
cd frontend && npm install && npm run dev
```

---

## 🔗 Service Ports

| Service | Port |
|---|---|
| Frontend (React) | 3000 |
| API Gateway | 8080 |
| Auth Service | 8081 |
| Movie Service | 8082 |
| Booking Service | 8083 |
| Notification Service | 8084 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |
| Redis | 6379 |
| RabbitMQ | 5672 (AMQP) / 15672 (Management UI) |

---

## 📖 API Documentation

See [docs/api-design.md](docs/api-design.md) for complete API endpoint documentation.

---

## 🧪 Testing

```bash
# Backend tests
cd backend/auth-service && mvn test
cd backend/movie-service && mvn test
cd backend/booking-service && mvn test

# Frontend tests
cd frontend && npm test
```

---

## 📜 License

This project is for educational purposes.
