import React, { useState, useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
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
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns'
import { esES } from '@material-ui/core/locale';
import { GET_FARMACIA } from '../../redux/actions/farmaciaActions';
import { es } from 'date-fns/esm/locale'
import OpenibleImage from './Components/OpenibleImage';
import Axios from 'axios';
import { farmageo_api } from '../../config';
import spinner from '../../assets/images/spinner.svg'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#007d95' },
        secondary: { main: '#00d579' }
    },
}, esES);

const DebitosPami = (props) => {
    const [currentImages, setcurrentImages] = useState(null)
    const [dateFilterFrom, setdateFilterFrom] = useState(new Date(1601521200000))
    const [searchValue, setsearchValue] = useState("")


    useEffect(() => {
        async function fetchData() {
            const doMonth = (date) => {
                if ((dateFilterFrom.getMonth() + 1) < 10) {
                    return "0" + (dateFilterFrom.getMonth() + 1)
                } else {
                    return (dateFilterFrom.getMonth() + 1)
                }
            }
            setcurrentImages(null)
            console.log(props.farmacia)
            Axios.get(farmageo_api + "/farmacias/" + props.user.userprofile.usuario).then(r => {
                console.log(r.data.cufe)
                try {
                    Axios.get(farmageo_api + "/farmacias/debitos/" + dateFilterFrom.getFullYear() + doMonth() + "/" + r.data.cufe,)
                        .then(r2 => {
                            console.log(r2)
                            if (!r.data.body) {
                                setcurrentImages([])
                            } else {
                                if (r2.data.body.error) {
                                    setcurrentImages([])
                                }
                                else {
                                    setcurrentImages(r2.data.body)
                                }
                            }
                        })
                        .catch(setcurrentImages([]))
                } catch {
                    setcurrentImages([])
                }
            })



        }
        fetchData()
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
                                            minDate={new Date(1596250800000)}
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
                                        <Input value={searchValue} onChange={e => setsearchValue(e.target.value)} style={{ width: "100%" }} placeholder="Buscar por nombre" inputTypeSearch />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {Array.isArray(currentImages) ?
                                        currentImages.length > 0 ? currentImages.map(image => <OpenibleImage archivo={image.archivo} image={farmageo_api + "/debitos/" + image.periodo + "/" + image.archivo} />)
                                            :
                                            <div className="justify-content-center w-100 text-center"><h3>No se encontraron débitos</h3></div> :
                                        <div style={{ width: "100%" }} className="d-flex justify-content-center"><img style={{ width: "70px" }} src={spinner} /></div>}
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
        user: state.authReducer,
        farmacia: state.farmaciaReducer
    };
};

const mapDispatchToProps = {
    GET_DEBITOS,
    GET_FARMACIA
};
export default connect(mapStateToProps, mapDispatchToProps)(DebitosPami);
