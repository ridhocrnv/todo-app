# 📝 Todo App

A simple Todo App built with Node.js, Express, MongoDB, and Mongoose.  
Includes user authentication, todo CRUD, and secure environment handling.

## 🚀 Features

- User registration and login (with hashed passwords)
- Create, read, update, and delete todos
- Todos belong to the logged-in user only
- MongoDB Atlas for cloud database
- Environment variable management with `.env`

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt (password hashing)
- dotenv (environment config)

## 📦 Installation

```bash
git clone https://github.com/username/todo-app.git
cd todo-app
npm install

Create a .env file in the root directory and add:


```

MONGO_URI=your_mongo_uri_here
PORT=3000

```
## ▶️ Run the App

```

npm run dev

```

Visit http://localhost:3000
```

## 🛡️ Note

Make sure you never push your .env file. It's already ignored via .gitignore.
