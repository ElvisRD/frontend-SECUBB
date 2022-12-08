import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const existeUsuario = async (usuario) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/existeUsuario`,usuario)
    return mensaje.data
}

module.exports = {
    existeUsuario 
}