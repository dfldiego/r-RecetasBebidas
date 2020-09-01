import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const CategoriasContext = createContext();

// Provider: es donde se encuentran las funciones y state.
const CategoriasProvider = (props) => {

    // crear el state del context
    const [categorias, setCategorias] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get(url);
            //console.log(categorias.data.drinks);
            setCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;




/**
 *  Los datos fluyen desde este context, ya no tanto desde app.js
 *  createContext es un paquete nuevo. Es una funcion .
 * Siempre que creamos un context debemos crear un provider.
 * Provider: es de donde van a salir los datos y las funciones.
 * return: aqui estarán los datos que van a estar disponible en todos los componentes.
 * {props.children} -> todos los componentes van a estar dentro de este props y de esta forma se van a pasar los datos.
 *value -> aqui van estar los valores disponibles  en los demas componentes.
  * Todo lo que esta en provider ("hola") va a estar disponible en el componente Header y Formulario.
 *  En CategoriasContext fluyen los datos y vamos a consumirlo en Formulario o donde
 *              deseemos mostrar los datos.
 * creamos el provider con createContext
 * el value va a estar en todos los componentes
 * colocamos el provider en el arbol de componentes en app.js
 *  Lo consumimos usando el hook de useContext
 */