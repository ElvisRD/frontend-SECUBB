const valorInicial = {
    usuario: null,
    coordenadas: null
};

const state = (state = valorInicial, action) => {
    if(action.type === "guardarUsuario"){
        return {
            ...state, usuario: action.data
        };
    }else{
        if(action.type === "guardarUbicacion"){
            return {...state, coordenadas: action.data}
        }else{
            return state;
        }
    }
}

export default state