import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <span style={{ float: "left" }}>
                                <a href="#">Farmageo</a> &copy; 2021
                            </span>
                        </Col>
                        <Col>
                            <span style={{ float: "right" }}>
                                Últ. modif. 27/07/2021 14:00hs
                            </span>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
