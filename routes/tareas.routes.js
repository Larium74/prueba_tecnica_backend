import {Router} from "express"
import { actualizar_tarea, agregar_tarea, eliminar_tarea, mostrar_tareas_usuario } from "../controllers/tareas.controllers.js"

let tareasRouter = Router ()


tareasRouter.get ("/tareas-usuario/:emailU", mostrar_tareas_usuario)
tareasRouter.delete ("/eliminar-tarea/:id_tarea", eliminar_tarea)
tareasRouter.post ("/agregar-tarea/:email_cuenta_asociada", agregar_tarea)
tareasRouter.put ("/actualizar-tarea/:id_tarea", actualizar_tarea)

export default tareasRouter;