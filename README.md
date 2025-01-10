<h1 align="center">Welcome to ecommerce-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/6ill/ecommerce-api/blob/master/LICENSE)" target="_blank">
    <img alt="Static Badge" src="https://img.shields.io/badge/license-MIT-blue">
  </a>
</p>

This project is a simple REST API built for an e-commerce platform. It provides core functionalities such as:   
- **User Management**: Authentication, authorization, and user profile handling.  
- **Product Management**: Adding, updating, deleting, and retrieving product details.  
- **Shopping Cart**: Adding products to the cart, updating quantities, and clearing the cart.  
- **Order Management**: Creating orders, tracking order status, and viewing order history.  
- **Support Tickets**: Managing customer inquiries and issue resolution.  

The API is built with **Node.js** using the **NestJS** framework, **PostgreSQL** for the database, and **Swagger** for API documentation. It is designed to be scalable, maintainable, and easy to integrate with frontend applications.

---

## Features  

- **Secure Authentication**: Uses Passport.js with local and JWT strategies for authentication.  
- **Swagger Integration**: Auto-generated API documentation for easier collaboration.  
- **Scalable Structure**: Modular design with NestJS to handle future feature expansions.  
- **Environment Configurations**: `.env` support for environment-specific settings.  

---

## Prerequisites  

Before running the application, ensure you have the following installed:  
- Node.js (>=16.x)  
- npm (>=7.x)  
- PostgreSQL  

---

## Install  

Clone the repository and install dependencies:  

```
git clone https://github.com/6ill/ecommerce-api.git
cd ecommerce-api
npm install
```
## Environment Setup
Create a .env file in the root directory based on .env.example.

## Usage 
```
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod
```

## API Documentation
The API documentation is auto-generated with Swagger.
After starting the server, navigate to http://localhost:<PORT>/v1/api/docs to access the documentation.

## Author
👤 **Bill Hensen**
* Github: [@6ill](https://github.com/6ill)

## Show your support
Give a ⭐️ if this project helped you!