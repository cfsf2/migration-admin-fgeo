import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import gifCantidad from '../../../../assets/images/Seleccionador-cantidad.gif'
import gifFiltro from '../../../../assets/images/Filtro.gif'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalStep = (openModal) => {
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setOpen(!localStorage.getItem('steptransferView'))
    }, [])

    const noOpenAgain = () => {
        if (checked) {

            localStorage.setItem('steptransferView', true)
        }
        setOpen(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                maxWidth="lg"
                keepMounted
                onClose={noOpenAgain}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"¡Actualizamos la tabla de transfers!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="d-flex flex-column align-items-center">
                            <h5 className=" mb-1">Para ordenar los datos hace click ern cualquier encabezado de columna. </h5>
                            <img src={gifFiltro} style={{ width: "50%" }} />
                            <h5 className="mt-5 mb-0">Y para confirmar los productos que pedis, presiona <b>enter</b> luego de escribir o <b>clickea el tilde</b>.</h5>
                            <img src={gifCantidad} style={{ width: "50%" }} />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div style={{ marginRight: "auto" }}><input value={checked} onChange={() => setChecked(!checked)} type="checkbox" /> No volver a mostrar este mensaje</div>
                    <Button onClick={noOpenAgain} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalStep

