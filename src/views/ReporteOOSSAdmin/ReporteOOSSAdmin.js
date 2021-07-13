import { FormLabel, Input } from '@material-ui/core';
import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    //FormText,
    CardImg,
    CardFooter,
    CardTitle,
    //Label
} from "reactstrap";

import {
    GET_REPORTE_OOSS,
    NEW_REPORT_OOSS
    
} from "../../redux/actions/reportOSAtions";
const ReporteOOSSAdmin = (props) => {
    const [inactivas, setInactivas] = useState([])
    const [newInactiva, setnewInactiva] = useState("")
    const [file, setFile] = useState("")
    const [alerta, setAlerta] = useState("")
    useEffect(() => {
        props.GET_REPORTE_OOSS()
    }, [])
    useEffect(() => {
        setInactivas(props.reportOSReducer.oossInactivas ? props.reportOSReducer.oossInactivas : [])
        setAlerta(props.reportOSReducer.alert)
    },[props.reportOSReducer.oossInactivas])
    

    const handleChangeInput = (i,value)=>{
        let inactivasCopy = [... inactivas]
        if(value===""){
            inactivasCopy.splice(i, 1)
        }else{
            inactivasCopy[i]= value
        }
        setInactivas(inactivasCopy)
    }
    const handleNewInput = (value, e)=>{
        let inactivasCopy = [... inactivas]
       if( value != "") {
        inactivasCopy.push(value) 
       }
        setInactivas(inactivasCopy)
        setnewInactiva("")
        e.target.focus()
    }
    const saveHandler = ()=>{
        props.NEW_REPORT_OOSS(file,inactivas,alerta)
    }
    return (
        <div className="mr-2">
            <Row>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <b>Reporte Obras Sociales</b>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12"className="d-flex flex-column" sm="6">
                                    <FormLabel>PDF a mostrar</FormLabel>

                                    <input onChange={e=>setFile(e.target.files[0])} type="file" accept=".pdf" /><br />
                                    <span className="small">Archivo actual: {props.reportOSReducer.attachName}</span>
                                    <FormLabel className="mt-3">Texto decorativo de aviso</FormLabel>
                                    <textarea type="textarea" value={alerta} onChange={e=>setAlerta(e.target.value)} />
                                </Col>

                                <Col xs="12" sm="6" className="d-flex flex-column"  >
                                    <FormLabel>Lista OOSS Inactivas</FormLabel><br />
                                    {inactivas? inactivas.map((os, i)=>{
                                        return<Input value={inactivas[i]} onChange={(e)=>handleChangeInput(i,e.target.value)} type="text" />
                                    }):null
                                    }
                                    <Input value={newInactiva} placeholder="Nueva" onChange={(e)=>{setnewInactiva(e.target.value)}} onBlur={(e)=>handleNewInput(e.target.value,e)} type="text" />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="d-flex">
                            <Button onClick={saveHandler} className="ml-auto" color="primary">Guardar</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        reportOSReducer: state.reportOSReducer,
    };
};

const mapDispatchToProps = {
    GET_REPORTE_OOSS,
    NEW_REPORT_OOSS
};

export default connect(mapStateToProps, mapDispatchToProps)(ReporteOOSSAdmin);
