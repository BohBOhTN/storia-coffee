# Storia Coffee ☕

[![GitHub License](https://img.shields.io/github/license/BohBOhTN/storia-coffee)](https://github.com/BohBOhTN/storia-coffee/blob/main/LICENSE)
[![GitHub Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/BohBOhTN/storia-coffee/releases)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/node->=16.0.0-green)](https://nodejs.org/)

Real-time coffee shop management system with role-based dashboards and smart sales alerts.

![Storia Coffee Dashboard Preview](https://via.placeholder.com/800x400.png?text=Storia+Coffee+Dashboard+Preview)

## Features ✨

### Manager Dashboard
- 📊 Real-time sales analytics
- 🛠️ Product & category management
- 👥 User administration
- 🔔 Smart sales alerts system
- 📈 Performance reports

### Barista Interface
- ⚡ Quick sales logging
- 📱 Mobile-friendly design
- 🕒 Session tracking
- 📦 Product availability display

### Shared Features
- 🔐 Unified login page with role detection
- 📝 Activity logging
- 🌐 Multi-device support
- 🔄 Real-time updates

## Installation 🛠️

### Prerequisites
- Node.js >= 16.x
- PostgreSQL >= 12
- npm >= 8.x

### Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/BohBOhTN/storia-coffee.git
    cd storia-coffee
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    ```bash
    cp .env.example .env
    ```
4. Run the application:
    ```bash
    npm start
    ```

## Tech Stack 💻

### Frontend
- React 18
- Redux Toolkit
- Socket.io Client
- Chart.js
- Material-UI
- Formik & Yup

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- WebSocket

### Supporting Libraries
- Axios
- Day.js
- React Query
- React Router
- Bcrypt.js

## Backend CRUD Operations 📚

### User Management
- **Create User**: `POST /users`
    ```json
    {
        "email": "example@example.com",
        "password_hash": "examplePasswordHash",
        "role": "manager"
    }
    ```
- **Get Users**: `GET /users`
- **Get User by ID**: `GET /users/:id`
- **Update User**: `PUT /users/:id`
    ```json
    {
        "email": "updated@example.com",
        "password_hash": "updatedPasswordHash",
        "role": "barista"
    }
    ```
- **Delete User**: `DELETE /users/:id`

### Product Management
- **Create Product**: `POST /articles`
    ```json
    {
        "name": "Espresso",
        "price": 2.5,
        "category_id": 1,
        "image_url": "http://example.com/espresso.jpg"
    }
    ```
- **Get Products**: `GET /articles`
- **Get Product by ID**: `GET /articles/:id`
- **Update Product**: `PUT /articles/:id`
    ```json
    {
        "name": "Latte",
        "price": 3.0,
        "category_id": 1,
        "image_url": "http://example.com/latte.jpg"
    }
    ```
- **Delete Product**: `DELETE /articles/:id`

### Category Management
- **Create Category**: `POST /categories`
    ```json
    {
        "name": "Beverages",
        "image_url": "http://example.com/beverages.jpg"
    }
    ```
- **Get Categories**: `GET /categories`
- **Get Category by ID**: `GET /categories/:id`
- **Update Category**: `PUT /categories/:id`
    ```json
    {
        "name": "Hot Beverages",
        "image_url": "http://example.com/hot_beverages.jpg"
    }
    ```
- **Delete Category**: `DELETE /categories/:id`

### Sales Management
- **Create Sale**: `POST /sales`
    ```json
    {
        "user_id": 1,
        "article_id": 1,
        "quantity": 2
    }
    ```
- **Get Sales**: `GET /sales`
- **Get Sale by ID**: `GET /sales/:id`
- **Update Sale**: `PUT /sales/:id`
    ```json
    {
        "user_id": 1,
        "article_id": 1,
        "quantity": 3
    }
    ```
- **Delete Sale**: `DELETE /sales/:id`

### Product Alerts Management
- **Create Product Alert**: `POST /product_alerts`
    ```json
    {
        "product_id": 1,
        "manager_id": 1,
        "condition_type": "low_stock",
        "threshold": 10,
        "time_window": "24h"
    }
    ```
- **Get Product Alerts**: `GET /product_alerts`
- **Get Product Alert by ID**: `GET /product_alerts/:id`
- **Update Product Alert**: `PUT /product_alerts/:id`
    ```json
    {
        "product_id": 1,
        "manager_id": 1,
        "condition_type": "low_stock",
        "threshold": 5,
        "time_window": "12h",
        "is_active": true
    }
    ```
- **Delete Product Alert**: `DELETE /product_alerts/:id`

### Notifications Management
- **Create Notification**: `POST /notifications`
    ```json
    {
        "alert_id": 1,
        "message": "Low stock alert for Espresso"
    }
    ```
- **Get Notifications**: `GET /notifications`
- **Get Notification by ID**: `GET /notifications/:id`
- **Update Notification**: `PUT /notifications/:id`
    ```json
    {
        "alert_id": 1,
        "message": "Low stock alert for Latte",
        "is_read": true
    }
    ```
- **Delete Notification**: `DELETE /notifications/:id`

## Server Setup 🖥️

### Prerequisites
- Node.js >= 16.x
- PostgreSQL >= 12
- npm >= 8.x

### Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/BohBOhTN/storia-coffee.git
    cd storia-coffee
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    ```bash
    cp .env.example .env
    ```
4. Run the application:
    ```bash
    npm start
    ```

### Server Configuration

The server is configured in `server.js` and uses the following routes:
- `/users` for user management
- `/categories` for category management
- `/articles` for product management
- `/sales` for sales management
- `/product_alerts` for product alerts management
- `/notifications` for notifications management

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request