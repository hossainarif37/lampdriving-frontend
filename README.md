# Lamp Driving FrontEnd

A modern and scalable frontend application built with **Next.js**, **Redux**, **Tailwind CSS**, **TypeScript**, and **Docker**. This project follows a clean and maintainable folder structure for enhanced development efficiency.

---

## 🚀 Features

- **Next.js Framework**: For server-side rendering and efficient routing.
- **TypeScript**: Type safety for predictable and maintainable code.
- **Redux**: Robust state management for complex UI interactions.
- **Tailwind CSS**: Rapid and flexible styling with a utility-first CSS framework.
- **Docker**: Simplified containerization for seamless development and deployment.
- Responsive design and optimized for performance.

---

## 🗂️ Folder Structure

```plaintext
src/
├── app/           # App directory for Next.js pages and routes
├── assets/        # Static assets (images, fonts, icons)
├── components/    # Reusable UI components
├── constant/      # Constants (e.g., configurations, enums)
├── lib/           # App-specific libraries and external integrations
├── providers/     # Context providers for state management
├── redux/         # Redux setup (store, slices, reducers)
├── types/         # TypeScript type definitions and interfaces
├── utils/         # Utility functions (formatting, validation, etc.)
```

## 💻 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Type Safety**: TypeScript
- **Containerization**: Docker

## 🛠️ Getting Started
### Prerequisites
- Node.js (>=16)
- Docker and Docker Compose
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/lamp-driving-frontend.git
cd lamp-driving-frontend
```

<!-- 2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
``` -->

2. Build and run the app using Docker:

```bash
docker-compose up --build
```
3. Open http://localhost:3000 to view it in your browser.


## 📂 Folder Details
`app/` \
Handles routing and Next.js-specific functionality, such as layouts and pages.

`assets/` \
Contains static files like images, fonts, and icons.

`components/` \
Stores reusable UI components, such as buttons, modals, or headers.

`constant/` \
Keeps global constants and configuration variables.

`lib/` \
Includes project-specific utilities, API integrations, and custom hooks.

`providers/` \
Context providers for global state and configurations.

`redux/` \
Manages application state using Redux Toolkit, including slices and the store.

`types/` \
Houses TypeScript interfaces and type definitions.

`utils/` \
Utility functions for formatting, validation, and other generic purposes.

## 🐳 Docker Setup
The project includes Docker support to streamline the development and deployment process.

### Docker Commands

- Build and run the container:
```bash
docker-compose up --build
```

- Stop the container:
```bash
docker-compose down
```

- Rebuild the container without cache:
```bash
docker-compose build --no-cache
```

### Docker Compose Overview
The `docker-compose.yml` file defines the app's container with the following services:
- `frontend`: Runs the Next.js application.

## 🛠️ Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the app for production.
- `npm run start` - Start the production server.
- `npm run lint` - Lint code for issues.

## 📦 Dependencies
- **Next.js**: Framework for server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS for styling.
- **Redux Toolkit**: State management.
- **TypeScript:** Static typing for JavaScript.
📄 License
This project is licensed under the MIT License.

## 📄 License
This project is licensed under the MIT License.