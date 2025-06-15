# ToDo App

A fullstack ToDo application with a React + Material UI (MUI) frontend and a Node.js + Express + MongoDB backend.

## Features
- Add, edit, delete, and mark todos as done
- Filter todos by All and Done
- Responsive, modern UI with Material UI
- Pagination for efficient browsing
- Date/time validation and user-friendly forms
- **API documentation available via Swagger UI**

## Tech Stack
- **Frontend:** React, TypeScript, Material UI (MUI), Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose, Zod

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)

### Setup

#### 1. Clone the repository
```bash
git clone https://github.com/eczdell/proshore-todo-app
cd todo-app
```

#### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

#### 3. Start MongoDB using Docker (recommended)
If you have Docker installed, you can quickly start MongoDB with:
```bash
docker-compose up -d
```
This will use the `docker-compose.yml` in the `backend` directory to spin up a MongoDB container.

#### 4. Configure environment variables
Create a `.env` file in the `backend` directory:
```
MONGO_URI=mongodb://localhost:27017/todo
PORT=5000
```

#### 5. Start the backend
```bash
cd backend
npm run dev
```

#### 6. Start the frontend
```bash
cd frontend
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## API Documentation

Interactive API documentation is available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) (or your configured backend port). The documentation is powered by Swagger UI and is generated from JSDoc comments in the backend route files. The Swagger options are defined in `backend/src/swaggerOptions.ts`.

## Usage
- Click **Add New** to create a todo.
- Use the filter buttons to view All or Done todos.
- Edit or delete todos using the action icons.
- Use pagination controls to browse through todos.

## Project Structure
```
todo-app/
  backend/      # Express API & MongoDB models
  frontend/     # React + MUI frontend
```

## License
MIT 

## Diagrams

- **Database ER Diagram:** [docs/db-er-diagram.puml](backend/docs/db-er-diagram.puml)
- **Project Sequence Diagram:** [docs/project-sequence-diagram.puml](backend/docs/project-sequence-diagram.puml)

You can visualize these diagrams using any PlantUML-compatible tool or online viewer. 