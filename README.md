# Fugen Blog

Fugen Blog is a full-stack web application for creating, managing, and sharing blog posts. It features user authentication, post creation, editing, deletion, and a responsive UI with search, pagination, and sorting capabilities. The application uses a modern tech stack with a React frontend, Node.js backend, MySQL database, and Redis for caching to ensure efficient data retrieval.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Register and log in with email and password validation using Zod schemas.
- **Post Management**: Create, edit, delete, and view blog posts with a clean, responsive UI.
- **Search and Filtering**: Search posts by title or content and sort by newest, oldest, or title.
- **Pagination**: Navigate through posts with paginated results (9 posts per page).
- **Debounced Search**: Prevents excessive API calls during search input with a 500ms debounce.
- **Delete Confirmation**: Confirms post deletion with a dialog to prevent accidental deletes.
- **Loading States**: Visual feedback during API calls (login, register, create, edit, delete) using spinners.
- **Caching**: Redis caching for post retrieval to improve performance.
- **Responsive Design**: Mobile-friendly UI with animations powered by Framer Motion.

## Technologies
- **Frontend**:
  - React (TypeScript)
  - Redux Toolkit (state management)
  - React Router (navigation)
  - Shadcn/UI (UI components)
  - Lucide React (icons)
  - Framer Motion (animations)
  - Tailwind CSS (styling)
  - Axios (HTTP requests)
  - Zod (schema validation)
- **Backend**:
  - Node.js with Express
  - MySQL (database)
  - Redis (caching)
  - TypeScript
- **DevOps**:
  - Docker (containerization)
  - Docker Compose (multi-container setup)
- **Other**:
  - Vite (frontend build tool)
  - ESLint (code linting)
  - Prettier (code formatting)

## Project Structure
```
fugen_blog/
├── backend/
│   ├── src/
│   │   ├── config/                 # Database and Redis connection setup
│   │   ├── domain/                 # Domain entities and interfaces
│   │   ├── infrastructure/         # Database and cache implementations
│   │   │   └── database/
│   │   │       └── MySQLPostRepository.ts
│   │   ├── services/               # Business logic and API services
│   │   └── index.ts                # Entry point for backend
│   ├── package.json
│   └── docker-compose.yml          # Docker setup for backend, MySQL, Redis
├── client/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   └── ui/                 # Shadcn/UI components (Button, Input, etc.)
│   │   ├── pages/                  # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── EditPost.tsx
│   │   │   ├── BlogListPage.tsx
│   │   │   └── SingleBlogPost.tsx
│   │   ├── services/               # API service functions
│   │   │   ├── post.api.ts
│   │   │   └── user.api.ts
│   │   ├── store/                  # Redux store setup
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── postSlice.ts
│   │   │   └── index.ts
│   │   ├── types/                  # TypeScript type definitions
│   │   │   ├── schema/
│   │   │   │   ├── AuthenticateSchema.ts
│   │   │   │   └── PostSchema.ts
│   │   │   └── Post.ts
│   │   └── main.tsx                # Entry point for frontend
│   ├── package.json
│   └── vite.config.ts              # Vite configuration
├── README.md
```

## Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- MySQL (if not using Docker)
- Redis (if not using Docker)
- npm or yarn

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/fugen_blog.git
   cd fugen_blog
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables in `backend/.env`:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=fugen_blog
     REDIS_HOST=redis-container
     REDIS_PORT=6379
     ```
   - Start the backend with Docker:
     ```bash
     docker-compose up -d --build
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables in `client/.env`:
     ```env
     VITE_API_URL=http://localhost:3000/api
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Database Setup**:
   - If not using Docker, ensure MySQL is running and create the database:
     ```sql
     CREATE DATABASE fugen_blog;
     ```
   - Run migrations (if applicable) or ensure the `posts` table exists:
     ```sql
     CREATE TABLE posts (
       id VARCHAR(255) PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL,
       authorId VARCHAR(255) NOT NULL,
       createdAt DATETIME NOT NULL
     );
     ```

5. **Redis Setup**:
   - If not using Docker, ensure Redis is running (`redis-server`).

6. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000/api`

## Usage
- **Register/Login**: Create an account or log in at `/register` or `/login`.
- **Create Post**: Authenticated users can create posts at `/create`.
- **Edit Post**: Edit owned posts at `/edit/:id`.
- **Delete Post**: Delete owned posts with confirmation dialogs on the blog list (`/blog`) or single post (`/post/:id`) pages.
- **Search and Filter**: Search posts by title/content and sort by newest, oldest, or title on the blog list page.
- **View Posts**: Browse all posts at `/blog` or view a single post at `/post/:id`.

## API Endpoints
- **User**:
  - `POST /api/users/register`: Register a new user (email, password)
  - `POST /api/users/login`: Log in a user (email, password)
- **Posts**:
  - `GET /api/posts?page=<page>&limit=<limit>&search=<term>`: Fetch paginated posts with optional search
  - `POST /api/posts`: Create a new post (title, content)
  - `GET /api/posts/:id`: Fetch a single post
  - `PUT /api/posts/:id`: Update a post (title, content)
  - `DELETE /api/posts/:id`: Delete a post

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.