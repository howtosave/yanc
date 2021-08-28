import { graphql, useStaticQuery } from "gatsby"
import { localizedPath } from "../helpers"

const useLanguage = () => {
  const {
    themeI18N: { defaultLang, prefixDefault, config },
  } = useStaticQuery(graphql`
    query LocalizationConfigQuery {
      themeI18N {
        defaultLang
        prefixDefault
        config {
          code
          hrefLang
          dateFormat
          langDir
          localName
          name
        }
      }
    }
  `)

  return {
    defaultLang,
    prefixDefault,
    config,
    localizedPath,
  }
}

export { useLanguage }
