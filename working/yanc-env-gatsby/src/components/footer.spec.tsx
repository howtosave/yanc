import React from "react";
import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";

describe("Footer", () => {
  it(`renders empty site Metadata`, () => {
    const location = {} as Location;
    const siteMetadata = {};
    // pure for testing
    render(<Footer location={location} siteMetadata={siteMetadata} pure={true} />);

    const ele = screen.getByText("AIStyler");
    expect(ele).toBeInTheDocument();
  });
});
