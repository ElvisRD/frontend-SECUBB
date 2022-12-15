const guardarComentarioRedux = (comentario) => {
    return {
        type: "guardarComentario",
        data: comentario
    }
}

const eliminarComentarioRedux = (alerta) => {
    return {
        type: "eliminarComentario",
        data: alerta
    }
}

const editarComentarioRedux = (comentario) => {
    return {
        type: "editarComentario",
        data: comentario
    }
}


export {guardarComentarioRedux, eliminarComentarioRedux, editarComentarioRedux};