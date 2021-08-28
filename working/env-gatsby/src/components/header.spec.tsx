import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";

describe("Header", () => {
  it(`renders siteTitle`, () => {
    const siteTitle = `Hello World`;

    render(<Header siteTitle={siteTitle} />);

    const title = screen.getByText(siteTitle);
    expect(title).toBeInTheDocument();
  });

  it(`renders link`, () => {
    const siteTitle = `Hello World`;

    render(<Header siteTitle={siteTitle} />);

    const title = screen.getByText(siteTitle);
    expect(title).toHaveAttribute(`href`, `/`);
  });
});
