# React + TypeScript + Vite YouTube Sharing App

This project is a YouTube sharing application built with React, TypeScript, and Vite. It allows users to share YouTube videos, view a list of shared videos, and register/login to the application.

## Features

- Share YouTube videos
- View a list of shared videos
- User registration and login
- Responsive design
- Real-time notification

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (20.18.1)
- npm (10.8.2)

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```sh
git clone https://github.com/Oibanoi/Youtube-Sharing-FE.git
cd Youtube-Sharing-FE
```

### 2. Install dependencies

Using npm:

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the necessary environment variables. For example:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run the development server

Using npm:

```sh
npm run dev
```

Or using yarn:

```sh
yarn dev
```

The application will be available at `http://localhost:3000`.

### 5. Build for production

Using npm:

```sh
npm run build
```

Or using yarn:

```sh
yarn build
```

The production build will be available in the `dist` directory.

### 6. Run tests

Using npm:

```sh
npm test
```

Or using yarn:

```sh
yarn test
```

## Project Structure

```plaintext
├── public
│   └── index.html
├── src
│   ├── components
│   ├── containers
│   ├── context
│   ├── hooks
│   ├── services
│   ├── App.tsx
│   ├── index.tsx
│   └── setupTests.ts
├── .eslintrc.js
├── jest.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```
