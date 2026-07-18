const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
mongoose.connect("mongodb://127.0.0.1:27017/authDB").then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Authentication Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


