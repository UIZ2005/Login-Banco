const session= require("express-session");
const express = require ("express"); // con esto se inicializa el server en node.js
// express coneca al servidor
const app = express(); // encender el server en nuestra app
const path = require("path");

const { error } = require("console");
const dotenv = require("dotenv");


dotenv.config({path : "./.env"});

//importamos nuestro templates de hbs
app.set ("view engine", "hbs");

//usamos path para indicar la ubiacion de la carpeta public
const publicDirectory = path.join(__dirname, "./public");
app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:60*60*1000,
        httpOnly:false
    }
}));
//le decimos a note que utilice los recursos estaticos de la carpeta public
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
    console.log("Servidor Iniciado en el puerto 5000");
})