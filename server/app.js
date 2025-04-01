const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create user session and save it to mongo
const session = require("express-session");
const MongoStore = require("connect-mongo");

const requireAuth = require("./middleware/requireAuth");

const userRoute = require("./routes/user");
const testRoute = require("./routes/question");

const dotenv = require("dotenv");
dotenv.config();

const { connectionTesting } = require("./controllers/testController"); // test route

const app = express();

// middleware
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

const sessionConfig = {
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), 
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: "lax",
		maxAge: 30 * 24 * 60 * 60 * 1000, 
	},
};

// Middleware to set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(session(sessionConfig));

//Use credential on speicfic path
app.use((request, response, next) => {
	if (request.path === "/" || request.path === "/auth/login" || request.path === "/auth/signup" || request.path === "/auth/forgot-password") {
		return next();
	}

	requireAuth(request, response, next);
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Connected to DB and listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});


// Routes
app.use("/", userRoute);
app.use("/teacher-home", testRoute)
