const User = require("../database/models/userModel");
const Account = require("../database/models/userAccount");
const Operation = require("../database/models/userOperation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendConfirmationEmail} = require ("../services/emailService");

module.exports.createUser = async (serviceData) => {
	try {
		const user = await User.findOne({ email: serviceData.email });
		if (user) {
			throw new Error("Email already exists");
		}

		const hashPassword = await bcrypt.hash(serviceData.password, 12);

		const newUser = new User({
			confirmed: false,
			email: serviceData.email,
			password: hashPassword,
			firstName: serviceData.firstName,
			lastName: serviceData.lastName,
			userName: serviceData.userName,
			role: serviceData.role,
		});
    await sendConfirmationEmail(newUser.email, newUser._id);
		let result = await newUser.save();

		return result;
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.getUserProfile = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const user = await User.findOne({ _id: decodedJwtToken.id });

		if (!user) {
			throw new Error("User not found!");
		}

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.loginUser = async (serviceData) => {
	try {
		const user = await User.findOne({ email: serviceData.email });

		if (!user) {
			throw new Error("User not found!");
		}
		
		if (!user.confirmed) {
			throw new Error("User not confirmed");
		}

		const isValid = await bcrypt.compare(
			serviceData.password,
			user.password
		);


		if (!isValid) {
			throw new Error("Password is invalid");
		}

		const token = jwt.sign(
			{ id: user._id },
			process.env.SECRET_KEY || "default-secret-key",
			{ expiresIn: "1d" }
		);

		return { token };
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.updateUserProfile = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const user = await User.findOneAndUpdate(
			{ _id: decodedJwtToken.id },
			{
				userName: serviceData.body.userName,
			},
			{ new: true }
		);

		if (!user) {
			throw new Error("User not found!");
		}

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.addAccount = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const newAccount = new Account({
			name: serviceData.body.name,
			nbAccount: serviceData.body.nbAccount,
			solde: serviceData.body.solde,
			visible: serviceData.body.visible,
			operations: [],
		});
		const user = await User.findByIdAndUpdate(
			userId,
			{ $push: { account: newAccount } },
			{ new: true }
		);

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.addOperation = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const idAccount = serviceData.headers.idaccount;
		const user = await User.findById(userId);
		const newOperation = new Operation({
			date: serviceData.body.date,
			title: serviceData.body.title,
			description: serviceData.body.description,
			montant: serviceData.body.montant,
		});

		const accountIndex = user.account.findIndex(
			(data) => data.id === idAccount
		);

		const solde = Number(user.account[accountIndex].solde);
		const montant = Number(serviceData.body.montant);

		user.account[accountIndex].operations.push(newOperation);
		user.account[accountIndex].solde = solde + montant;

		await user.save();
		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.updateDescription = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const accountId = serviceData.headers.idaccount;
		const operationId = serviceData.headers.operationid;
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		const accountIndex = user.account.findIndex(
			(data) => data.id === accountId
		);

		if (accountIndex === -1) {
			throw new Error("Account not found");
		}

		const operationIndex = user.account[accountIndex].operations.findIndex(
			(data) => data.id === operationId
		);

		if (operationIndex === -1) {
			throw new Error("Operation not found");
		}

		user.account[accountIndex].operations[operationIndex].description =
			serviceData.body.description;

		await user.save();

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.getAllProfile = async (serviceData) => {
	try {
		const idAdmin = serviceData.headers.id;
		const Admin = await User.findOne({ _id: idAdmin, role: "admin" });
		if (Admin) {
			const users = await User.find();
			return users.map((user) => user.toObject());
		}

		if (!users || users.length === 0) {
			throw new Error("Aucun utilisateur trouvé!");
		}
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};

module.exports.closeAccount = async (serviceData) => {
	try {
		const jwtToken = serviceData.headers.authorization
			.split("Bearer")[1]
			.trim();
		const decodedJwtToken = jwt.decode(jwtToken);
		const userId = serviceData.headers.id;
		const idAccount = serviceData.headers.idaccount;
		const user = await User.findById(userId);
		const accountIndex = user.account.findIndex(
			(data) => data.id === idAccount
		);
		
		user.account[accountIndex].visible = false;

		await user.save();

		return user.toObject();
	} catch (error) {
		console.error("Error in userService.js", error);
		throw new Error(error);
	}
};
