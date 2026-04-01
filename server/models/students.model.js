const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	_id: Number,
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
		lowercase: true,
		trim: true,
		match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un correo válido"],
	},
	phone: String,
	linkedinUrl: String,
	languages: [String],
	program: String,
	background: String,
	image: String,
	cohort: Number,
	projects: [{ type: mongoose.Schema.Types.Number, ref: "Project" }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
