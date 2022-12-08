const guardarAlertasRedux = (alertas) => {
    return {
        type: "guardarAlertas",
        data: alertas
    }
}

const guardarAlertaRedux = (alerta) => {
    return {
        type: "guardarAlerta",
        data: alerta
    }
}

export {guardarAlertasRedux, guardarAlertaRedux};