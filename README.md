# Football Championship Table Management System

A full-stack web application for managing football championship tables with real-time standings calculation.

## 🎯 Features

- **Team Management**: Register and manage football teams
- **Match Recording**: Record match results with scores
- **Live Standings**: Automatic calculation and display of championship standings
- **Points System**: Standard football points (Win: 3, Draw: 1, Loss: 0)
- **Statistics Tracking**: Wins, draws, losses, goals for/against, goal difference

## 🏗️ Architecture

### Backend (.NET 8 Web API)
Clean Architecture implementation with four layers:
- **Domain**: Core business entities (Team, Match)
- **Application**: DTOs and service interfaces
- **Infrastructure**: Data access, EF Core In-Memory database, service implementations
- **WebAPI**: REST API controllers and configuration

### Frontend (React + TypeScript)
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Component-based**: Modular UI components

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 20+
- Docker (optional, for containerized deployment)

### Running with Docker (Recommended)

```bash
# Build and run both services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

### Running Locally

#### Backend
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project ChampionshipTable.WebAPI

# API will be available at http://localhost:5000
# Swagger UI at http://localhost:5000/swagger
```

#### Frontend
```bash
cd frontend
npm install
npm run dev

# Application will be available at http://localhost:5173
```

## 📋 API Endpoints

### Teams
- `GET /api/teams` - Get all teams with standings
- `GET /api/teams/{id}` - Get team by ID
- `POST /api/teams` - Create new team
- `DELETE /api/teams/{id}` - Delete team

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/{id}` - Get match by ID
- `POST /api/matches` - Record new match
- `DELETE /api/matches/{id}` - Delete match

## 🎮 Usage

1. **Add Teams**: Use the "Add New Team" form to register teams
2. **Record Matches**: Select home/away teams and enter scores
3. **View Standings**: Championship table updates automatically
4. **Track History**: See recent matches in the sidebar

## 🛠️ Technology Stack

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core (In-Memory)
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS

### DevOps
- Docker
- Docker Compose

## 📁 Project Structure

```
.
├── backend/
│   ├── ChampionshipTable.Domain/      # Core entities and business logic
│   ├── ChampionshipTable.Application/ # DTOs and interfaces
│   ├── ChampionshipTable.Infrastructure/ # Data access and services
│   ├── ChampionshipTable.WebAPI/      # API controllers
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API integration
│   │   └── types/         # TypeScript interfaces
│   └── Dockerfile
└── docker-compose.yml
```

## 🧪 Development

### Backend Development
```bash
cd backend
dotnet watch --project ChampionshipTable.WebAPI
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
