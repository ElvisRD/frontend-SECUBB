
const guardarAlertaRedux = (alerta) => {
    return {
        type: "guardarAlerta",
        data: alerta
    }
}

export {guardarAlertaRedux};