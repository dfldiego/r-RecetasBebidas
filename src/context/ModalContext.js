import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, setIdReceta] = useState(null); //receta que se selecciona

    return (
        <ModalContext.Provider
            value={{
                setIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;