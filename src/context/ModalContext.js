import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, setIdReceta] = useState(null); //receta que se selecciona
    const [recetadetalle, setRecetaDetalle] = useState({})

    // una vez que tenemos una receta, llamar a la Api
    useEffect(() => {
        const obtenerReceta = async () => {
            if (!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            setRecetaDetalle(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                recetadetalle,
                setIdReceta,
                setRecetaDetalle
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;