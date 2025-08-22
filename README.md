# 🚗 Borrow Wheelz – Car Rental Application  

Borrow Wheelz is a **MERN stack** car rental application that allows users to rent cars while giving superadmins the ability to manage rentals and car listings.  

---

## 🛠 Tech Stack  
- **Frontend (User):** React.js (`borrowwheelz`)  
- **Frontend (Super Admin):** React.js (`borrowwheelz_superadmin`)  
- **Backend API:** Node.js, Express.js (`borrowwheelz_backend`)  
- **Database:** MongoDB  

---

## 🔑 Workflow  

### 1. User Registration  
- A user can register and log in.  
- User data is stored in **MongoDB**.  

### 2. Super Admin Setup  
- After registering, open MongoDB (usually running at `localhost:5173` or `5174`).  
- Update the registered user’s role to **`superadmin`**.  
- Only superadmins can **add cars** to the system, which will then be visible to all users.  

### 3. User Dashboard (`borrowwheelz`)  
- Shows all the cars rented by the logged-in user.  
- Displays booking history and notes.  

### 4. Super Admin Dashboard (`borrowwheelz_superadmin`)  
- Can view **all rental requests**.  
- Has the ability to **accept/reject rental requests**.  

### 5. About Us  
- Currently accessible only in the **superadmin folder**.  
- Will be extended to normal users in future updates.  

---

## 📡 Backend & API (`borrowwheelz_backend`)  
- APIs are set up and managed using **Express.js**.  
- Data flow has been tested and verified.  

---

## ⚙️ Setup Instructions  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/borrow-wheelz.git
cd borrow-wheelz
```

---

### 2. Backend Setup (`borrowwheelz_backend`)  
```bash
cd borrowwheelz_backend
npm install
```

- Create a `.env` file inside `borrowwheelz_backend/` and add:  
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  PORT=5000
  ```
- Run backend server:  
  ```bash
  npm run dev
  ```

---

### 3. User Frontend Setup (`borrowwheelz`)  
```bash
cd borrowwheelz
npm install
```
- Run user frontend:  
  ```bash
  npm run dev
  ```
- Accessible at:  
  ```
  http://localhost:5173
  ```

---

### 4. Super Admin Frontend Setup (`borrowwheelz_superadmin`)  
```bash
cd borrowwheelz_superadmin
npm install
```
- Run superadmin frontend:  
  ```bash
  npm run dev
  ```
- Accessible at:  
  ```
  http://localhost:5174
  ```

---

## 🚀 Upcoming Features  
- UI/UX improvements for user & superadmin dashboards.  
- "About Us" page for regular users.  
- More advanced rental management features.  
- Analytics & reporting modules.  

---

## 📸 Screenshots / Demo (Optional)  
_Add screenshots of user dashboard, car rental flow, and superadmin panel here._  

---

## 📌 Notes  
- To enable **car management**, update a registered user’s role to `superadmin` in MongoDB.  
- User and superadmin frontends run on **different ports (5173 & 5174)**.  
- Backend runs on **port 5000 (or configured in `.env`)**.  

---
