const { Schema, model } = require("mongoose");
//username, password, email, location, description, skills, contact
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const freelancerSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: String,

  skills: {
    type: Array,
    // enum: [
    //   "Junior Front End Developer",
    //   "Front End Developer",
    //   "Junior Full Stack Developer",
    //   "Full Stack Developer",
    //   "Back End Developer",
    //   "Junior IT Security Engineer",
    //   "IT Security Engineer",
    //   "Junior UX/UI Designer",
    //   "UX/UI Designer",
    // ],
  },

  contact: {
    type: String,
    required: true,
  },
});

const Freelancer = model("Freelancer", freelancerSchema);

module.exports = Freelancer;
