/**
 * Grid layout
 *
 * See https://getbootstrap.com/docs/4.0/layout/grid/
 */

import React from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

import "./grid-layout.css";

const Layout = () => {
  return (
    <>
      {/* Header: left-top align */}
      <header className={`page-header`}>
        <Container fluid>
          <Row className={`justify-content-start align-items-start`}>
            <Col sm={2} className={``}>
              <h3>Header</h3>
            </Col>
            <Col sm={2} className={``}>
              <h3>Area</h3>
            </Col>
          </Row>
        </Container>
      </header>
      {/* Main: center-center aligh */}
      <main className={`page-main`}>
        <Container>
          <Row className={`justify-content-center align-items-center`}>
            <Col className={``}>
              <ListGroup>
                <ListGroup.Item
                  action
                  href="https://getbootstrap.com/docs/4.0/layout/grid/"
                  target="_blank"
                >
                  Bootstrap Grid Layout
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="https://getbootstrap.com/docs/4.0/components/alerts/"
                  target="_blank"
                >
                  Bootstrap Components
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </main>
      {/* Footer: right-bottom align */}
      <footer className={`page-footer`}>
        <Container fluid>
          <Row className={`justify-content-end align-items-end`}>
            <Col sm={2} className={``}>
              <h4>Footer</h4>
            </Col>
            <Col sm={2} className={``}>
              <h4>Area</h4>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
