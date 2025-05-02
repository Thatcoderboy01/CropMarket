## 🌾 CropMarket

**CropMarket** is a role-based crop trading platform designed to connect farmers, retailers, and admins efficiently. It enables secure listing, browsing, and purchasing of agricultural products.

  ### 🧪 Usage Flow (with screenshots)
  
1. **Home Page** -
   Welcome to CropMarket, your one-stop solution for farmers and retailers to connect, communicate, and trade crops efficiently.
   
![1](https://github.com/user-attachments/assets/08a3fcdb-b841-42d2-8f4c-6ae9b36b2d96)

2. **Market Prices Analysis** -
   Get real-time data and smart insights into current market prices to help farmers and retailers make informed decisions
   
![2](https://github.com/user-attachments/assets/86a37642-3674-4ed8-a278-1100de247fdc)

3. **About section** -
   CropMarket is a web-based platform that bridges the gap between farmers and retailers by enabling transparent crop transactions, real-time chatting, and smart request handling.
   
![3](https://github.com/user-attachments/assets/a95fa323-cbb3-403d-9ea8-bd626db5b83b)

4. **How It Works**
   
   * Farmers add crop details via a form.
   * Retailers view crops and send requests.
   * Farmers accept or reject the requests.
   * Admin manages policies and users via dashboard.


![4](https://github.com/user-attachments/assets/4b455532-f8fd-4454-a027-1f16b9c1c87c)

5. **Why Choose CropMarket**
   
    * Real-time Chat Feature✅
    * Role-based Dashboards✅
    * Easy Crop Management✅
    * Secure and Scalable Architecture✅
    * Admin-Level Control & Analytics✅
  

![5](https://github.com/user-attachments/assets/a77ac8ff-abe0-457b-bdbe-d6e4708d65ac)

6. **Login Page** -
   Secure login using JWT authentication for all roles – Farmers, Retailers, and Admins.

![6](https://github.com/user-attachments/assets/79907a57-fdd2-4a0d-b577-1c7b276bf178)

7. **User Registration** -
   New users can register as either Farmer or Retailer and get instant access to their respective dashboards.

![7](https://github.com/user-attachments/assets/bf30c530-5fdc-40a4-aef6-a192d6e55cee)

8. **Admin Panel - User Management** -
   Manage all users, set policy rules, block/unblock accounts, and monitor system activities with real-time analytics.

![8](https://github.com/user-attachments/assets/4172ad34-f0b5-4f1f-af5e-8d9584c86777)

9. **Retailers dashboard** -
   Retailers can browse available crops, send requests to farmers, set price ranges, and chat directly for negotiation.

![9](https://github.com/user-attachments/assets/e82e086b-f689-4b9e-9b17-f1c0e6a87ebe)


10. **Farmer Dashboard (Crop Management and View)** -
    Farmers can manage their crops, add new crops using a form modal, view requests from retailers, and respond instantly.



![10](https://github.com/user-attachments/assets/900082b0-db50-4ccc-9202-d08c8aa8ca4f)

11. **Add Crop Form** -
     A clean and simple modal form that allows farmers to add crop name, type, quantity, and location using lat-long coordinates.

![11](https://github.com/user-attachments/assets/e6de2828-7f23-421e-959e-2aff16c7a38d)


### 🚀 Features

* Role-based login: Admin, Farmer (Seller), Retailers
* Crop listing with image, price, and quantity
* Purchase workflow for Retailers
* Admin panel to manage users and crops
* Real-time chat famers and reatiler each other.
* Real-time feedback with clean UI

---

### 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js, socket.io
* **Database:** MySQL with Prisma ORM
* **Authentication:** JWT-based login with RBAC

---


### 📁. Folder Structure

#### 🔙 Backend

```bash
📦 backend  
┣ 📂controllers          # All route handlers (e.g., docController.js)  
┣ 📂routes               # API route files (e.g., cropRoutes.js, authRoutes.js)  
┣ 📂middleware           # Custom middlewares (e.g., uploadMiddleware.js, auth.js)  
┣ 📂utils                # Utility functions (e.g., simplifyText.js)  
┣ 📂uploads              # (Optional) For file uploads (not used in-memory setup)  
┣ 📂models               # (Optional) Prisma models or schema definitions  
┣ 📜App.js            # Main Express server setup  
```

#### 🖥️ Frontend

```bash
📦 frontend  
┣ 📂components           # Reusable React components (e.g., AddCropModal.jsx, ChatBox.jsx)  
┣ 📂pages                # Main route-based pages (e.g., Home.jsx, Login.jsx)  
┣ 📂assets               # Images, icons, and static assets  
┣ 📜main.jsx             # Entry point for Vite React App  
┣ 📜App.jsx              # Central component that includes routes and layout  
```


### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cropmarket.git
cd cropmarket

# Backend setup
cd backend
npm install
cp .env.example .env  # Add DB and JWT credentials
npx prisma migrate dev
node src/app.js

# Frontend setup
cd ../frontend
npm install
npm run dev
```

---



