const daLikeAlertaRedux = (like) => {
    return {
        type: "daLikeAlerta",
        data: like
    }
}

const borrarLikeAlertaRedux = (like, posicion) => {
    return {
        type: "borrarLikeAlerta",
        data: like,
        position: posicion
    }
}

const daLikeComentarioRedux = (like) => {
    return {
        type: "daLikeComentario",
        data: like
    }
}

const borrarLikeComentarioRedux = (like, posicion) => {
    return {
        type: "borrarLikeComentario",
        data: like,
        position: posicion
    }
}

const borrarTodosLosLikesAlertaRedux = (alerta) => {
    return {
        type: "borrarTodosLosLikesAlerta",
        data: alerta
    }
}


export {daLikeAlertaRedux, borrarLikeAlertaRedux, borrarLikeComentarioRedux, daLikeComentarioRedux, borrarTodosLosLikesAlertaRedux};