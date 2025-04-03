const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
});

// Token generation (header, payload, signature)
adminSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        // payload
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },

      process.env.JWT_SECRET_KEY, //signature
      {
        expiresIn: "15d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const AdminUser = new mongoose.model("ADMINUSER", adminSchema);
module.exports = AdminUser;
