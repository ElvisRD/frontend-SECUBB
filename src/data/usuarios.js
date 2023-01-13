import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const verificacionUsuario = async (usuario) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/verificarUsuario`,usuario)
    return mensaje.data
}

const crearUsuario = async (usuario) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/crearUsuario`,usuario)
    return mensaje.data
}

const editarNotificaciones = async (body) => {
    const mensaje = await axios.put(`${URL_CONNECT_BACKEND}/api/editarNotificaciones`,body)
    return mensaje.data
}

const recuperarContrasena = async (correo) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/recuperarContrasena`,correo)
    return mensaje.data
}

const modificarContrasena = async (body) => {
    const mensaje = await axios.put(`${URL_CONNECT_BACKEND}/api/modificarContrasena`,body)
    return mensaje.data
}

const modificarTipoUsuario = async (body) => {
    const mensaje = await axios.put(`${URL_CONNECT_BACKEND}/api/modificarTipoUsuario`,body)
    return mensaje.data
}

module.exports = {
    verificacionUsuario,
    crearUsuario,
    editarNotificaciones,
    recuperarContrasena,
    modificarContrasena,
    modificarTipoUsuario 
}