import React, { useState, PropTypes, useEffect } from 'react'
import { connect } from "react-redux";
import {
    GET_REPORTE_OOSS,
} from "../../redux/actions/reportOSAtions";
import pdf from "../../assets/ooss.pdf"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap'
import { farmageo_api } from '../../config';


const ReporteOOSS = (props) => {
    useEffect(() => {
        props.GET_REPORTE_OOSS()
    }, [])
    console.log(props.reportOSReducer)
    return (
        <div className="animated fadeIn pr-2">
            <Row>
                <Col xs="12" sm="9">
                    <Card>
                        <CardHeader>
                            <strong>Reporte de Obras Sociales </strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                        <embed src={pdf} zoo width="100%" height="700px"
                                                type="application/pdf" />
                                            
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" sm="3">
                    <Card>
                        <CardHeader>
                            <strong>OOSS Inactivas</strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row>
                                        <Col className="no-select">
                                            {props.reportOSReducer.oossInactivas.map(ooss=><h5 key={ooss}>{ooss}</h5>)}
                                        </Col>
                                        
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    
                    <Card >
                        
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row >
                                        <Col style={{textAlign:"center", color:"red", fontSize:"30px",minHeight:"400px",display:"flex",alignItems: "center",justifyContent: "center"}}>
                                           <strong >{props.reportOSReducer.alert}</strong>
                                        </Col>
                                        
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
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
    GET_REPORTE_OOSS
};

export default connect(mapStateToProps, mapDispatchToProps)(ReporteOOSS);