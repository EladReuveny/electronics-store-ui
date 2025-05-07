# 🛍️ Electronics E-Commerce Application

An advanced **Full-Stack E-Commerce Web Application** for
electronics, built using:

- ⚙️ **Backend**: Spring Boot (Java)
- 💻 **Frontend**: React.js
- 🗄️ **Database**: PostgreSQL
- 🧰 **Tools & Libraries**: RESTful APIs, JPA, Axios, React
  Router, Context API, Swagger API Documentation, and more

This responsive web application supports two roles: **User**
and **Admin**, offering a complete and seamless shopping
experience with the following key features:

---

## ✨ Features

### 👤 User Functionality

- 🔐 Authentication: Register, Login, Forgot Password
- 🛒 Shop: Browse products and categories, view product
  details
- 📦 Cart: Add, update, and remove items
- ❤️ Wishlist: Save products for later
- 🔎 Search: Filter products by name, category, and price
  range
- 🧾 Orders: Place orders, view order history and order
  details
- ⚙️ Profile: View and edit personal details (with
  dark/light mode support)

### 🛠️ Admin Functionality

- 📦 Product Management: Add, edit, delete, and view product
  details
- 📃 Order Management: View all customer orders and their
  statuses
- 🧾 Export Orders: Download order list in XML format
- 🌐 Responsive Admin Dashboard: Optimized for desktop and
  tablet

---

## 📱 Responsiveness

The app is fully responsive and optimized for:

- ✅ Mobile (Phones)
- ✅ Tablets
- ✅ Desktops

It adapts UI layouts such as navigation, product grid, and
modals to fit smaller screen sizes using **flexbox**, **grid
**, and conditional rendering.

---

## 🔗 Related Repositories

