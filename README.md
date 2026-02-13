# Salon E-Commerce Platform

A comprehensive Node.js-based e-commerce application for salon and beauty services with dual user roles (Admin and User), product management, appointment booking, and transaction processing.

## 🌟 Project Overview

This is a full-featured e-commerce platform designed specifically for salon and beauty services. It provides a complete solution for managing products, services, appointments, transactions, and user interactions. The platform supports both administrator and user functionalities with role-based access control.

## ✨ Key Features

### User Features

- **User Authentication**
  - Registration and login
  - Password management (change password, forgot password)
  - User profile management

- **Shopping & Products**
  - Browse products with categories
  - Shopping cart functionality
  - Product purchasing
  - Order history tracking

- **Services**
  - Book appointments for salon services
  - Service categories and listings
  - Appointment scheduling and management

- **Content & Feedback**
  - View gallery (images and videos)
  - Submit reviews and ratings
  - Contact form for inquiries

- **Transactions**
  - Transaction history
  - Order management

### Admin Features

- **Admin Authentication**
  - Secure admin login
  - Admin profile management
  - Password management

- **Product Management**
  - Add, edit, and delete products
  - Manage product categories
  - Manage brands

- **Service Management**
  - Manage services and service categories
  - Appointment management and monitoring
  - Diagnosis system management

- **Content Management**
  - Banner image management
  - Blog management
  - Gallery management with categories
  - Offers and packages

- **User Management**
  - View all users
  - Monitor user activities
  - Order and transaction management

- **Analytics & Monitoring**
  - Order history tracking
  - Transaction monitoring
  - Appointment history

## 📁 Project Structure

```
salon e-commerce/
├── index.js                 # Main application entry point
├── package.json             # Project dependencies
├── auth/                    # Authentication modules
│   ├── adminauth.js         # Admin authentication
│   └── userauth.js          # User authentication
├── db/                      # Database configuration
│   └── dbconnection.js      # Database connection setup
├── public/                  # Public assets
│   ├── gallery/             # Gallery media
│   │   ├── images/
│   │   └── videos/
│   └── uploads/             # User uploads
│       ├── banners/
│       ├── brands/
│       ├── products/
│       └── reviews/
├── src/
│   ├── controllers/         # Business logic
│   │   ├── admin/           # Admin controllers
│   │   └── user/            # User controllers
│   ├── model/               # Database models
│   └── routers/             # API routes
│       ├── admin/           # Admin routes
│       └── user/            # User routes
```

## 🛠️ Technologies & Dependencies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (or similar - configured in dbconnection.js)
- **Authentication**: JWT-based authentication
- **File Upload**: Multer (for image/video uploads)
- **Development**: Nodemon (for auto-restart during development)

## 📦 Installation & Setup

### Prerequisites

- Node.js (v12 or higher)
- MongoDB or compatible database
- npm or yarn package manager

### Steps

1. **Clone or navigate to the project directory**

   ```bash
   cd "d:\salon e-commerce"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory
   - Add necessary configuration:
     ```
     PORT=3000
     DATABASE_URL=your_database_url
     JWT_SECRET=your_secret_key
     NODE_ENV=development
     ```

4. **Setup Database**
   - Ensure your MongoDB instance is running
   - Database connection is configured in `db/dbconnection.js`

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

or

```bash
npx nodemon
```

### Production Mode

```bash
npm start
```

The application will start on the configured PORT (default: 3000)

## 📚 API Routes

### Admin Routes

- **Authentication**: `/admin/login`, `/admin/register`, `/admin/sign-out`
- **Products**: `/admin/products`, `/admin/product-categories`
- **Services**: `/admin/services`, `/admin/service-categories`
- **Appointments**: `/admin/appointments`
- **Orders**: `/admin/order-history`
- **Content**: `/admin/banners`, `/admin/blogs`, `/admin/gallery`
- **Users**: `/admin/users`
- **Transactions**: `/admin/transactions`

### User Routes

- **Authentication**: `/user/login`, `/user/register`, `/user/sign-out`
- **Shopping**: `/user/products`, `/user/cart`, `/user/buy-product`
- **Orders**: `/user/order-history`
- **Services**: `/user/appointments`
- **Account**: `/user/profile`, `/user/change-password`
- **Feedback**: `/user/reviews`, `/user/contact-us`

## 🔐 Security Features

- Role-based access control (Admin/User)
- JWT token-based authentication
- Password encryption
- Protected routes and endpoints
- Input validation

## 📝 Models

The application includes the following data models:

- User
- Admin
- Product & Product Category
- Service & Service Category
- Appointment
- Cart
- Order History
- Transaction
- Review
- Blog
- Banner
- Gallery & Gallery Category
- Brand
- Offer & Package
- Contact Us
- Diagnosis System

## 🤝 Contributing

For development and modifications:

1. Follow the existing code structure
2. Maintain separation of concerns (controllers, models, routers)
3. Test changes before committing
4. Update this README if adding new features

## 📞 Support

For issues and inquiries:

- Use the contact form in the application
- Check the logs for error messages

## 📄 License

[Add your license information here]

---

**Version**: 1.0.0  
**Last Updated**: February 2026
