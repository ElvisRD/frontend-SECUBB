import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const crearComentario = async (body) => {
    const comentario = await axios.post(`${URL_CONNECT_BACKEND}/api/alerta`,body)
    return comentario.data
}

module.exports = {
    crearComentario 
}