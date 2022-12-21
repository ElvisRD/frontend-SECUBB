import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const obtenerAlertas = async () => {
   const alertas = await axios.get(`${URL_CONNECT_BACKEND}/api/alertas`)
   return alertas.data
} 
const obtenerAlertasPorFechaYTipo = async (tipo, fechaInicial, fechaFinal) => {
    const alertas = await axios.get(`${URL_CONNECT_BACKEND}/api/alertasFiltradas?tipo=${tipo}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`)
    return alertas.data
}

const crearAlerta = async (body) => {
    const alerta = await axios.post(`${URL_CONNECT_BACKEND}/api/alerta`,body)
    return alerta.data
}

const eliminarAlerta = async (id) => {
    const alerta = await axios.delete(`${URL_CONNECT_BACKEND}/api/alerta/${id}`)
    return alerta.data
}

const like = async (body) => {
    const like = await axios.post(`${URL_CONNECT_BACKEND}/api/alerta/like`,body)
    return like.data
} 
 
 const dislike = async (body) => {
     const dislike = await axios.post(`${URL_CONNECT_BACKEND}/api/alerta/dislike`,body)
     return dislike.data
}

module.exports = {
    like,
    dislike,
    eliminarAlerta,
    obtenerAlertasPorFechaYTipo,
    obtenerAlertas,
    crearAlerta 
}