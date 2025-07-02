# Fugen Blog

Fugen Blog is a full-stack web application for creating, managing, and sharing blog posts. It features user authentication, post management, search, pagination, and a responsive landing page. The application is built with a clean architecture approach, leveraging TypeScript for type safety, Docker for containerization, and cloud-hosted MySQL and Redis for data persistence and caching. The frontend is optimized with lazy loading and code splitting for performance, while the backend follows a modular structure for maintainability and scalability.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features
- **User Authentication**: Secure registration and login with email/password validation using Zod schemas.
- **Post Management**: Create, edit, delete, and view blog posts with a clean, responsive UI.
- **Search and Filtering**: Search posts by title or content and sort by newest, oldest, or title.
- **Pagination**: Navigate through posts with paginated results (9 posts per page).
- **Debounced Search**: Optimizes search performance with a 500ms debounce to reduce API calls.
- **Delete Confirmation**: Confirms post deletion with a dialog to prevent accidental deletes.
- **Loading States**: Displays loading spinners during API calls for better UX.
- **Landing Page**: Engaging landing page with hero, features, testimonials, and call-to-action sections.
- **Single Post Page**: Displays individual posts with author info, actions (like, comment, share), and related posts, optimized with lazy loading.
- **Lazy Loading & Code Splitting**: Improves frontend performance by dynamically loading components (`HeroSection`, `TestimonialsSection`, `CTASection`, `SearchFilter`, `PostsGrid`, `ErrorMessage`, `EmptyState`, `ArticleHeader`, `ArticleContent`, `RelatedPosts`, `PostNotFound`).
- **Caching**: Uses cloud-hosted Redis for caching post data to reduce database load.
- **Modular Components**: Reusable React components for forms, post cards, headers, pagination, dialogs, value cards, testimonial cards, and related post cards.
- **Responsive Design**: Mobile-friendly UI with animations powered by Framer Motion.
- **Containerization**: Dockerized backend and frontend for consistent development and deployment environments.

## Technologies
- **Frontend**:
  - React (TypeScript)
  - Vite (build tool)
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
  - TypeScript
  - MySQL (cloud-hosted, e.g., AWS RDS, Google Cloud SQL)
  - Redis (cloud-hosted, e.g., AWS ElastiCache, Google Cloud Memorystore)
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt for password hashing
- **DevOps**:
  - Docker (containerization)
  - Docker Compose (service orchestration)
- **Development Tools**:
  - ESLint (code linting)
  - Prettier (code formatting)
  - Nodemon (backend hot reloading)
  - ts-node (TypeScript execution)

## Project Structure
```
fugen_blog/
├── server/
│   ├── src/
│   │   ├── domain/
│   │   │   ├── entities/               # Business entities (e.g., Post, User)
│   │   │   ├── interfaces/             # Repository and use case interfaces
│   │   │   └── use-cases/              # Business logic (use cases)
│   │   ├── application/
│   │   │   ├── dtos/                   # Data Transfer Objects
│   │   │   └── services/               # Application services
│   │   ├── infrastructure/
│   │   │   ├── database/               # MySQL repository implementations
│   │   │   ├── cache/                  # Redis cache implementations
│   │   │   └── auth/                   # Authentication utilities (JWT, bcrypt)
│   │   ├── interfaces/
│   │   │   ├── controllers/            # Express controllers
│   │   │   ├── routes/                 # Express routes
│   │   │   └── middlewares/            # Authentication middleware
│   │   ├── config/                     # Database and Redis configuration
│   │   └── main.ts                     # Backend entry point
│   ├── Dockerfile                      # Backend Docker configuration
│   ├── .env                            # Backend environment variables
│   ├── package.json                    # Backend dependencies and scripts
│   └── tsconfig.json                   # TypeScript configuration
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   └── AuthHeader.tsx
│   │   │   ├── post/
│   │   │   │   ├── PostForm.tsx
│   │   │   │   ├── PostCard.tsx
│   │   │   │   ├── DeleteDialog.tsx
│   │   │   │   ├── PostHeader.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── SearchFilter.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── ErrorMessage.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── BackButton.tsx
│   │   │   │   ├── ArticleHeader.tsx
│   │   │   │   ├── ArticleContent.tsx
│   │   │   │   ├── RelatedPosts.tsx
│   │   │   │   ├── RelatedPostCard.tsx
│   │   │   │   └── PostNotFound.tsx
│   │   │   ├── sections/
│   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   └── ui/
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── card.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── avatar.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── ValueCard.tsx
│   │   │       └── TestimonialCard.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── EditPost.tsx
│   │   │   ├── BlogListPage.tsx
│   │   │   ├── SingleBlogPost.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── services/
│   │   │   ├── post.api.ts
│   │   │   └── user.api.ts
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── postSlice.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── schema/
│   │   │   │   ├── AuthenticateSchema.ts
│   │   │   │   └── PostSchema.ts
│   │   │   └── Post.ts
│   │   └── main.tsx
│   ├── Dockerfile                      # Frontend Docker configuration
│   ├── .env                            # Frontend environment variables
│   ├── package.json                    # Frontend dependencies and scripts
│   └── vite.config.ts                  # Vite configuration
├── docker-compose.yml                  # Docker Compose configuration
└── README.md                           # Project documentation
```

