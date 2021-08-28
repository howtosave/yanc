/* eslint-disable react/display-name */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { LocaleList } from "../components";

let s = require("./footer.module.scss");
s = s.default || s;

export default ({ location, siteMetadata, pure = false }) => {
  return (
    <footer className={`${s.pageFooter}`}>
      <Container fluid className={`${s.containerFluid}`}>
        <Row className={`${s.row} justify-content-end align-items-end`}>
          <Col sm={6} className={`d-flex p-2 ${s.noticeCol}`}>
            <h4>{siteMetadata.copyright}</h4>
            <h4>
              Based on <a href="https://github.com/aistyler">AIStyler</a>
            </h4>
          </Col>
          {!pure && (
            <Col sm={2} className="d-flex p-2 justify-content-end">
              <LocaleList location={location} />
            </Col>
          )}
        </Row>
      </Container>
    </footer>
  );
};
