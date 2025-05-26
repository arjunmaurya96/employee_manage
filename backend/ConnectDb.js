const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        mongoose.connect("mongodb://0.0.0.0:27017/interview")
        console.log("Database Connected Successfully...!");
    } catch (error) {
        console.log(error);
        console.log("Database is Not Connected ....? ");
    }
}
dbConnect();  