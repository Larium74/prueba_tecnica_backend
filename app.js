import express from "express"
import cors from "cors"
import { comprobar_conexiondb } from "./database/connection.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import tareasRouter from "./routes/tareas.routes.js"

let app = express ()


app.use (express.json ())
app.use (express.urlencoded ({extended: false}))
app.use (cors ())
app.use (usuariosRouter)
app.use (tareasRouter)

comprobar_conexiondb ()

export default app;