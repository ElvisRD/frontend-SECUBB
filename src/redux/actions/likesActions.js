const daLikeAlertaRedux = (like) => {
    return {
        type: "daLike",
        data: like
    }
}

const borrarLikeAlertaRedux = (like) => {
    return {
        type: "borrarLike",
        data: like
    }
}

export {daLikeAlertaRedux, borrarLikeAlertaRedux};