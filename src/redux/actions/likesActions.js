const daLikeAlertaRedux = (like) => {
    return {
        type: "daLikeAlerta",
        data: like
    }
}

const borrarLikeAlertaRedux = (like) => {
    return {
        type: "borrarLikeAlerta",
        data: like
    }
}

const daLikeComentarioRedux = (like) => {
    return {
        type: "daLikeComentario",
        data: like
    }
}

const borrarLikeComentarioRedux = (like) => {
    return {
        type: "borrarLikeComentario",
        data: like
    }
}


export {daLikeAlertaRedux, borrarLikeAlertaRedux, borrarLikeComentarioRedux, daLikeComentarioRedux};