const userModel = require("../models/userModel");
const mongoose = require("mongoose");

// Get all posts
const getUsers = async (request, response) => {
	try {
		const users = await userModel.find({}).exec();

		response.status(200).json(users);
	} catch (error) {
		response
			.status(500)
			.json({ status: "error", message: "Failed to retrieve posts" });
	}
};


//SIGNIN
const loginUser = async (request, response) => {
	const { username, password } = request.body;

	const user = await userModel.findOne({ username });
	if (!user) {
		return response.status(404).json({ error: "User not found" });
	}

	try {
		const user = await userModel.login(username, password);
		

		request.session.user = { _id: user._id, username: user.username, role: user.role };

		response.status(200).json({message: "Login successful", user: request.session.user});
	} catch (error) {
		response.status(400).json({ error: error.message || "Login failed" });
	}
};



//SIGNUP
const signupUser = async (request, response) => {
	const { name, username, email, password, role } = request.body;

	console.log(
		`- Name: ${name}\n- Username: ${username}\n- Email: ${email}\n- Password: *****\n- Role: ${role}`
	);

	try {
		const user = await userModel.signup(name, username, email, password, role);

		request.session._id = user._id;
		request.session.email = email;
		request.session.role = role;

		response.status(200).json({
			message: `Signed up successfully as ${email} with username ${username}`,
			user: {
				id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		response.status(400).json({
			error: error instanceof Error ? error.message : "An unknown error occurred",
		});
	}
};

//FORGOT PASSWORD
/* const forgotPassword = async (request, response) => {
	const { username, email } = request.body;

	const user = await userModel.findOne({ username: username, email: email });

	if (!user) {
		return response.status(404).json({ error: "User not found" });
	}

	try {
		const resetToken = await userModel.generateResetToken(user._id);
		const resetUrl = `${process.env.FRONTEND_URL}/forgot-password/${resetToken}`;
		const emailContent = `Please click on the following link to reset your password: ${resetUrl
			}`;
		const emailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Password Reset Request",
			text: emailContent,
		};
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: true, 
			auth: {
				user: process.env.EMAIL_FROM,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		await transporter.sendMail(emailOptions);
		return response.status(200).json({
			message: "Password reset link sent to your email"
		});
		
	} catch (error) {
		return response.status(400).json({ error: error.message });

	}
	} */

const forgotPassword = async (request, response) => {
    const { username, email, newPassword, confirmPassword } = request.body;

	try {
		const updatedUser  = await userModel.forgotPassword(username, email, newPassword, confirmPassword);
		response.status(200).json({ message: "Password updated successfully", user: updatedUser  });
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
};

//LOGOUT
const logOutUser = (request, response) => {
	request.session.destroy(() => {
		if (err) {
			return res.status(500).json({ error: "Fail to logout" });
		}
		response.clearCookie("connect.sid");
		response.json({ message: "Logged out" });
	});
};

module.exports = {
	getUsers,
	loginUser,
	signupUser,
	forgotPassword,
	logOutUser
};
