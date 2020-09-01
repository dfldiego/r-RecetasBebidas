import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

/**Define la ubicacion del Modal */
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

/**Agrega unos estilos al Modal*/
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
    },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
    }
}));


const Receta = ({ receta }) => {

    // Configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    //extraer valores del context
    const { recetadetalle, setIdReceta, setRecetaDetalle } = useContext(ModalContext);

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = recetadetalle => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if (recetadetalle[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>
                        {recetadetalle[`strIngredient${i}`]}
                        {recetadetalle[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredientes;
    }


    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img
                    className="card-img-top"
                    src={receta.strDrinkThumb}
                    alt={`Imagen de ${receta.strDrink}`}
                />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >Ver Receta</button>

                    <Modal
                        open={open}
                        onClose={() => {
                            setIdReceta(null);
                            setRecetaDetalle({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetadetalle.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{recetadetalle.strInstructions}</p>
                            <img className="img-fluid my-4" src={recetadetalle.strDrinkThumb} alt="Imagen" />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(recetadetalle)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;