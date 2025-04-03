const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller")


// router.route("/").get(adminController.home);

// for admin signup
router.route("/register").post(adminController.resgister);

// for admin login
router.route("/login").post(adminController.login);

// to find all the admin user
router.route("/users").get(adminController.allAdminUser);

// delete the admin user
router.route("/delete-adminUser/:id").delete(adminController.deleteAdminUser);

// delete the user(Alumni)
router.route("/delete-user/:id").delete(adminController.deleteUser);

// get user from url(_id)
router.route("/get-user/:id").get(adminController.getUser);

// update the user(Alumni)
router.route("/user-update/:id").put(adminController.updateUser);

// approve the Alumni user
router.route("/approve-user/:id").put(adminController.approvedUser)

// reject the Alumni user
router.route("/reject-user/:id").delete(adminController.rejectedUser)

module.exports = router;