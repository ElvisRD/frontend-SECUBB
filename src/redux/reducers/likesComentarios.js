const valorInicial = {
    usuarios: null
};

const state = (state = valorInicial, action) => {
    if(action.type === "daLikeComentario"){
        if(state.usuarios !== null && state.usuarios[0] !== undefined){
            return {usuarios: [...state.usuarios, action.data]}
        }else{
            return {usuarios: [action.data]}
        }
    }else {
        if(action.type === "borrarLikeComentario"){
            if(state.usuarios !== null){
                return {usuarios: state.usuarios.filter(usuario => usuario.comentarioId !== action.data.comentarioId)}
            }else{
                return {usuarios: state.usuarios}
            }
        }else{
            return {usuarios: state.usuarios}
        }
    }   
}

export default state