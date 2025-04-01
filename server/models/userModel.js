const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		name: { type: String, require: true },
		username: { type: String, required: true, unique: true, sparse: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["Teacher", "Student"], default: "Student" },
		
	},
	{ timestamps: true }
);



// Static signup method
userSchema.statics.signup = async function (name, username, email, password, role) {

	
	const existUser = await this.findOne({ username });

	if (existUser) {
		throw new Error("Username is already taken");
	}
	
	const existEmail = await this.findOne({ email });

	if (existEmail) {
		throw new Error("Email already in use");
	}

	//validate
	if (!name || !username || !email || !password || !role) {
		throw Error("All fields must be filled");
	}
	if (email.length < 12) {
		throw Error("Email must be at least 12 characters");
	}
	if (password.length < 8) {
		throw new Error("Password must be at least 8 characters long");
	}
	if (!/\d/.test(password)) {
		throw new Error("Password must contain at least one number");
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		throw new Error("Password must contain at least one symbol");
	}

	// Hashing password for the new account
	const salt = await bcrypt.genSalt(15);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({name, username, email, password: hash, role});

	return user;
};




// Static login method
userSchema.statics.login = async function (username, password) {
	if (!username || !password) {
		throw Error("All fields must be filled");
	}

	const user = await this.findOne({ username });

	if (!user) {
		throw new Error("Incorrect user"); 
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error("Incorrect password");
	}

	return user;
};


// Static forgotPassword method
userSchema.statics.forgotPassword = async function (username, email, newPassword, confirmPassword) {
    if (!username || !email || !newPassword || !confirmPassword) {
        throw new Error("All fields must be filled");
    }

    if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const user = await this.findOne({ username, email });

    if (!user) {
        throw new Error("User not found");
    }


	if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    if (!/\d/.test(newPassword)) {
        throw new Error("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        throw new Error("Password must contain at least one symbol");
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(newPassword, salt);


    user.password = hash;
    await user.save();

    return user; 
};


const User = mongoose.model("User", userSchema);

module.exports = User;
