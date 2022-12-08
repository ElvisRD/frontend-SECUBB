const valorInicial = {
    alertas: []
}

const state = (state = valorInicial, action) => {
    switch(action.type){
        case "guardarAlertas": {
            return {
                alertas: action.data 
            };
        }
        case "guardarAlerta": {
            if(state.alertas !== undefined){
                return {
                    alertas: [action.data, ...state.alertas], 
                };
            }else{
                return {
                    alertas: [action.data], 
                }
            }
            
        }
        default: {
            return {
                alertas: state.alertas
            };
        }
    }
}

export default state