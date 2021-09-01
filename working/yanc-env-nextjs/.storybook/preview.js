// add global parameters and decorators.

import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'

import { i18n } from "../site-config";

// root css
import "../styles/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function RouterMock({ children }) {
  const [pathname, setPathname] = useState('/')

  const mockRouter = {
    pathname,
    locale: i18n.defaultLocale,
    locales: i18n.locales,
    prefetch: () => ({
      catch: () => {},
    }),
    push: async newPathname => {
      action('Clicked link')(newPathname)
      setPathname(newPathname)
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

export const decorators = [
  (Story) => (
    <RouterMock>
      <Story />
    </RouterMock>
  )
];
