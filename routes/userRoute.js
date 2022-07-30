const { login, register, setAvatar, getAllUsers, logout } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logout);

module.exports = router;
