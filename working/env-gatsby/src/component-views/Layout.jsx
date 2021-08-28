/* eslint-disable react/display-name */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Header, Footer, Meta } from "../components";

let s = require("./layout.module.scss");
s = s.default || s;

export default ({ pageTitle, siteMetadata, location, children }) => (
  <>
    {/* Header */}
    <Header siteTitle={siteMetadata.title} />
    <Meta siteMetadata={siteMetadata} pageTitle={pageTitle} />

    {/* Navibar */}
    {/*<Navibar location={location} /> */}

    {/* Main */}
    <main className={`${s.pageMain}`}>{children}</main>

    {/* Footer */}
    <Footer location={location} siteMetadata={siteMetadata} />
  </>
);
