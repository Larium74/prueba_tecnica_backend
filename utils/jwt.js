import jwt from "jsonwebtoken";
import { ACCOUNT_SECRET } from "../config.js";

export let generarToken = (cuenta) => {
    return jwt.sign(cuenta, ACCOUNT_SECRET, { expiresIn: "5m" });
    
};

export let verificarToken = (req, res, next) => {
    let tokenAcceso = req.headers["authorization"];
    if (!tokenAcceso) {
        return res.json({ mensaje: "No tienes un token de acceso" });
    } else {
        jwt.verify(tokenAcceso, ACCOUNT_SECRET, (error, user) => {
            if (error) {
                return res.json({ mensaje: "El token ha expirado o ha sido denegado " + error });
            } else {
                req.user = user; // Opcional: agrega el usuario decodificado al objeto req
                next();
            }
        });
    }
};