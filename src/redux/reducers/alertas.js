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
            const alertas = state.alertas.filter((alerta) => alerta.id !== action.data.id)

            if(alertas[0] !== undefined){
                return {alertas: alertas}
            }else{
                return {alertas: null}
            }
        }else{
            if(action.type === "editarAlerta"){
                let arraySinAlerta = state.alertas.filter((alertas) => alertas.id !== action.data.id)
                arraySinAlerta = [...arraySinAlerta, action.data];
                return {alertas: arraySinAlerta}
            }else{
                return {alertas: state.alertas}
            }
        }
        
    }
    
}

export default state