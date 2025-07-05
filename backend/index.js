const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT;
require("./ConnectDb")


// const loginRoutes = require("./routes/loginRoutes");
const loginRouter = require("./routes/LoginRoute")
const EmpRouter = require("./routes/EmployeeRoute")
const multerimage = require('./routes/Uploadimg')

app.use(express.static(path.join(__dirname, 'uploads')))
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Hello Arjun");
});

// app.use('/login', loginRoutes); 
app.use("/api", loginRouter)

app.use("/emp", EmpRouter)
app.use('/file', multerimage)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




