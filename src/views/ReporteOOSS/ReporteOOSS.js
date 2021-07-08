import React, { useState } from 'react'

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdf from "../../assets/ooss.pdf"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap'

const ReporteOOSS = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <div className="animated fadeIn pr-2">
            <Row>
                <Col xs="12" sm="10">
                    <Card>
                        <CardHeader>
                            <strong>Reporte de Obras Sociales</strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                            <embed src={pdf} zoo width="100%" height="700px"
                                                type="application/pdf"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" sm="2">
                    <Card>
                        <CardHeader>
                            <strong>OOSS sin Inactivas</strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Row>
                                        <Col>
                                        <h5>OSDE</h5>
                                        <h5>OSAMM</h5>
                                        <h5>SAMCOR</h5>
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

            export default ReporteOOSS

