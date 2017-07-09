const Sequelize = require("sequelize");
const sql = require("../util/sql.js");
const Photos = require("./photos.js");
const Comments = require("./comments.js");
const Jimp = require("jimp"); // An image processing library for Node written entirely in JavaScript
const bcrypt = require("bcrypt"); // Password hashing
const fs = require("fs-extra"); // Adds extra file system methods
const bodyParser = require('body-parser');

const Users = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
	},
	password: {
		type: Sequelize.STRING(500),
		notNull: true,
	},
});

Users.signup = function(req) {
	return Users.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then(function(user) {
		req.session.userid = user.id;
		return user;
	});
};

// Users.hasMany(Photos);
// Users.hasMany(Comments);

module.exports = Users;
