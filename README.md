## 🌾 CropMarket

**CropMarket** is a role-based crop trading platform designed to connect farmers, retailers, and admins efficiently. It enables secure listing, browsing, and purchasing of agricultural products.

  ### 🧪 Usage Flow (with screenshots)
  
1. **Login Page**
   Users can log in based on role.
   
![1](https://github.com/user-attachments/assets/08a3fcdb-b841-42d2-8f4c-6ae9b36b2d96)

2. **Dashboard After Login**
   Based on the user role, the dashboard adapts.
   
![2](https://github.com/user-attachments/assets/86a37642-3674-4ed8-a278-1100de247fdc)

3. **Crop Listings (Buyer View)**
   Buyers can browse available crops with details.
   
![3](https://github.com/user-attachments/assets/a95fa323-cbb3-403d-9ea8-bd626db5b83b)

4. **Crop Management (Seller View)**
   Sellers can add or manage their own crops.

![4](https://github.com/user-attachments/assets/4b455532-f8fd-4454-a027-1f16b9c1c87c)

5. **Add Crop Form**
   A simple form to add a new crop to the marketplace.

![5](https://github.com/user-attachments/assets/a77ac8ff-abe0-457b-bdbe-d6e4708d65ac)

6. **Purchase Confirmation**
   Buyers can confirm their crop purchases.

![6](https://github.com/user-attachments/assets/79907a57-fdd2-4a0d-b577-1c7b276bf178)

7. **Admin Panel - User Management**
   Admins can see and manage all users.

![7](https://github.com/user-attachments/assets/bf30c530-5fdc-40a4-aef6-a192d6e55cee)

8. **Admin Panel - Crop Overview**
   Admin overview of all crops listed.

![8](https://github.com/user-attachments/assets/4172ad34-f0b5-4f1f-af5e-8d9584c86777)

9. **User Registration**
   New users can register with appropriate roles.

![9](https://github.com/user-attachments/assets/e82e086b-f689-4b9e-9b17-f1c0e6a87ebe)

10. **Seller Crop History**
    View previous listings and updates.

![10](https://github.com/user-attachments/assets/900082b0-db50-4ccc-9202-d08c8aa8ca4f)

11. **Error or Notification Handling**
    Clear feedback on actions and errors.

![11](https://github.com/user-attachments/assets/e6de2828-7f23-421e-959e-2aff16c7a38d)


### 🚀 Features

* Role-based login: Admin, Farmer (Seller), Retailers
* Crop listing with image, price, and quantity
* Purchase workflow for Retailers
* Admin panel to manage users and crops
* Real-time feedback with clean UI

---

### 🛠 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MySQL with Prisma ORM
* **Authentication:** JWT-based login with RBAC

---

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



