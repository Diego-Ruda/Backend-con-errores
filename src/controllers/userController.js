const User = require("../models/User");

async function registerUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    const response = user.toObject();
    delete response.password;
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
}

async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, listUsers, getUser };
