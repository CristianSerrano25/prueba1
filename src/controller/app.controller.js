import { newConnection } from "../dataBase/dataBase.js";

const ctrl = {};

ctrl.obtenerTareas = async (req, res) => {
    try {
        const connection = await newConnection();
        const [results] = await connection.query("SELECT * FROM tasks");
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).send("Error al obtener las tareas");
    }
};

ctrl.crearTarea = async (req, res) => {

    const connection = await newConnection();

    const {title, description, isComplete} = req.body;

    // Insertar nueva tarea en la base de datos
    await connection.query('INSERT INTO tasks(title, description, isComplete) VALUES (?, ?, ?)', [title, description, isComplete])

    res.status(200).json({
            msg: "TAREA CREADA CON ÉXITO"
        })

}


ctrl.obtenerTareaId = async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await newConnection();
        const [results] = await connection.query(
            "SELECT * FROM tasks WHERE id = ?",
            id
        );
        if (results.length === 0) {
            return res.status(404).send("Tarea no encontrada");
        }
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).send("Error al obtener tarea");
    }
};

ctrl.editarTarea = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const connection = await newConnection();
        const [result] = await connection.query(
            "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
            [title, description, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send("Tarea no encontrada");
        }
        return res.status(200).send("Tarea editada correctamente");
    } catch (error) {
        return res.status(500).send("Error al editar tarea");
    }
};

ctrl.eliminarTarea = async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await newConnection();
        const [result] = await connection.query(
            "DELETE FROM tasks WHERE id = ?",
            id
        );
        if (result.affectedRows === 0) {
            return res.status(404).send("Tarea no encontrada");
        }
        return res.status(200).send("Tarea eliminada correctamente");
    } catch (error) {
        return res.status(500).send("Error al eliminar tarea");
    }
};

export { ctrl };

