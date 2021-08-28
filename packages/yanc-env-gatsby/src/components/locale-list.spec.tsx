/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";

import { LocaleList } from "./LocaleList";

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

describe("LocaleList", () => {
  beforeEach(() => {
    useStaticQuery.mockImplementationOnce(() => ({
      themeI18N: {
        defaultLang: "ko",
        prefixDefault: false,
        config: [
          { code: "ko", name: "korean", localName: "한글" },
          { code: "en", name: "english", localName: "English" },
        ],
      },
    }));
  });

  it(`renders empty site Metadata`, () => {
    const location = {
      pathname: "/",
    } as Location;

    render(<LocaleList location={location} />);

    const ele = screen.getByText("한글");
    expect(ele).toBeInTheDocument();
  });

  /**
   * TODO: test select event
  jest.mock(
    "react-select",
    () =>
      ({
        options,
        value,
        onChange,
      }: {
        options: any[];
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
      }) => {
        function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
          const option = options.find((option) => option.value === event.currentTarget.value);
          onChange(option);
        }
        return (
          <select data-testid="select" value={value} onChange={handleChange}>
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        );
      }
  );
  */
});
