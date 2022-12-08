const valorInicial = {
    comentarios: null
}

const state = (state = valorInicial, action) => {
    if(action.type === "guardarComentario"){
    
       if(state.comentarios !== null){
        return {comentarios: [...state.comentarios, action.data]}
       }else{
        return {comentarios: [action.data]}
       }
       
       
    }else{
        return {
            comentarios: state.comentarios
        };
    }
}

export default state