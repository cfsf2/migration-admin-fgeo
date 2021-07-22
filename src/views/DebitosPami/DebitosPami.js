import React, { useState, useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import testIMG1 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG2 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG3 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG4 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
import testIMG5 from '../../assets/imagesTesting/909030151_01702013233133_001.png'
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

const theme = createMuiTheme({
    palette: {
      primary: { main: '#007d95' },
      secondary: {main:'#00d579'}
    },
  }, esES);

  const testCurrentImage=[testIMG1,testIMG2,testIMG3,testIMG4,testIMG5,]

const DebitosPami = () => {
    const [currentImages, setcurrentImages] = useState(testCurrentImage)
    const [dateFilterto, setdateFilterto] = useState(new Date())
    const [dateFilterFrom, setdateFilterFrom] = useState(new Date(dateFilterto.getTime() - 2592000000))
    const [searchValue, setsearchValue] = useState("")

    return (
        <Row>
            <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader><b>Debitos PAMI</b></CardHeader>
                        <CardHeader>
                            <Row>
                                <Col className="d-flex " xs="12" md="4">
                                    <h5 className="mr-3 mt-1">Desde:</h5>
                                    <DatePicker
                                        todayLabel="Hoy"
                                        cancelLabel="Cancelar"
                                        clearLabel="Limpiar"
                                        invalidLabel="Desconocido"
                                        disableFuture
                                        openTo="date"
                                        format="dd/MM/yyyy"
                                        views={["year", "month", "date"]}
                                        value={dateFilterFrom}
                                        onChange={e => setdateFilterFrom(e)}
                                    />
                                </Col>
                                <Col className="d-flex " xs="12" md="4">
                                    <h5 className="mr-3 mt-1">Hasta:</h5>
                                    <DatePicker
                                        disableFuture
                                        openTo="date"
                                        format="dd/MM/yyyy"
                                        views={["year", "month", "date"]}
                                        value={dateFilterFrom}
                                        onChange={e => setdateFilterFrom(e)}
                                    />
                                </Col>
                                
                                <Col className="d-flex " xs="12" md="4">
                                    <Input value={searchValue} onChange={e=>setsearchValue(e.target.value)} style={{width:"100%"}} placeholder="Buscar por nombre" inputTypeSearch />
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {currentImages.length>0 ?currentImages.map(image=> <OpenibleImage image={image}/>)
                                :
                                <div className="justify-content-center"><h3>No se encontraron debitos</h3></div>}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Row>
    )
}

export default DebitosPami
