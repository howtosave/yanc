/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withTranslation } from "react-i18next";

import Login from "./Login";

//
// with translation
//
const Target = withTranslation("common")(Login);

export default {
  title: "Component-views/Login",
  component: Target,
} as ComponentMeta<typeof Target>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Target> = (args: any) => <Target {...args} />;

export const Default = Template.bind({});
Default.args = {
  identifier: "id",
  onChangeIdentifier: () => {},
  password: "password",
  onChangePassword: () => {},
  onSubmit: () => {},
  loading: false,
  error: "",
};

export const Loading = Template.bind({});
Loading.args = {
  identifier: "id",
  onChangeIdentifier: () => {},
  password: "password",
  onChangePassword: () => {},
  onSubmit: () => {},
  loading: true,
  error: "",
};

export const Error = Template.bind({});
Error.args = {
  identifier: "id",
  onChangeIdentifier: () => {},
  password: "password",
  onChangePassword: () => {},
  onSubmit: () => {},
  loading: false,
  error: "error message",
};
