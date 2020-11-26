const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema({
  when: {
    type: Date,
    default: new Date(),
  },
  //this should say how many days post is on our site
  //nice to have
  // duration: {
  //   function() {
  //     return this.when - Date.now();
  //   },
  // },

  author: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  applications: [{ type: Schema.Types.ObjectId, ref: "Freelancer" }],

  name: {
    type: String,
    required: true,
  },

  skillsRequired: [
    {
      type: String,
      enum: [
        "Junior Front End Developer",
        "Front End Developer",
        "Junior Full Stack Developer",
        "Full Stack Developer",
        "Back End Developer",
        "Junior IT Security Engineer",
        "IT Security Engineer",
        "Junior UX/UI Designer",
        "UX/UI Designer",
      ],
      required: true,
    },
  ],

  summary: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  contractType: String,

  salary: String,
});

const Project = model("Project", projectSchema);

module.exports = Project;
