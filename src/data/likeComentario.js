import axios from "axios";
import { URL_CONNECT_BACKEND } from "../../env";

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
    dislike 
}