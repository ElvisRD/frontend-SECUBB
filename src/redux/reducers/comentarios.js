
const valorInicial = {
    comentarios: null
}

const state = (state = valorInicial, action) => {
    if(action.type === "guardarComentario"){
    
       if(state.comentarios !== null){
        return {comentarios: [...state.comentarios, action.data]}
       }else{
        if(action.data[0] !== undefined){
            return {comentarios: action.data}
        }else{
            return {comentarios: [action.data]}
        }
           
       }
       
       
    }else{
        if(action.type === "eliminarComentario"){
            if(state.comentarios !== null){
                const comentarios = state.comentarios.filter((comentario) => comentario.alertaId !== action.data.id)
                if(comentarios[0] !== undefined){
                    return {comentarios: comentarios}
                }else{
                    return {comentarios: null}
                }
            }else{
                return {comentarios: null}
            }
           
           
        }else{
           if(action.type === "editarComentario"){
                let arraySinElComentario = state.comentarios.filter((comentario) => comentario.id !== action.data.id)
                arraySinElComentario = [...arraySinElComentario, action.data];

                return {comentarios: arraySinElComentario} 
                
            }else{
                if(action.type === "limpiarRedux"){
                    return {comentarios: null}
                }else{
                    return state
                }
            }
        }
    }
}

export default state;