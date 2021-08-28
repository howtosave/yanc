import * as React from "react"
import { Link } from "gatsby"
import { localizedPath } from "../helpers"
import { LocaleContext } from "../context"
import { useLanguage } from "../hooks/use-language"

export const LocalizedLink = ({ to, language, ...props }) => {
  const locale = React.useContext(LocaleContext)
  const { defaultLang, prefixDefault } = useLanguage()
  const linkLocale = language || locale

  return (
    <Link
      {...props}
      to={localizedPath({
        defaultLang,
        prefixDefault,
        locale: linkLocale,
        path: to,
      })}
    />
  )
}
