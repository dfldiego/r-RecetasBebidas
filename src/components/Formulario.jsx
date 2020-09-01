import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext'; //van {} xq no es un export default
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    //USE STATE
    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    const [error, setError] = useState(false);

    // USE CONTEXT
    const { categorias } = useContext(CategoriasContext);
    //console.log(categorias);
    const { setBusquedaReceta, setConsultar } = useContext(RecetasContext);

    // funcion para leer los contenidos.
    const handleChange = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    //SUBMIT
    const handleSubmit = e => {
        e.preventDefault();
        if (busqueda.nombre.trim() === '' || busqueda.categoria.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        setBusquedaReceta(busqueda);
        setConsultar(true);
    }

    return (
        <form
            className="col-12"
            onSubmit={handleSubmit}
        >
            {error ? (<p className="alert alert-danger text-center p-2">Todos los campos son obligatorios</p>) : null}
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Busca por Ingrediente"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
    );
}

export default Formulario;