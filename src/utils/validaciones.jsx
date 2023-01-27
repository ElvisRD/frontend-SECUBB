import * as yup from 'yup';

const validacionesRegistro = yup.object().shape({
    nombre: yup
    .string()
    .required("Por favor, ingrese su nombre.")
    .matches(/^[A-Za-zÀ-ÿ]+$/g, "El nombre solo puede contener letras"),

    apellido: yup
    .string()
    //.min(10, "La descripción debe contener mínimo 10 letras.")
    .required("Por favor, ingrese su apellido.")
    .matches(/^[A-Za-zÀ-ÿ]+$/g, "El apellido solo puede contener letras"),
   
    correo: yup
    .string().email("Debe ingresar un correo institucional válido")
    .required("Por favor, ingrese su correo institucional")
    .matches(/^[A-Za-z0-9._%+-]+@(alumnos\.ubiobio\.cl|ubiobio\.cl|egresados\.ubiobio\.cl)$/, "Por favor, ingrese su correo institucional de forma correcta"),

});

const validacionCorreo = yup.object().shape({
    correo: yup
    .string().email("Debe ingresar el correo institucional")
    .required("Por favor, ingrese el correo institucional")
    .matches(/^[A-Za-z0-9._%+-]+@(alumnos\.ubiobio\.cl|ubiobio\.cl|egresados\.ubiobio\.cl)$/, "Por favor, ingrese su correo institucional de forma correcta"),
});

const validacionesLogin = yup.object().shape({
    correo: yup
    .string().email("Debe ingresar su correo institucional")
    .required("Por favor, ingrese su correo institucional")
    .matches(/^[A-Za-z0-9._%+-]+@(alumnos\.ubiobio\.cl|ubiobio\.cl|egresados\.ubiobio\.cl)$/, "Por favor, ingrese su correo institucional de forma correcta"),

    contrasena: yup
    .string()
    .required("Por favor, ingrese su contraseña")

})

const validacionModificarContrasena = yup.object().shape({
 
    contrasenaActual: yup
    .string()
    .min(6, "La contraseña debe contener mínimo 6 caracteres")
    .required("Por favor, ingrese su contraseña actual")
    .matches(/^[A-Za-z0-9._%+-]+$/g, "La contraseña solo puede contener letras, números y los caracteres especiales"),

    contrasenaNueva: yup
    .string()
    .min(6, "La contraseña debe contener mínimo 6 caracteres")
    .required("Por favor, ingrese su contraseña nueva")
    .matches(/^[A-Za-z0-9._%+-]+$/g, "La contraseña solo puede contener letras, números y los caracteres especiales"),

    verificacionContrasena: yup
    .string()
    .min(6, "La contraseña debe contener mínimo 6 caracteres")
    .required("Por favor, ingrese su contraseña nuevamente")
    .matches(/^[A-Za-z0-9._%+-]+$/g, "La contraseña solo puede contener letras, números y los caracteres especiales")
    .oneOf([yup.ref('contrasenaNueva'), null], 'Las contraseñas no coinciden')
})

const validacionSugerencia = yup.object().shape({
    sugerencia: yup
    .string()
    .min(10, "La sugerencia debe contener mínimo 10 caracteres")
    .trim()
    .required("Por favor, ingrese su sugerencia")
    .matches(/^[A-Za-zÀ-ÿ. ]+$/g, "La sugerencia solo puede contener letras, puntos, espacios y tildes")
    .matches(/^[A-Za-zÀ-ÿ. ]+$/g, "La sugerencia solo puede contener letras, puntos, espacios y tildes")
    
    
})

const validacionReportarAlerta = yup.object().shape({
    descripcion: yup
    .string()
    //.min(10, "La descripción debe contener mínimo 10 letras.")
	.max(250, "La descripción debe contener menos de 250 letras.")
    .required("Por favor, ingresa una descripción")
    .matches(/^(?=^[A-Za-zÀ-ÿ0-9., ]+$)(?=^(?!.*  )(?!^\s+$).*$)/, "La descripción solo puede contener letras, números, puntos y comas."),
    
    descripcion_ubicacion: yup
    .string()
    //.min(4, "La ubicacion debe contener mínimo 4 letras.")
    .trim("error")
	.max(250, "La ubicacion debe contener menos de 100 letras.")
    .matches(/^(?=^[A-Za-zÀ-ÿ0-9., ]+$)(?=^(?!.*  )(?!^\s+$).*$)/, "La ubicación solo puede contener letras, números, puntos y comas."),
})


export {validacionesRegistro, validacionCorreo, validacionesLogin, validacionModificarContrasena,validacionSugerencia,validacionReportarAlerta}




