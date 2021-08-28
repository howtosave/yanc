/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Index from "./index";

export default {
  title: "Page-views/Index",
  component: Index,
} as ComponentMeta<typeof Index>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Index> = (args: any) => <Index {...args} />;

export const IndexDefault = Template.bind({});
IndexDefault.args = {
  location: window.location,
  data: {
    site: {
      siteMetadata: {
        title: "My Page",
      },
    },
  },
  //@ts-ignore
  t: (key: string) => key,
  tReady: true,
};
