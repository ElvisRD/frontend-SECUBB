const guardarUsuarioRedux = (usuario) => {
    return {
        type: "guardarUsuario",
        data: usuario
    }
}

const guardarUbicacionRedux = (coordenadas) => {
    return {
        type: "guardarUbicacion",
        data: coordenadas
    }
}

const limpiarRedux = () => {
    return {
        type: "limpiarRedux"
    }
}

export {guardarUsuarioRedux,guardarUbicacionRedux,limpiarRedux};