const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/front/userController");

const router = express.Router();

// Pages

router.get("/register", (req, res) => {
    res.render("fonts/register", {
      title: "Register",
      user: null
    });
  });
  
  // Render Login Page
  router.get("/login", (req, res) => {
    res.render("fonts/login", {
      title: "Login",
      user: null
    });
  });


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
