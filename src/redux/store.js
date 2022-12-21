import { configureStore } from '@reduxjs/toolkit'

import alertas from "./reducers/alertas";
import usuario from "./reducers/usuario";
import comentarios from "./reducers/comentarios"
import likesAlerta from "./reducers/likesAlerta"
import likesComentario from "./reducers/likesComentarios"
import sugerencias from "./reducers/sugerencias"
import notificacion from "./reducers/notificacion"

export default configureStore({
    reducer: {alertas,usuario,comentarios,likesAlerta,likesComentario,sugerencias,notificacion},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
})

