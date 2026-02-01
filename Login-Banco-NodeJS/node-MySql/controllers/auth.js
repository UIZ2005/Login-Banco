const mysql= require("mysql");

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

//db.connect((error) => {

    //validamos si hay algun error
    //if (error){
      //  console.log(error);
    //}else{
    //    console.log("MySql connected to database...")
   // }
//});


exports.login = (req, res) =>{
    console.log(req.body);
    //res.send("Form submited");


    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?", [email], async function (error, results) {
        if(error){
            console.log(error);
        }

        // si en los resultados de correos tenemos por lo menos 1 registro e la dila
        if(results.length >0){
            //console.log(results);
            var data= JSON.parse(JSON.stringify(results));

            //console.log(data[0].name);

            var user_id=data[0].id;
            var user_name=data[0].name;
            var user_email=data[0].email;
            var user_password=data[0].password;

            if(user_email==email && user_password == password){
                console.log("login exitoso!");

                req.session.user={
                    id:user_id,
                    name:user_name,
                    email:user_email
                };

                message="bienvenido:";

                console.log(req.session.user);
                req.session.save(err=>{
                    if(err){
                        console.error("Error saving session:",err);
                    }else{
                        console.log("Sesion guardada con exito");
                    }
                });
                return res.render("login",{message,data_user:req.session.user});
            }

        }else{
            //si no vuelve y se recarga la pagina idex para que vuelva a escribir el corre
            res.render("index",{
                message : "el usuario no existe en la base"
            });
        }
        if(password!=user_password){
            res.render("index",{
                message : "el usuario no existe en la base"});
        }
    });


}
exports.logout =(req,res) =>{

    console.log("session a borrar:",req.session);
    req.session.destroy((err)=>{
        if(err){
            console.error("Error destroying  session:",err);
            return res.status(500).send("Error logging out");
        }
        res.clearCookie("connect.sid")
        res.redirect("/");

    });
}
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // 1) Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            return res.render('register', {
                messageRegister: 'Las contraseñas no coinciden'
            });
        }

        // 2) Verificar que no exista un usuario con ese email
        db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.render('index', { message1: 'Error en el servidor' });
            }
            if (results.length > 0) {
                return res.render('index', { message1: 'El correo ya está registrado' });
            }

            // 3) Insertar el usuario en la base de datos con la contraseña en texto plano
            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],  // Se guarda la contraseña tal cual, sin hashear
                (err2, results2) => {
                    if (err2) {
                        console.error(err2);
                        return res.render('index', { message1: 'Error al crear usuario' });
                    }
                    // 4) Redirigir al login con mensaje de éxito
                    console.log('Registro exitoso:', { id: results2.insertId, email });
                    return res.render('index', { messageRegister: 'Registro exitoso. Por favor, inicia sesión.' });
                }
            );
        });

    } catch (error) {
        console.error(error);
        return res.render('index', { messageRegister: 'Error inesperado' });
    }
};