import express from 'express';
import productRouter from './routers/products'
import { connectDB } from './config/db';
import dotenv from "dotenv";
import morgan from 'morgan';
import authRouter from "./routers/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import homeRouter from "./routers/home.js";
import logoutRouter from "./routers/logout.js";


dotenv.config();

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(morgan("tiny"));

app
.set('View', './views')
.set('view engine', 'ejs')
.use(express.static('./public'));


//Session
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "defaultSecretKey", // Bí mật cho session
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI, // Kết nối đến MongoDB
        collectionName: "sessions", // Tên collection lưu session
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Cookie sống trong 1 ngày
    },
});
app.use(sessionMiddleware);

//connect db
connectDB(process.env.DB_URI);

//routes
app.use('/api', productRouter);
app.use('/auth', authRouter);
app.use("/", logoutRouter);
// app.use("/", updateRouter);

//dang ky
app.get("/signup", (req, res) => {
    res.render("signup", { errors: [] });
});
//dang nhap
app.get("/", (req, res) => {
    const message = req.query.message || "";
    res.render("signin", { message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

app.use("/", homeRouter);

export const viteNodeApp = app;