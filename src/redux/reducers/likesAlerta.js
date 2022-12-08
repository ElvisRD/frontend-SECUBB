const valorInicial = {
    usuarios: null
};

const state = (state = valorInicial, action) => {
    if(action.type === "daLike"){
        if(state.usuarios !== null && state.usuarios[0] !== undefined){
            return {usuarios: [...state.usuarios, action.data]}
        }else{
            return {usuarios: [action.data]}
        }
    }else {
        if(action.type === "borrarLike"){
            if(state.usuarios !== null){
                return {usuarios: state.usuarios.filter(usuario => usuario.alertaId !== action.data.alertaId)}
            }else{
                return {usuarios: state.usuarios}
            }
        }else{
            return {usuarios: state.usuarios}
        }
    }   
}

export default state