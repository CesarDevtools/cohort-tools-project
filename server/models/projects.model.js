const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	_id: {
		type: Number,
		required: true,
		unique: true,
	},
	inProgress: {
		type: Boolean,
		default: false,
	},
	format: String,
	cohortSlug: String,
	cohortName: String,
	program: String,
	campus: String,
	startDate: Date,
	endDate: Date,
	programManager: String,
	leadTeacher: String,
	totalHours: Number,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
