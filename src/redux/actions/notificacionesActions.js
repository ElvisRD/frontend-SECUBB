const guardarNotificacionRedux = (notificacion) => {
    return {
        type: "guardarNotificacion",
        data: notificacion
    }
}

export {guardarNotificacionRedux};