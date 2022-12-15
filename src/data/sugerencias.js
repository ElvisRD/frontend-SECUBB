import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const crearSugerencia = async (body) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/sugerencia`, body)
    return mensaje.data
}

module.exports = {
    crearSugerencia 
}