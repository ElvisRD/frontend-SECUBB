const valorInicial = {
    usuario: null,
};

const state = (state = valorInicial, action) => {
    if(action.type === "guardarUsuario"){
        return {
            usuario: action.data
        };
    }else{
        return {
            usuario: state.usuario
        };
    }
}

export default state