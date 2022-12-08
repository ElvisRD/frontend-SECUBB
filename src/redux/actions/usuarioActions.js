const guardarUsuario = (usuario) => {
    return {
        type: "guardarUsuario",
        data: usuario
    }
}

export {guardarUsuario};