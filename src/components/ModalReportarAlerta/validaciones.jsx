import * as yup from 'yup';

const validaciones = yup.object().shape({
    descripcion: yup
    .string()
    //.min(10, "La descripción debe contener mínimo 10 letras.")
	.max(250, "La descripción debe contener menos de 250 letras.")
    .required("Por favor, ingresa una descripción")
    .matches(/^[A-Za-z0-9À-ÿ /,\u00f1\u00d1.]+$/g, "La descripción solo puede contener letras, números, puntos y comas."),
    
    descripcion_ubicacion: yup
    .string()
    //.min(4, "La ubicacion debe contener mínimo 4 letras.")
	.max(250, "La ubicacion debe contener menos de 100 letras.")
    .required("Por favor, ingresa una ubicacion")
    .matches(/^[A-Za-z0-9À-ÿ /,\u00f1\u00d1.]+$/g, "La ubicacion solo puede contener letras, números, puntos y comas."),
});

export default validaciones