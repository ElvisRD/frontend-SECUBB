const valorInicial = {
    alertas: null
}

const state = (state = valorInicial, action) => {
    
    if(action.type === "guardarAlerta"){
        if(state.alertas !== null && state.alertas[0] !== undefined){
            return {alertas: [action.data, ...state.alertas]}
        }else{
            if(action.data[0] !== undefined){
                return {alertas: action.data}
            }else{
                return {alertas: [action.data]}
            }
        }

    }else{

        if(action.type === "eliminarAlerta"){
            if(state.alertas !== null){
                const alertas = state.alertas.filter((alerta) => alerta.id !== action.data.id)

                if(alertas[0] !== undefined){
                    return {alertas: alertas}
                }else{
                    return {alertas: null}
                }
            }else{
                return {alertas: state.alertas}
            }
            
        }else{
            if(action.type === "limpiarRedux"){
                return {alertas: null}
            }else{
                return state
            }
           
        }
        
    }
    
}

export default state