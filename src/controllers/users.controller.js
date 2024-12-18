import { usersService } from "../services/index.js"
import { createHash } from "../utils/index.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
        }
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const updateBody = req.body;
        const user = await usersService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
        }

        const updatedUser = await usersService.update(userId, updateBody);
        res.status(200).send({ status: "success", message: "Usuario actualizado", payload: updatedUser });
    } catch (error) {
        console.error("Error actualizando el usuario:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
        }

        await usersService.delete(userId);
        res.status(200).send({ status: "success", message: "Usuario eliminado" });
    } catch (error) {
        console.error("Error eliminando el usuario:", error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({
                status: "error",
                error: "Todos los campos requeridos deben ser completados"
            });
        }

        const existingUser = await usersService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send({
                status: "error",
                error: "El correo electrónico ya está registrado"
            });
        }

        const hashedPassword = await createHash(password);
        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || "user",
            pets: []
        };

        const createdUser = await usersService.create(newUser);

        res.status(201).send({
            status: "success",
            message: "Usuario creado exitosamente",
            payload: createdUser
        });
    } catch (error) {
        console.error("Error creando usuario:", error);
        res.status(500).send({
            status: "error",
            error: "Error interno del servidor"
        });
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
}