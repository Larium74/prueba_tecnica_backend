import { query } from "express";
import {connectiondb} from "../database/connection.js"
import {enviar_correo} from "../utils/emails.js"
import {generarToken} from "../utils/jwt.js"



export let registrar_clientes = async (req, res) => {
    console.log("Accediendo a la ruta /registro");

    let { Nombres_Usuario, Apellidos_Usuario, Fecha_nacimiento_usuario, Sexo_Usuario, Email_Usuario, Telefono_Usuario } = req.body;

    // Obtener la fecha y hora actual
    let fechaActual = new Date();

    // Formatear la fecha y hora actual en el formato MySQL DATETIME (YYYY-MM-DD HH:MM:SS)
    let Fecha_registro_sistema_Usuario = fechaActual.toISOString().slice(0, 19).replace('T', ' ');

    let campos_tabla_usuarios = [Nombres_Usuario, Apellidos_Usuario, Fecha_nacimiento_usuario, Sexo_Usuario, Email_Usuario, Telefono_Usuario, Fecha_registro_sistema_Usuario];

    try {
        let query_crear_usuario = 'INSERT INTO Usuarios (Nombres_Usuario, Apellidos_Usuario, Fecha_nacimiento, Sexo_Usuario, Email_Usuario, Telefono_Usuario, Fecha_registro_sistema_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
        let estado = await connectiondb.query(query_crear_usuario, campos_tabla_usuarios);
        console.log("El usuario ha sido creado exitosamente " + estado);

        let Contrasenia_Usuario = "todouser";

        try {
            let [data] = await connectiondb.query("SELECT ID_Usuario FROM Usuarios WHERE Nombres_Usuario = ? AND Apellidos_Usuario = ?", [Nombres_Usuario, Apellidos_Usuario]);

            console.log ("Este es el id del usuario "+ JSON.stringify (data[0].ID_Usuario))
            var id_usuario_asociado = data[0].ID_Usuario

        }
        catch (error){
            console.error ("No se ha podido obtener el id del usuario "+error)
        }

        // Envío del correo de nodemailer
        enviar_correo(Email_Usuario, "Correo de bienvenida al SSE", "Qué tengas un gran día.", "El correo de bienvenida ha sido enviado exitosamente");

        try {
            const campos_tbla_cuenta = [id_usuario_asociado, Email_Usuario, Contrasenia_Usuario];
            let query_crear_cuenta = 'INSERT INTO Cuentas (ID_Usuario_Asociado, Email_Usuario, Contrasenia_Usuario) VALUES (?, ?, ?)';
            
            let creacion_cuenta = await connectiondb.query(query_crear_cuenta, campos_tbla_cuenta);
            console.log("La cuenta del usuario " + Email_Usuario + " ha sido creada exitosamente");

        } catch (error) {
            console.error("La cuenta del usuario " + Email_Usuario + " no se ha podido crear " + error);
        }
    } catch (error) {
        console.error("Error al crear al usuario " + error);
    }
}

export let login_usuario = async (req, res) => {
    console.log("Accediendo a la ruta /login");

    const { email, contrasenia } = req.body;
    const campos_verificar_usuario = [email, contrasenia]

    try {
        const query_verificar_existencia_usuario = `SELECT ID_Cuenta FROM cuentas WHERE Email_Usuario = ? AND Contrasenia_Usuario = ?`

        const [data] = await connectiondb.query(query_verificar_existencia_usuario, campos_verificar_usuario);

        if (data.length === 0) {
            console.log("La cuenta no se encuentra registrada. Email: "+email+" y Contraseña: "+contrasenia);
            res.status(404).json({ message: "La cuenta no se encuentra registrada" });
        } else {
            console.log("Cuenta encontrada exitosamente");
            console.log("El usuario es " + JSON.stringify (data));

            let objUsuario = {email: email}
            let tokenAcceso = generarToken (objUsuario)

            res.status (200).json ({mensaje: "Token generado exitosamente", token_acceso: tokenAcceso})

    
            
        

        }
    } catch (error) {
        console.error("El login ha fallado " + error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

