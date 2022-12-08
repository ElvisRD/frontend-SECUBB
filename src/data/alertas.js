import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const obtenerAlertas = async (activa) => {
   const alertas = await axios.get(`${URL_CONNECT_BACKEND}/api/alertas?activa=${activa}`)
   return alertas.data
} 

const crearAlerta = async (body) => {
    const alerta = await axios.post(`${URL_CONNECT_BACKEND}/api/alerta`,body)
    return alerta.data
}

module.exports = {
    obtenerAlertas,
    crearAlerta 
}