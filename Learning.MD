# Backend 
. Node.js (runtime)
. Express.js (server framework)
. MongoDB (database)
. Mongoose (MongoDB ORM)
. JWT (authentication tokens)
. bcryptjs (password hashing)

## setup

```npm init -y```
***dependencies***
```npm install express mongoose bcryptjs jsonwebtoken dotenv cors```
```npm install -D nodemon```
-express → backend server
-mongoose → connect MongoDB // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
-bcryptjs → hash passwords
-jsonwebtoken → authentication tokens
-dotenv → environment variables (like DB URI)
-cors → allow frontend to call backend
-nodemon → auto restart server on code changes

## Mongoose vs mongodb curd

| Operation         | MongoDB (Shell)                                                             | Mongoose (Node.js)                                                                                                               |
| ----------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Create**        | `db.users.insertOne({ name: "John", age: 25 });`                            | `await User.create({ name: "John", age: 25 }); const user = new User({ name: "John", age: 25 }); await user.save();`             |
| **Read (all)**    | `db.users.find({ age: { $gt: 20 } });`                                      | `await User.find({ age: { $gt: 20 } });`                                                                                         |
| **Read (one)**    | `db.users.findOne({ name: "John" });`                                       | `await User.findOne({ name: "John" }); await User.findById("64e123abc...");`                                                     |
| **Update (one)**  | `db.users.updateOne({ name: "John" }, { $set: { age: 30 } });`              | `await User.updateOne({ name: "John" }, { age: 30 }); await User.findByIdAndUpdate("64e123abc...", { age: 35 }, { new: true });` |
| **Update (many)** | `db.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } });` | `await User.updateMany({ age: { $lt: 18 } }, { status: "minor" });`                                                              |
| **Delete (one)**  | `db.users.deleteOne({ name: "John" });`                                     | `await User.deleteOne({ name: "John" }); await User.findByIdAndDelete("64e123abc...");`    |

| **Delete (many)** | `db.users.deleteMany({ inactive: true });`                                  | `await User.deleteMany({ inactive: true });`                                                                                     |
                                                                |
                                                                                                   |

| Middleware                | Type                   | Where Used                          | Purpose                                                                | Calls `next()`?                                       |
| ------------------------- | ---------------------- | ----------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| `express.json()`          | Built-in               | `app.use(express.json())`           | Parses incoming JSON requests → makes `req.body` available.            | ✅ Always                                              |
| `cookieParser()`          | Third-party            | `app.use(cookieParser())`           | Parses cookies → makes `req.cookies` available.                        | ✅ Always                                              |
| `cors()`                  | Third-party            | `app.use(cors(...))`                | Allows frontend (`5173`) to call backend (`5000`) without CORS errors. | ✅ Always                                              |
| `protect`                 | Custom                 | `router.get('/me', protect, getMe)` | Checks JWT, finds user, attaches `req.user`. Stops request if invalid. | ✅ If valid, ❌ If invalid                              |
| `getMe`, `getTasks`, etc. | Custom (Route handler) | In your controllers                 | Final handlers → send the response back to client.                     | ❌ (because they end the request with `res.json(...)`) |


[Client Request: GET /api/auth/me with token]

   |
   v
server.js (express.json, cookieParser, cors)
   |
   v
routes/auth.js --> /me route
   |
   v
protect middleware
   - verify token
   - find user
   - req.user = user
   - next()
   |
   v
getMe controller
   - read req.user
   - send response {id, name, email}
   |
   v
Response back to client


# Frontend 
