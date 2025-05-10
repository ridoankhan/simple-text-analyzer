# simple-text-analyzer

**Project Description**  
A simple text analysis tool built with Node.js, Express, TypeScript, React, and Tailwind CSS. The application allows users to register/login with Google, manage their texts, and get detailed analytics such as word count, character count, sentence count, paragraph count, and longest words per paragraph.

---

## 🚀 Local Development Setup

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose
- [Node.js](https://nodejs.org/) (v18+ recommended) and [npm](https://www.npmjs.com/) (for running outside Docker)
- (Optional) [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) for DB inspection

---

### 1. Clone the Repository

```sh
git clone https://github.com/ridoankhan/simple-text-analyzer.git
cd simple-text-analyzer
```

---

### 2. Environment Variables

- Copy `.env.example` to `.env` in the `backend/` directory and adjust as needed.
- The most important variables are already set in `docker-compose.yml` for Docker usage.

---

### 3. Start All Services with Docker Compose

This will start MySQL, Redis, the backend, and the frontend.

```sh
docker-compose up --build
```

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)
- MySQL: `localhost:3306` (user: root, password: root)
- Redis: `localhost:6379`

---

### 4. Manual Setup (Without Docker)

#### Backend

```sh
cd backend
cp .env.example .env
npm install
npm run dev
```

#### Frontend

```sh
cd frontend
npm install
npm run dev
```

---

### 5. Google OAuth Setup

- Register your app in [Google Cloud Console](https://console.cloud.google.com/).
- Set the OAuth 2.0 redirect URI to:  
  `http://localhost:3000/api/v1/auth/google/callback`
- Update your `.env` or `docker-compose.yml` with your Google client credentials.

---

### 6. API Documentation

- Import the `Text-Analyzer.postman_collection.json` from the `backend/` folder into [Postman](https://www.postman.com/) to explore and test the API endpoints.

---

### 7. Running Tests

#### Backend

```sh
cd backend
npm test
```

---

### 8. Project Structure

```
backend/
  src/
    controllers/
    models/
    routes/
    ...
frontend/
  src/
    pages/
    components/
    ...
docker-compose.yml
```

---

### 9. Useful Commands

- **Stop all containers:**  
  `docker-compose down`
- **Rebuild containers:**  
  `docker-compose up --build`
- **View logs:**  
  `docker-compose logs -f`

---

## 📢 Notes

- All user data and analysis results are cached in Redis for performance.
- Only the authenticated user can access, update, or delete their own texts.
- For production, update environment variables and security settings accordingly.

---

## 📝 License

MIT License
