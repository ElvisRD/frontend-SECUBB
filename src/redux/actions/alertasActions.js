
const guardarAlertaRedux = (alerta) => {
    return {
        type: "guardarAlerta",
        data: alerta
    }
}

const eliminarAlertaRedux = (alerta) => {
    return {
        type: "eliminarAlerta",
        data: alerta
    }
}

const editarAlertaRedux = (alerta) => {
    return {
        type: "editarAlerta",
        data: alerta
    }
}

export {guardarAlertaRedux,eliminarAlertaRedux,editarAlertaRedux};