👉 [Frontend Repository](https://github.com/EladReuveny/electronics-store-ui)

👉 [Backend Repository](https://github.com/EladReuveny/electronics-store-api)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Setup Instructions](#setup-instructions)
- [User Guide](#user-guide)
- [API Documentation](#api-documentation)
- [Author](#author)

---

## <a id="features">✅ Features</a>

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

## <a id="tech-stack">⚙️ Tech Stack</a>

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

## <a id="screenshots">📸 Screenshots</a>

<details>
   <summary>👤 <strong>User View</strong></summary>

- **Login Page**  
  ![Login](https://imgur.com/hHHfjjU.png)

- **Register Page**  
  ![Register](https://imgur.com/KeszhHo.png)

- **Forgot Password**  
  ![Forgot Password](https://imgur.com/lX3cnZ2.png)

- **Products (User View)**  
  ![Products](https://imgur.com/yJkQK11.png)

- **Categories (e.g., Laptops)**  
  ![Categories](https://imgur.com/bOkbjIc.png)

- **Product Details**  
  ![Product Details](https://imgur.com/qqlih0U.png)

- **Search with Filters**  
  ![Search Filters](https://imgur.com/7rZb5pq.png)

- **Wishlist**  
  ![Wishlist](https://imgur.com/0BUhCip.png)

- **Cart**  
  ![Cart](https://imgur.com/5MV1M6V.png)

- **Cart (Light Mode)**  
  ![Cart Light](https://imgur.com/LwRyNZX.png)

- **Orders**  
  ![Orders](https://imgur.com/moCuvD9.png)

- **Order Details**  
  ![Order Details](https://imgur.com/hCRtgTz.png)

- **Profile Settings**  
  ![Profile](https://imgur.com/Pw5PTqc.png)

- **Profile (Light Mode)**  
  ![Profile Light](https://imgur.com/tnrHzr3.png)

</details>

---

<details>
<summary>🛠️ <strong>Admin View</strong></summary>

- **Products (Admin View)**  
  ![Admin Products](https://imgur.com/gGOUsAx.png)

- **Products (Light Mode)**  
  ![Admin Products Light](https://imgur.com/MIjtDIG.png)

- **Add New Product**  
  ![Add Product](https://imgur.com/03ttngO.png)

- **Product Details (Admin)**  
  ![Admin Product Details](https://imgur.com/YpMFlEh.png)

- **Edit Product**  
  ![Edit Product](https://imgur.com/REmElXH.png)

- **Orders (Admin View)**  
  ![Admin Orders](https://imgur.com/bjmox9p.png)

- **Orders (Light Mode)**  
  ![Admin Orders Light](https://imgur.com/tnrHzr3.png)

- **Order Details (Admin)**  
  ![Order Details](https://imgur.com/3CcX3U2.png)

- **All Orders (XML Format)**  
  ![XML Orders](https://imgur.com/BGZjiW9.png)

</details>

---

<details>
<summary>📱 <strong>Responsive View</strong></summary>

- **Menu Bar (Opened)**  
  ![Menu Bar](https://imgur.com/7Wv3JGp.png)

- **Products (Responsive)**  
  ![Responsive Products](https://imgur.com/9L95xcQ.png)

</details>

---

👉 [**View All Screenshots in Gallery
**](https://imgur.com/a/x2solXr)

---

## <a id="demo">🎥 Demo</a>

🚀 **Live Demo**  
You can view the live demo of the application
at: [Electronics](https://electronics-store-app.netlify.app/).

---

## <a id="setup-instructions">🛠️ Setup Instructions</a>

### 🔧 Backend (Spring Boot)

1. Clone the repository and open the backend folder in your
   IDE.
2. Update your PostgreSQL (Or any other database)
   configuration in `application.properties`:

   ```properties
   # PostgreSQL configuration (For Example)
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password

   ```

3. Make sure PostgreSQL is running and the database exists.
4. Run `ElectronicsApplication.java` to start the backend
   server.

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

---

## <a id="user-guide">📘 User Guide</a>

---

**📘 User Guide (Functional Description)**

**👤 User Flow**

1. **Register / Login**

    - Navigate to the home page.
    - Click Register to create a new account or Login if you
      already have one.
    - You can use Forgot Password to retrieve your password
      via email, address and phone number.

2. **Browsing Products**

    - Users are allowed to view products without having an
      account.
    - View all available products categorized by type (e.g.,
      Smart Phones, Laptops, Tablets, Tv's).
    - Use the Search Bar to find specific items.
    - Apply Filters to narrow down products by price or hide
      out-of-stock items.

3. **Product Details**

    - Click on any product to view detailed information,
      such as:
        - Price
        - Description
        - Stock availability
        - Category
        - Images.
    - You can Add to Cart or Wishlist from this page.

4. **Wishlist**

    - Accessible via the top navigation bar.
    - Add and remove items for future purchases.

5. **Shopping Cart**

    - Accessible via the top navigation bar.
    - View all selected items for purchase.
    - Update quantities or remove items.
    - View product details if necessary.
    - Proceed to Checkout to place an order.

6. **Orders**

    - View past orders and their details.
    - Click any order to see more detailed information.
    - Cancel an Order: If the order was placed within a
      specified time after checkout, you can choose to
      cancel the order directly from the order details page.

7. **Profile Settings**
    - Accessible via the top navigation bar.
    - Update your email, password, address and phone number.
    - Modifying application's appearance settings, such as
      display preferences.

🛠️ **Admin Flow**

1. **Login**

    - Admins must log in with admin credentials.

2. **Manage Products**

    - View all products.
    - Add new products and edit/delete existing ones.

3. **Managing and Tracking Orders**

    - Access the Orders page to view all the orders.
    - Option to view orders in XML format for export or
      integration.
    - Option to modify order's status as needed (e.g., "
      Pending", "Packaging", "Shipped", "Delivered", "
      Canceled").

🖼️ **Screenshots Reference**

- To view real screenshots of the application, visit
  the <a href="#screenshots">📸 Screenshots</a> section.

---

## <a id="api-documentation">📄 API Documentation</a>

The backend is documented using **Swagger UI**, which
provides an interactive interface to explore and test API
endpoints.

Once the Spring Boot application is running, you can access
the documentation at:

🔗 [Swagger UI](http://localhost:8080/swagger-ui/index.html)

---

## <a id="author">👨‍💻 Author</a>

**Elad Reuveny**  
📧 [eladre123@gmail.com](mailto:eladre123@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/eladreuveny/)  
🌐 [Portfolio](https://eladreuveny-portfolio.netlify.app/)

© Electronics Store App — All rights reserved.
