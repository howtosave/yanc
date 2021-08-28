import * as React from "react"
import { LocaleContext } from "./context"
import { defaultLang } from "../utils/default-options"
import { SEO } from "./components/seo"

const wrapPageElement = ({ element, props: { location, pageContext } }) => (
  <LocaleContext.Provider value={pageContext.locale || defaultLang}>
    <SEO location={location} pageContext={pageContext} />
    {element}
  </LocaleContext.Provider>
)

export { wrapPageElement }
