import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const crearSugerencia = async (body) => {
    const mensaje = await axios.post(`${URL_CONNECT_BACKEND}/api/sugerencia`, body)
    return mensaje.data
}

const eliminarSugerencia = async (id) => {
    const res = await axios.delete(`${URL_CONNECT_BACKEND}/api/sugerencia/${id}`)
    return res.data
}

const obtenerSugerencias = async () => {
    const sugerencias = await axios.get(`${URL_CONNECT_BACKEND}/api/sugerencias`)
    return sugerencias.data 

}

module.exports = {
    crearSugerencia,
    eliminarSugerencia,
    obtenerSugerencias 
}