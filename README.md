# finance-tracker-express

## Table of Contents

- [finance-tracker-express](#finance-tracker-express)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Purpose](#purpose)
    - [Background](#background)
    - [Technologies](#technologies)
  - [Important: Installation Dependencies](#important-installation-dependencies)
    - [Environment Variables](#environment-variables)
      - [Setting Environment Variables](#setting-environment-variables)
    - [Docker Installation](#docker-installation)
      - [Why use Docker?](#why-use-docker)
      - [Docker Commands](#docker-commands)
    - [Connecting to Mariadb Locally](#connecting-to-mariadb-locally)
  - [Important: API Documentation](#important-api-documentation)
  - [Project Design](#project-design)
    - [Constants](#constants)
    - [Controllers](#controllers)
    - [Database](#database)
    - [Errors](#errors)
    - [Middleware](#middleware)
    - [Models](#models)
    - [Routes](#routes)
    - [Services](#services)
    - [Utilities](#utilities)

## Introduction

### Purpose

It is intended to demonstrate technical acumen with various technologies that include Node.js, Mariadb, and Docker. This project is primarily focused on API developement with the Express.js framework. Primarily focusing on APIs, front-end development was excluded.

### Background

This project implements a backend service for a simplified finance tracker. Application is a self-signup that allows each user to create multiple accounts for tracking debits and credits.

### Technologies

The following highlights the technologies applied. Each was selected for an attribute to demonstrate the contextual knowledge of capabilities offered.

- **Node.js**:\
  This project is written in Node.js. Chosen for ease of use, readability, and access to the Express framework.
- **Express.js**:\
  An API Node.js framework. Chosen for the asynchronous programming support and middleware features. Each request passes through a middleware layer, simplifying the implementation of repitive business logic for each endpoint.
- **Mariadb**:\
  RDBMS (Relational Database Management System) technology, chosen for the feature rich dialect of SQL. It is an open-source solution that has well established branch and reputation in the market. Software defects are resolved quicker than other open-source solutions.
- **Docker**:\
  Chosen to provide a consistent environment for running the code.

## Important: Installation Dependencies

### Environment Variables

#### Setting Environment Variables

- Create a `.env` file in the root directory, then copy and paste the following variables into the file.
  > **Tip**: root directory is referred to as the directory containing Docker-related files, etc.
- Create a `JWT_SECRET_KEY`.
  > This can be achieved with the following command in the terminal: `openssl rand -hex 32`.

**Environment Variables**:
The following environment variables are essential for successful code build.

```python
PORT=3000                         # Server port
ENV=development                   # Environment

# Database specific variables, essential for creating a successful connection string.
DB_USRNM=root                 # database username, this is the default root user for PostgreSQL
DB_PWD=****                       # database password, '****' is not a valid password, this is a placeholder
DB_HST=db                # database host, specified in docker-related files
DB_PORT=3306                      # database port number, specified in docker-related files

# JWT specific variables
JWT_SECRET_KEY=                   # secret key for encoding JWT
JWT_ALGORITHM=                    # algorithm for encoding JWT, example: JWT_ALGORITHM=HS256
JWT_EXPIRATION=                   # expiration in minutes, example: JWT_EXPIRATION=15

```

---

### Docker Installation

This project was developed in Docker. If you do not have Docker installed locally or if you have not used Docker before, please refer to the following link.

[Install Docker](https://docs.docker.com/engine/install/)

> **Tip**: The installation guide will help make the installation process seamless.

#### Why use Docker?

Using Docker helps maintain a consistent development environment, ensuring that all users will have the same experience.

#### Docker Commands

- **Start Containers**: `docker-compose up -d`\
  Starts the containers in detached mode, allowing the containers to run in the background without running any specified commands in the Dockerfile.
- **Build Image and Start Containers**: `docker-compose up --build`\
  Forces a build of the images and runs the commands specified in the `Dockerfile`.
- **Stop Containers**:\
  Press `ctrl+c` to disrupt a current process to return to the terminal.
- **Shut Down Containers**: `docker-compose down`\
  Stops and removes the containers when done.

### Connecting to Mariadb Locally

To connect to the Postgres instance hosted in Docker, use your preferred database management tool.

> **Tip**: Port must be set to **3300**, not **3306**, for a successful connection. The Postgres instance was exposed externally for connections outside of the Docker network on a different port to avoid conflict for any pre-existing local Postgres instances.

---

## Important: API Documentation

API design has been documented using OpenAPI specifications written in YAML. This can be located in the root directory `./openapi-docs/openapi.yaml`. Providing a robust output, this documentation has been served using both the swaggerUI and redoc libraries.

Running this project locally will generate the interactive documentation that can be found at each respective path below.

- **swaggerUI**: `/docs`
- **redoc**: `/redoc`

> **Tip**: Each path serves each flavor of the documentation at `localhost:3000`.

## Project Design

This section will briefly describe the implementation and source code design. Code can be located from the root directory `./src`.

```plain text
// The following is visualization of the code structure.
src
  ├─ constants          // Holds global variables and configuration constants.
  ├─ controllers        // Contains business logic and handlers for API routes.
  ├─ database           // Manages database connections, configurations, etc.
  ├─ errors             // Custom Error classes and error handling.
  ├─ middleware         // Middleware functions that process requests before reaching each controller.
  ├─ models             // Defines the structure of data in teh application (e.g., database schemas).
  ├─ routes             // Defines the API endpoints and their corresponding operations.
  ├─ services           // Encapsulates business logic for database interaction.
  └─ utilities          // Helper functions and utilities used throughout the application.

```

```plain text
// The following is a representation of hiearchy in the code implementation.
router
  |
  └─ middleware
      |
      └─ controller
          |
          └─ schema
              |
              └─ services

```

### Constants

Stores contant values that are globally accessible throughout the project. This can include message variables, router paths, and other global contant values. Using a constant files avoids hardcodig values throughout the codebase, simplifiing code and reducing errors.

---

### Controllers

Contains the business logic for incoming requests. Controllers are responsible for handling the requests, invoking necessary services, and return appropriate responses.

---

### Database

This folder the necessary logic for establishing a connection with the Mariadb instance. This includes database and table creation.

---

### Errors

A collection of custom error classes that enhance error handling throughout the application.

---

### Middleware

This folder contains functions that process requests before they are passed to route handlers (controllers). Middleware includes authentication and error handling.

---

### Models

This folder contains the data definitions for database tables that store data for this application. Models are defined using an ORM, Sequelize.

---

### Routes

This folder contains the path operations and the HTTP methods for each endpoint. It maps each request to a corresponding controller. Routes also includes neccesary middleware that is needed prior to passing the request to the corresponding controller.

---

### Services

Services are responsible for handling core logic of the application, interacting with the database. They abstract the I/O operations from the controller making the code more modular and easier to maintain.

---

### Utilities

Folder contains a collection of helper functions and utilities that do not fall in any specific category that is needed throughout the application.

---
