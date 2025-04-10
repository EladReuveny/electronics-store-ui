# 🛍️ Electronics E-Commerce Application

An advanced Full - Stack web application for an electronics store built with **Spring Boot**, **React**, **PostgreSQL**, and more. This application supports both user and admin roles and provides a complete shopping experience, including authentication, product browsing, cart, wishlist, orders management and tracking, and administrative product control.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Setup Instructions](#setup-instructions)
- [User Guide](#user-guide)
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
## <a id="screenshots">📸 Screenshots</a>

### 👤 User View

- **Login Page**  
  ![Login](https://imgur.com/rSwqtG5.png)

- **Register Page**  
  ![Register](https://imgur.com/VKMJOyE.png)

- **Forgot Password**  
  ![Forgot Password](https://imgur.com/8VDg97T.png)

- **Products (User View)**  
  ![Products (User)](https://imgur.com/Huh87b4.png)

- **Products (User View | Light Mode)**  
  ![Products (User)](https://imgur.com/pVodGe8.png)

- **Categories (For Example, Smart Phones)**  
  ![Categories](https://imgur.com/ZpHherX.png)

- **Product Details**  
  ![Product Details](https://imgur.com/xRkTkJb.png)

- **Search Bar (with Filters)**  
  ![Search Filters](https://imgur.com/k0tlAnm.png)

- **Wishlist**  
  ![Wishlist](https://imgur.com/LmMJ0Iw.png)

- **Cart**  
  ![Cart](https://imgur.com/EeA6RWQ.png)

- **Orders (User View)**  
  ![User Orders](https://imgur.com/izqVsDC.png)

- **Order Details**  
  ![Order Details](https://imgur.com/Lwu45FW.png)

- **Profile (Settings)**  
  ![Profile Settings](https://imgur.com/v55S6YC.png)

### 🛠️ Admin View

- **Products (Admin View)**  
  ![Admin Products](https://imgur.com/hWa2Fbs.png)

- **Products (Admin View | Light Mode)**  
  ![Admin Products](https://imgur.com/8ylV500.png)

- **Add New Product (Admin)**  
  ![Add Product](https://imgur.com/eDTxUE5.png)

- **Product Details (Admin View)**  
  ![Add Product](https://imgur.com/am3Ks3G.png)

- **Edit Product (Admin)**  
  ![Add Product](https://imgur.com/y1FRtsO.png)

- **Orders (Admin View)**  
  ![Admin Orders](https://imgur.com/SNUIqB4.png)

  - **Order Details (Admin View)**  
    ![Order Details](https://imgur.com/lkMJoYc.png)

- **View All Orders (XML Format)**  
  ![XML Orders](https://imgur.com/OZIsEQG.png)

👉 [**View All Screenshots in Gallery**](https://imgur.com/a/CvkAFHJ)

---

## <a id="demo">🎥 Demo</a>

🚀 **Live Demo**  
 You can view the live demo of the application at: [https://electronics-store-app.netlify.app/](https://electronics-store-app.netlify.app/)

---

## <a id="setup-instructions">🛠️ Setup Instructions</a>

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

---

## <a id="user-guide">📘 User Guide</a>

---

**📘 User Guide (Functional Description)**

**👤 User Flow**

1. **Register / Login**

   - Navigate to the home page.
   - Click Register to create a new account or Login if you already have one.
   - You can use Forgot Password to retrieve your password via email, address and phone number.

2. **Browsing Products**

   - Users are allowed to view products without having an account.
   - View all available products categorized by type (e.g., Smart Phones, Laptops, Tablets, Tv's).
   - Use the Search Bar to find specific items.
   - Apply Filters to narrow down products by price or hide out-of-stock items.

3. **Product Details**

   - Click on any product to view detailed information, such as:
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
   - Cancel an Order: If the order was placed within a specified time after checkout, you can choose to cancel the order directly from the order details page.

7. **Profile Settings**
   - Accessible via the top navigation bar.
   - Update your email, password, address and phone number.
   - Modifying application's appearance settings, such as display preferences.

🛠️ **Admin Flow**

1. **Login**

   - Admins must log in with admin credentials.

2. **Manage Products**

   - View all products.
   - Add new products and edit/delete existing ones.

3. **Managing and Tracking Orders**

   - Access the Orders page to view all the orders.
   - Option to view orders in XML format for export or integration.
   - Option to modify order's status as needed (e.g., "Pending", "Packaging", "Shipped", "Delivered", "Canceled").

🖼️ **Screenshots Reference**

- To view real screenshots of the application, visit the <a href="#screenshots">📸 Screenshots</a> section.

---

## <a id="author">👨‍💻 Author</a>

**Elad Reuveny**  
📧 [eladre123@gmail.com](mailto:eladre123@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/eladreuveny/)  
🌐 [Portfolio](https://eladreuveny-portfolio.netlify.app/)

© Electronics Store App — All rights reserved.