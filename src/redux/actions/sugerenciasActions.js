
const guardarSugerenciaRedux = (sugerencia) => {
    return {
        type: "guardarSugerencia",
        data: sugerencia
    }
}

const eliminarSugerenciaRedux = (sugerencia) => {
    return {
        type: "eliminarSugerencia",
        data: sugerencia
    }
}

export {guardarSugerenciaRedux ,eliminarSugerenciaRedux};