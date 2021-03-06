const { Schema, model } = require("mongoose");

const companySchema = new Schema({
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

  businessSector: String,

  description: String,

  address: {
    type: String,
  },

  contact: {
    type: String,
    required: true,
  },
});

const Company = model("Company", companySchema);

module.exports = Company;
