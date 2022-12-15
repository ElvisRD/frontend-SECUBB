import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

const crearComentario = async (body) => {
    const comentario = await axios.post(`${URL_CONNECT_BACKEND}/api/comentario`,body)
    return comentario.data
}

const editarComentario = async (body) => {
    const comentario = await axios.put(`${URL_CONNECT_BACKEND}/api/comentario/editar`,body)
    return comentario.data
}

const obtenerComentarios = async () => {
    const comentarios = await axios.get(`${URL_CONNECT_BACKEND}/api/comentarios`)
    return comentarios.data
}

const like = async (body) => {
    const like = await axios.post(`${URL_CONNECT_BACKEND}/api/comentario/like`,body)
    return like.data
 } 
 
 const dislike = async (body) => {
     const dislike = await axios.post(`${URL_CONNECT_BACKEND}/api/comentario/dislike`,body)
     return dislike.data
 }

module.exports = {
    like,
    dislike,
    editarComentario,
    obtenerComentarios,
    crearComentario

}