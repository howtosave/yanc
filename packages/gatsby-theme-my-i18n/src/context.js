import { createContext } from "react"
import { defaultLang } from "../utils/default-options"

const LocaleContext =createContext(defaultLang)

export { LocaleContext }
