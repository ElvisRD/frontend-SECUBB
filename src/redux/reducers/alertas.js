const valorInicial = {
    alertas: null
}

const state = (state = valorInicial, action) => {
    
    if(action.type === "guardarAlerta"){
        if(state.alertas !== null && state.alertas[0] !== undefined){
            return {alertas: [...state.alertas, action.data]}
        }else{
            return {alertas: action.data}
        }

    }else{
        return {alertas: state.alertas}
    }
    
}

export default state