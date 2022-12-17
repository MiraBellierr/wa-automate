const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		logging: false,
		dialect: "sqlite",
		storage: "database.sqlite",
	}
);

module.exports = () => {
	const Quiz = sequelize.define("quiz", {
		author: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		score: {
			type: Sequelize.BIGINT,
			defaultValue: 0,
		},
	});

	Quiz.sync();

	return Quiz;
};
