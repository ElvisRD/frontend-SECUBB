import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const obtenerImagen = async (idAlerta) => {
   const imagen = await axios.get(`${URL_CONNECT_BACKEND}/api/imagen/${idAlerta}`)
   return imagen.data
} 

const guardarImagen = async (idAlerta, imagen, tipoAlerta) => {
    const res = await axios.post(`${URL_CONNECT_BACKEND}/api/imagen/${tipoAlerta}/${idAlerta}`, imagen, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return res.data
}

module.exports = {
    obtenerImagen,
    guardarImagen 
}