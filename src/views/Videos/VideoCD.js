import React from "react";
import "./styles.css";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Button,
    Container,
} from "reactstrap";

import YoutubeEmbed from "./YoutubeEmbed";

export default function VideoCD() {
    return (

        <div className="animated fadeIn">

            <Row className="mb-5 mt-5 text-center">
                <Col>
                    <h4> Acondicionamiento de las <b>RECETAS</b> </h4>
                </Col>
            </Row>
            <Row>
                <Col md="11">
                    <Row className="mx-auto">
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    Video 1
                                </CardHeader>
                                <CardBody>
                                    <YoutubeEmbed embedId="nwktZkmbruY" />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    Video 2
                                </CardHeader>
                                <CardBody>
                                    <YoutubeEmbed embedId="tincOiTxcXY" />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    Video 3
                                </CardHeader>
                                <CardBody>
                                    <YoutubeEmbed embedId="8AMNuOGm_0o" />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    );
}
