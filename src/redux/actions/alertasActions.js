
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

export {guardarAlertaRedux,eliminarAlertaRedux};