const guardarComentarioRedux = (comentario) => {
    return {
        type: "guardarComentario",
        data: comentario
    }
}


export {guardarComentarioRedux};