import React, { useState } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultContext: ThemeContextProps = {
  theme: "default",
  setTheme: () => {},
};

const ThemeContext = React.createContext<ThemeContextProps>(defaultContext);
ThemeContext.displayName = "ThemeContext";

interface Props {
  location: Location;
  pageContext: any;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(defaultContext.theme);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
