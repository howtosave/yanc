import React from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";

import { Layout } from "../components";
import { siteMetadata } from "~/site-config";

interface Props extends WithTranslation {
  location: Location;
  data?: any;
}

const View: React.FC<Props> = ({ data, location, t, tReady }) => {
  return (
    <Layout siteMetadata={siteMetadata} location={location} pageTitle={data ? data.title : ""}>
      <Container>
        <Row>
          <Col className="text-center">
            <h2>{t("page-index:title")}</h2>
          </Col>
        </Row>
        {data && (
          <Row className="justify-content-center">
            <Col>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="text-center">
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
    </Layout>
  );
};

export default withTranslation(["common", "page-index"])(View);
