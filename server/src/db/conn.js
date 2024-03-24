const mongooose = require('mongoose')
mongooose.set('strictQuery', false)
require("dotenv").config();

const db = "mongodb+srv://Durgesh:Durgesh%402022@cluster0.69wye6c.mongodb.net/transport";

mongooose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Your Database is Connected")).catch((err) => {
    console.log(err);
})