import React,{useState} from 'react'
import { Col } from 'reactstrap'
import ModalStep from './Modal'
import { FileName, ImgMiniature } from './style'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const miniaturaStyle= {
    objectFit:"contain",
    width:"100%"
}
const OpenibleImage = ({image,archivo}) => {
    const [modalOpen, setmodalOpen] = useState(false)
    const handleClickOpen = () => {
        setmodalOpen(true);
      };
    
      const handleClose = () => {
        setmodalOpen(false);
        document.getElementsByClassName('MuiDialog-root').forEach(element => {
            element.style="position: fixed; z-index: 1300; inset: 0px; visibility: hidden;"
        });
      };
    return (
        <Col key={image} className="my-2 text-center" sm="12" md="3">
            <ImgMiniature onClick={handleClickOpen}  src={image} />
            <FileName onClick={handleClickOpen} >{archivo}</FileName>
            <Dialog
                key={image}
                open={modalOpen}
                // TransitionComponent={Transition}
                maxWidth="lg"
                keepMounted
                onClose={handleClose}
                aria-labelledby={"alert-dialog-slide-title"+image}
                aria-describedby={"alert-dialog-slide-description"+image}
            >
                <DialogTitle id={"alert-dialog-slide-title"+image}>{archivo}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={"alert-dialog-slide-description"+image}>
                        <div className="d-flex flex-column align-items-center">
                            <img onClick={(e)=>window.open(image,'_blank')} style={{cursor:"pointer"}} src={image}/>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Col>
    )
}

export default OpenibleImage
