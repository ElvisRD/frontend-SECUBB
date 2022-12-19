const valorInicial = {
    notificacion: null,
};

const state = (state = valorInicial, action) => {
    if(action.type === "guardarNotificacion"){
        return {
            notificacion: action.data
        };
    }else{
        return {
            notificacion: state.usuario
        };
    }
}

export default state