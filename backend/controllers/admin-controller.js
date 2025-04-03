const mongoose = require("mongoose");
const AdminUser = require("../models/admin-schema");
const DetailsUser = require("../models/userForm-schema");
const bcrypt = require("bcryptjs");

// register
const resgister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await AdminUser.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "user alreday exist!" });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await AdminUser.create({ username, email, password: hashPassword });
    console.log("our new user", newUser);
    return res.status(200).json({
      msg: "registration successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    return res.status(400).json({ msg: "error from registration" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExist = await AdminUser.findOne({ email });

    if (!emailExist) {
      return res.status(400).json({ msg: "User is not exist" });
    }

    const user = await bcrypt.compare(password, emailExist.password);

    if (user) {
      res.status(200).json({
        message: "Login successful",
        token: await emailExist.generateToken(),
        userId: emailExist._id.toString(),
      });
    } else {
      res.status(400).json({ message: "invalid email or password" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

// find all the admin user
const allAdminUser = async (req, res) => {
  try {
    const findAllAdminUser = await AdminUser.find({}, { password: 0 });
    console.log("users found successfully");
    return res.status(200).json({ msg: findAllAdminUser });
  } catch (error) {
    return res.status(400).json({ msg: "not found! Problem occur" });
  }
};

// delete user functionalities
const deleteAdminUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDeletion = await AdminUser.deleteOne({ _id: id });
    console.log("user deleted successfully");
    return res.status(200).json({ msg: "deleted successfully", userDeletion });
  } catch (error) {
    return res.status(400).json({ msg: "can't delete the user" });
  }
};

// delete user functionalities
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDeletion = await DetailsUser.deleteOne({ _id: id });
    console.log("user deleted successfully");
    return res.status(200).json({ msg: "deleted successfully", userDeletion });
  } catch (error) {
    return res.status(400).json({ msg: "can't delete the user" });
  }
};

// get user data from url
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userFromURL = await DetailsUser.findOne({ _id: id });
    console.log(userFromURL);
    return res.status(200).json({ msg: "user found", userFromURL });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "user not found from url" });
  }
};

// update the user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID format" });
    }

    const existingUser = await DetailsUser.findById(id);
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(id);
    const updateUserData = req.body;
    console.log("Update data received:", updateUserData); // Debugging log

    const updatedUser = await DetailsUser.findByIdAndUpdate(
      id,
      { $set: updateUserData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found after update attempt" });
    }

    console.log("Updated user:", updatedUser);
    return res.status(200).json({ msg: "Updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// user approval
const approvedUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await DetailsUser.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // return res.status(200).json({msg:"user found"});
    user.status = "approved";
    await user.save();
    // console.log(user);
    return res.status(200).json({
      "user":user,
      message: "User approved successfully",
    });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User Rejection And Delete
const rejectedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDeletion = await DetailsUser.deleteOne({ _id: id });
    console.log("user deleted successfully");
    return res.status(200).json({ msg: "User Rejected successfully", userDeletion });
  } catch (error) {
    return res.status(400).json({ msg: "can't delete the user" });
  }
};

module.exports = { resgister, login, allAdminUser, deleteUser, getUser, updateUser, deleteAdminUser, approvedUser, rejectedUser };
