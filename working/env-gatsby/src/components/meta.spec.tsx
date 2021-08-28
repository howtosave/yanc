import React from "react";
import { render, waitFor } from "@testing-library/react";

import { Meta } from "./Meta";

const _getMetaEle = (name: string): HTMLMetaElement | null => {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute("name") === name || metas[i].getAttribute("property") === name) {
      return metas[i];
    }
  }
  return null;
};

describe("Meta", () => {
  it(`renders default value`, async () => {
    render(<Meta />);
    await waitFor(() => {
      // title
      expect(document.title).toBe("");

      let ele;
      // og
      ele = _getMetaEle("og:title");
      expect(ele).toBeTruthy();
      expect(ele?.getAttribute("content")).toBe("");
      ele = _getMetaEle("og:type");
      expect(ele).toBeTruthy();
      expect(ele?.getAttribute("content")).toBe("website");
      ele = _getMetaEle("og:description");
      expect(ele).toBeTruthy();
      expect(ele?.getAttribute("content")).toBe("");
      ele = _getMetaEle("og:url");
      expect(ele).toBeTruthy();
      expect(ele?.getAttribute("content")).toBe("");
      ele = _getMetaEle("og:image");
      expect(ele).toBeTruthy();
      expect(ele?.getAttribute("content")).toBe("");
    });
  });

  it(`renders siteTitle`, async () => {
    const siteTitle = `Hello World`;

    render(<Meta pageTitle={siteTitle} />);

    await waitFor(() => {
      expect(document.title).toBe(`${siteTitle} |`);
    });
  });
});
