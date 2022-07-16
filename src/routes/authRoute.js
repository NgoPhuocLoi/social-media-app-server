const router = require("express").Router();
const app = require("../app");
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