## Prerequisites
- **Docker and Docker Compose**: Required for containerization and orchestration.
- **Node.js**: Version 20 or higher for local development (optional if using Docker).
- **Cloud-Hosted MySQL**: Accessible database (e.g., AWS RDS, Google Cloud SQL) for persistent storage.
- **Cloud-Hosted Redis**: Accessible cache (e.g., AWS ElastiCache, Google Cloud Memorystore) for performance optimization.
- **npm**: For installing dependencies locally (optional if using Docker).
- **Git**: For cloning the repository.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fugen_blog.git
cd fugen_blog
```

### 2. Configure Environment Variables
- **Backend (`server/.env`)**:
  - Create `server/.env` with the following variables:
    ```
    PORT=3000
    DB_HOST=<cloud-mysql-endpoint>  # e.g., mysql.cloud-provider.com
    DB_USER=<mysql-user>
    DB_PASSWORD=<mysql-password>
    DB_NAME=fugen_blog
    REDIS_HOST=<cloud-redis-endpoint>  # e.g., redis.cloud-provider.com
    REDIS_PORT=<redis-port>  # e.g., 6379
    REDIS_PASSWORD=<redis-password>  # Optional, if required
    JWT_SECRET=<your-jwt-secret>  # Random string for JWT
    ```
  - Ensure the file is excluded from version control (add to `.gitignore`).

- **Frontend (`client/.env`)**:
  - Create `client/.env` with:
    ```
    VITE_API_URL=http://backend:3000/api
    VITE_PORT=5173
    ```
  - Ensure the file is excluded from version control.

### 3. Verify Dockerfiles
- Ensure `server/Dockerfile` and `client/Dockerfile` exist:
  - `server/Dockerfile`: Builds the Node.js/Express backend with Node.js 20, installs dependencies, and runs `npm run dev`.
  - `client/Dockerfile`: Builds the React/Vite frontend with Node.js 20, installs dependencies, and runs `npm run dev`.

### 4. Run Docker Compose
- Ensure `docker-compose.yml` is in the `fugen_blog/` root directory.
- Build and start the services:
  ```bash
  docker-compose up -d --build
  ```
- Access the application:
  - Frontend: `http://localhost:5173`
  - Backend API: `http://localhost:3000/api`

### 5. Verify Cloud Connections
- Confirm that the backend connects to cloud-hosted MySQL and Redis using credentials from `server/.env`.
- Check logs for connection errors:
  ```bash
  docker-compose logs backend
  ```

### 6. Local Development (Optional)
- If not using Docker, install dependencies and run locally:
  - Backend:
    ```bash
    cd server
    npm install
    npm run dev
    ```
  - Frontend:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Usage
- **Register/Login**: Create an account or log in at `/register` or `/login`.
- **Create Post**: Authenticated users can create posts at `/create`.
- **Edit Post**: Edit owned posts at `/edit/:id`.
- **Delete Post**: Delete owned posts with confirmation dialogs on `/blog` or `/post/:id`.
- **Search and Filter**: Search posts by title or content and sort by newest, oldest, or title on `/blog`.
- **View Posts**: Browse all posts at `/blog` or view a single post with related posts at `/post/:id`.
- **Landing Page**: Explore features, testimonials, and start your journey at `/`.

## API Endpoints
- **User**:
  - `POST /api/users/register`: Register a new user (requires `email`, `password`).
  - `POST /api/users/login`: Log in a user (requires `email`, `password`).
- **Posts**:
  - `GET /api/posts?page=<page>&limit=<limit>&search=<term>`: Fetch paginated posts with optional search.
  - `POST /api/posts`: Create a new post (requires `title`, `content`, JWT).
  - `GET /api/posts/:id`: Fetch a single post by ID.
  - `PUT /api/posts/:id`: Update a post (requires `title`, `content`, JWT, ownership).
  - `DELETE /api/posts/:id`: Delete a post (requires JWT, ownership).

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request with a clear description of the changes.

### Guidelines
- Follow the existing code style (ESLint, Prettier).
- Write unit tests for new backend use cases and frontend components.
- Ensure TypeScript type safety and avoid `any` types.
- Update documentation (e.g., README, API endpoints) for new features.

## Troubleshooting
- **Docker Build Fails (ENOENT: no such file or directory, open '/app/package.json')**:
  - Verify `package.json` exists in `server/` and `client/`.
  - Ensure `COPY package.json package-lock.json ./` is in both Dockerfiles.
  - Check file permissions: `chmod 644 server/package.json client/package.json`.
  - Clear Docker cache:
    ```bash
    docker-compose down -v
    docker rmi $(docker images -q)
    docker-compose up -d --build
    ```
- **Frontend Fails (crypto.hash is not a function)**:
  - Update `client/Dockerfile` to use `node:20` or higher.
  - Update Vite: `cd client && npm install vite@latest`.
  - Rebuild: `docker-compose up -d --build`.
- **Cloud Connection Issues**:
  - Verify `server/.env` has correct MySQL and Redis endpoints/credentials.
  - Check network access to cloud services (e.g., firewall, VPC settings).
  - View logs: `docker-compose logs backend`.
- **Frontend Cannot Reach Backend**:
  - Ensure `client/.env` has `VITE_API_URL=http://backend:3000/api`.
  - Verify backend is running: `docker-compose ps`.

## License
This project is licensed under the MIT License.