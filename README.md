# 🛍️ Electronics E-Commerce Application

An advanced full-stack web application for an electronics store built with **Spring Boot**, **React**, **PostgreSQL**, and more. This application supports both user and admin roles and provides a complete shopping experience, including authentication, product browsing, cart, wishlist, order management, and administrative product control.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Setup Instructions](#setup-instructions)
- [Author](#author)
- [License](#license)

---

## ✅ Features

### 👤 Users

- Register / Login / Forgot Password
- Browse products and categories
- Add to cart and wishlist
- Place orders and view order history
- Update profile and contact details

### 🛠️ Admins

- Add / update / delete products
- View all user orders in XML
- View product and order details
- Manage inventory and categories

---

## ⚙️ Tech Stack

**Frontend:**

- React.js (Vite)
- Axios

**Backend:**

- Spring Boot
- Spring Data JPA
- Jackson (JSON & XML support)
- RESTful Web Services

**Database:**

- PostgreSQL

**Other:**

- Maven
- Lombok
- Imgur for image hosting

---

## 📸 Screenshots

### 👤 User View

- **Login Page**  
  ![Login](https://imgur.com/924p33u.png)

- **Register Page**  
  ![Register](https://imgur.com/aL4yATj.png)

- **Forgot Password**  
  ![Forgot Password](https://imgur.com/fXuRIYG.png)

- **Products (User View)**  
  ![Products (User)](https://imgur.com/vHMIZfk.png)

- **Categories (For Example, Laptops)**  
  ![Categories](https://imgur.com/WCNsimG.png)

  - **Product Details**  
    ![Product Details](https://imgur.com/8BgOLCw.png)

  - **Wishlist**  
    ![Wishlist](https://imgur.com/7mtdiJi.png)

- **Cart**  
  ![Cart](https://imgur.com/NpNDF8g.png)

- **Orders (User View)**  
  ![User Orders](https://imgur.com/f9vtgvn.png)

- **Order Details**  
  ![Order Details](https://imgur.com/lkQWtzV.png)

- **Profile (Settings)**  
  ![Profile Settings](https://imgur.com/uBYRjia.png)

- **Search Bar (with Filters)**  
  ![Search Filters](https://imgur.com/VeYWUY5.png)

### 🛠️ Admin View

- **Products (Admin View)**  
  ![Admin Products](https://imgur.com/u57MYms.png)

- **Add New Product (Admin)**  
  ![Add Product](https://imgur.com/TIplKRw.png)

- **View All Orders (XML Format)**  
  ![XML Orders](https://imgur.com/OZKsx5N.png)

- **Orders (Admin View)**  
  ![Admin Orders](https://imgur.com/8PveU5q.png)

👉 [**View All Screenshots in Gallery**](https://imgur.com/a/uhJGNQS)

---

## 🎥 Demo

🚀 **Live Demo**  
You can view the live demo of the application at: [https://electronics-store-app.netlify.app/](https://electronics-store-app.netlify.app/)

---

## 🛠️ Setup Instructions

### 🔧 Backend (Spring Boot)

1. Clone the repository and open the backend folder in your IDE.
2. Update your PostgreSQL (Or any other database) configuration in `application.properties`:

   ```properties
   # PostgreSQL configuration (For Example)
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password

   ```

3. Make sure PostgreSQL is running and the database exists.
4. Run `ElectronicsApplication.java` to start the backend server.

---

### 💻 Frontend (React + Vite)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at http://localhost:5173

## 👨‍💻 Author

**Elad Reuveny**  
📧 [eladre123@gmail.com](mailto:eladre123@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/eladreuveny/)  
🌐 [Portfolio](https://eladreuveny-portfolio.netlify.app/)

© Electronics Store App — All rights reserved.
