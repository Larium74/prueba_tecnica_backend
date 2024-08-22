import {Router} from "express"
import {registrar_clientes, login_usuario} from "../controllers/usuarios.controllers.js"
import { test } from "../controllers/tareas.controllers.js"


let usuariosRouter = Router ()


usuariosRouter.post ("/registro", registrar_clientes)
usuariosRouter.post ("/login", login_usuario)

usuariosRouter.get ("/test", test)

export default usuariosRouter;