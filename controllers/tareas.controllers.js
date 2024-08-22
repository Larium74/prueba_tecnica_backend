import { connectiondb } from "../database/connection.js";

export let mostrar_tareas_usuario = async (req, res) => {
    console.log("Accediendo a la ruta /tareas-usuario");
    const { emailU } = req.params;

    try {
        const query_tareasU = "SELECT * FROM Tareas t INNER JOIN Cuentas c ON t.ID_Cuenta_Asociada = c.ID_Cuenta WHERE c.Email_Usuario = ?";
        let [data] = await connectiondb.query(query_tareasU, [emailU]);

        console.log("Estas son las tareas del usuario " + emailU + ": " + JSON.stringify(data));

        res.status(200).json(data);
    } catch (error) {
        console.error("No se pudieron obtener las tareas del usuario: " + error);
        res.status(500).json({ message: "Error al obtener las tareas del usuario" });
    }
};

export let actualizar_tarea = async (req, res) => {
    console.log("Accediendo a la ruta /actualizar-tarea");
    const { id_tarea } = req.params;
    const { Titulo_Tarea, Descripcion_Tarea, Tarea_Cumplida } = req.body;

    const query_actualizar_tarea = `
        UPDATE Tareas 
        SET 
            Titulo_Tarea = ?, 
            Descripcion_Tarea = ?, 
            Tarea_Cumplida = ?
        WHERE ID_Tarea = ?;
    `;

    const campos_query = [Titulo_Tarea, Descripcion_Tarea, Tarea_Cumplida, id_tarea];

    try {
        await connectiondb.query(query_actualizar_tarea, campos_query);
        console.log("La tarea ha sido actualizada exitosamente");
        res.status(200).send("Tarea actualizada");
    } catch (error) {
        console.error("No se pudo actualizar la tarea: " + error);
        res.status(500).send("Error al actualizar la tarea");
    }
};

export let eliminar_tarea = async (req, res) => {
    console.log("Accediendo a la ruta /eliminar-tarea");
    const { id_tarea } = req.params;

    try {
        let eliminado = await connectiondb.query("DELETE FROM Tareas WHERE ID_Tarea = ?", [id_tarea]);
        console.log("La tarea ha sido eliminada exitosamente");
    } catch (error) {
        console.error("No se pudo eliminar la tarea: " + error);
    }
};

export let agregar_tarea = async (req, res) => {
    console.log("Accediendo a la ruta /agregar-tarea");

    let { email_cuenta_asociada } = req.params;
    const { Titulo_Tarea, Descripcion_Tarea, Fecha_limite_Tarea, Tarea_Cumplida } = req.body;

    const Fecha_creacion_Tarea = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        let [data] = await connectiondb.query("SELECT ID_Cuenta from Cuentas WHERE Email_Usuario = ?", [email_cuenta_asociada]);
        var id_cuenta_asociada = data[0].ID_Cuenta;
        console.log("El ID de la cuenta asociada es " + id_cuenta_asociada);
    } catch (error) {
        console.log("No se pudo obtener el ID de la cuenta asociada del email " + email_cuenta_asociada + " error: " + error);
    }

    try {
        const query = `
            INSERT INTO Tareas (ID_Cuenta_Asociada, Titulo_Tarea, Descripcion_Tarea, Fecha_creacion_Tarea, Fecha_limite_Tarea, Tarea_Cumplida)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [id_cuenta_asociada, Titulo_Tarea, Descripcion_Tarea, Fecha_creacion_Tarea, Fecha_limite_Tarea, Tarea_Cumplida || ''];

        await connectiondb.query(query, values);

        console.log("La tarea ha sido agregada exitosamente");

        res.status(201).send("Tarea agregada");
    } catch (error) {
        console.error("No se pudo agregar la tarea: " + error);
        console.log("El ID de la cuenta es " + id_cuenta_asociada);
        res.status(500).send("Error al agregar la tarea");
    }
};


export let test = (req, res) => {
    console.log ("Accediedno a la ruta /test")
    res.status (200).json ({
        mensaje: "Esta es una ruta de prueba",
        state: "successlly"
    })
}