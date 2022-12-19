const valorInicial = {
    sugerencias: null,
};

const state = (state = valorInicial, action) => {
    if(action.type === "guardarSugerencia"){
        if(state.sugerencias !== null && state.sugerencias[0] !== undefined){
            return {sugerencias: [action.data, ...state.alertas]}
        }else{
            if(action.data[0] !== undefined){
                return {sugerencias: action.data}
            }else{
                return {sugerencias: [action.data]}
            }
        }
        
    }else{
        if(action.type === "eliminarSugerencia"){
            const sugerencias = state.sugerencias.filter((sugerencia) => sugerencia.id !== action.data.id)

            if(sugerencias[0] !== undefined){
                return {sugerencias: sugerencias}
            }else{
                return {sugerencias: null}
            }
        }else{
            return {sugerencias: state.sugerencias}
        }
    }
}

export default state