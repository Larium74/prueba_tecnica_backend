import { createPool } from "mysql2/promise";
import { objectConnection } from "./objectConnection.js";

export let connectiondb = createPool(objectConnection);

export let comprobar_conexiondb = async () => {
    try {
        console.log("Comprobando la conexión con la base de datos...");

        const connection = await connectiondb.getConnection();
        console.log("La conexión a la base de datos ha sido exitosa");
        

    } catch (error) {
        console.error("Hubo un error al conectarse a la base de datos: " + error);
    }
};