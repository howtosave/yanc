/* eslint-disable react/display-name */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "../components";

let s = require("./header.module.scss");
s = s.default || s;

export default ({ siteTitle }) => (
  <header className={s.pageHeader}>
    <Container fluid className={`${s.containerFluid}`}>
      <Row className={`${s.row} justify-content-start align-items-center`}>
        <Col sm={6}>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
        </Col>
      </Row>
    </Container>
  </header>
);
