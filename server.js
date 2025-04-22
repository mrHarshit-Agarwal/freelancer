const express = require("express");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const companyRoutes = require("./Routes/companyRoutes");
const companyDetailsRoutes = require("./Routes/companyDetailsRoutes");
const freelancerInviteRoutes = require("./Routes/freelancerInviteRoutes");
const freelancerDetailsRoutes = require("./Routes/freelanceDetailsRoutes");
const uploadRoutes = require("./Routes/uploadRoutes");
const freelancerRoutes = require('./Routes/freelancerRoutes');
const aboutRoutes = require('./Routes/aboutRoutes');
const blogRoutes = require('./Routes/blogRoutes');
const blogDetailRoutes = require('./Routes/blogDetailRoutes');
const homeRoutes = require('./Routes/homeRoutes');

require("dotenv").config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set('layout', 'fonts/layouts/master'); // layout path
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views")); // important
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Main user auth routes (login/signup etc.)
app.use("/", userRoutes, contactRoutes, companyRoutes, companyDetailsRoutes, freelancerInviteRoutes, freelancerDetailsRoutes,
   uploadRoutes, freelancerRoutes, aboutRoutes, blogRoutes, blogDetailRoutes, homeRoutes );


// Route to render fonts/service.ejs
app.get("/service", (req, res) => {
  res.render("fonts/service", {
    title: "Service Page"
  });
});

// Static HTML Page Route
app.get("/message", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "message.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
