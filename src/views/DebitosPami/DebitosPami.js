import React, { useState, useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import testIMG1 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG2 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG3 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG4 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG5 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import { GET_DEBITOS } from '../../redux/actions/debitospamiActions';

import { connect } from "react-redux";
import {
    //Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    //FormGroup,
    //Input,
    //Label,
    //CardFooter,
    //CardImg
} from "reactstrap";
import {
    DatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import { esES } from '@material-ui/core/locale';
import {es} from 'date-fns/esm/locale'
import OpenibleImage from './Components/OpenibleImage';
import Axios from 'axios';
import { farmageo_api } from '../../config';
import spinner from '../../assets/images/spinner.svg'

const theme = createMuiTheme({
    palette: {
      primary: { main: '#007d95' },
      secondary: {main:'#00d579'}
    },
  }, esES);


const DebitosPami = (props) => {
    const [currentImages, setcurrentImages] = useState(null)
    const [dateFilterFrom, setdateFilterFrom] = useState(new Date(1601521200000))
    const [searchValue, setsearchValue] = useState("")
    console.log(props)
    useEffect(() => {
        console.log("runing")
        const doMonth= (date)=>{
            if((dateFilterFrom.getMonth()+1) < 10){
                return "0"+(dateFilterFrom.getMonth()+1)
            }else{
                return (dateFilterFrom.getMonth()+1)
            }
        }
        setcurrentImages(null)
        Axios.get(farmageo_api + "/farmacias/debitos/"+dateFilterFrom.getFullYear()+doMonth()+"/"+props.user.userprofile.usuario,)
        .then(r=>{
            console.log(r)
            if(r.data.body.error){
                setcurrentImages([])
            }else{
                setcurrentImages(r.data.body)
            }
        })
        .catch(console.log("error"))
    }, [dateFilterFrom])
    return (
        <Row>
            <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader><b>Débitos PAMI</b></CardHeader>
                        <CardHeader>
                            <Row>
                                <Col className="d-flex " xs="12" md="6">
                                    <h5 className="mr-3 mt-1">Período:</h5>
                                    <DatePicker
                                        todayLabel="Hoy"
                                        cancelLabel="Cancelar"
                                        clearLabel="Limpiar"
                                        invalidLabel="Desconocido"
                                        allowKeyboardControl
                                        disableFuture
                                        openTo="date"
                                        format="MM/yyyy"
                                        views={["year", "month"]}
                                        value={dateFilterFrom}
                                        onChange={e => setdateFilterFrom(e)}
                                    />
                                </Col>
                                
                                <Col className="d-flex " xs="12" md="6">
                                    <Input value={searchValue} onChange={e=>setsearchValue(e.target.value)} style={{width:"100%"}} placeholder="Buscar por nombre" inputTypeSearch />
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {Array.isArray(currentImages) ? 
                                    currentImages.length>0 ?currentImages.map(image=> <OpenibleImage archivo={image.archivo} image={farmageo_api+"/debitos/"+image.periodo+"/"+image.archivo}/>)
                                        :
                                    <div className="justify-content-center w-100 text-center"><h3>No se encontraron débitos</h3></div> :
                                    <div style={{width:"100%"}} className="d-flex justify-content-center"><img style={{width:"70px"}} src={spinner} /></div>}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Row>
    )
}
const mapStateToProps = (state) => {
    return {
      debitospamiReducer: state.debitospamiReducer,
      user:state.authReducer,
    };
  };

const mapDispatchToProps = {
    GET_DEBITOS
};
export default connect(mapStateToProps, mapDispatchToProps)(DebitosPami);
