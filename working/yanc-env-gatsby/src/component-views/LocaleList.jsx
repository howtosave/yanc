/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React from "react";

let s = require("./locale-list.module.scss");
s = s.default || s;

export default ({ items, defaultValue, onChange }) => (
  <select
    onChange={onChange}
    defaultValue={defaultValue}
    className={`form-select-sm ${s.localeSelect}`}
  >
    {items.map((e) => (
      <option key={e.code} value={e.code}>
        {e.localName}
      </option>
    ))}
  </select>
);
