import React from "react";

import View from "../component-views/Header";

//interface Props extends React.HTMLProps<HTMLDivElement> {
interface Props {
  siteTitle?: string;
}

const Header: React.FC<Props> = ({ siteTitle = "" }) => {
  return <View siteTitle={siteTitle} />;
};

export { Header };
