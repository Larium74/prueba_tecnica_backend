import {Router} from "express"
import {registrar_clientes, login_usuario} from "../controllers/usuarios.controllers.js"


let usuariosRouter = Router ()


usuariosRouter.post ("/registro", registrar_clientes)
usuariosRouter.post ("/login", login_usuario)


export default usuariosRouter;