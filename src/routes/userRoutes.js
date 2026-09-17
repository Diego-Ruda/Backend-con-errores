const express = require("express");
const {
  registerUser,
  listUsers,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(listUsers).post(registerUser);
router.get("/:id", getUser);

module.exports = router;
