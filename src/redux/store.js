import { configureStore } from '@reduxjs/toolkit'

import alertas from "./reducers/alertas";
import usuario from "./reducers/usuario";
import comentarios from "./reducers/comentarios"
import likesAlerta from "./reducers/likesAlerta"

export default configureStore({
    reducer: {alertas,usuario,comentarios,likesAlerta}
})
