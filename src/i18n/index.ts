import { createI18n } from "vue-i18n"
import zh from "./zh-tw"
import en from "./en"
const messages = {
  "zh-tw": {
    feature: zh.feature,
  },
  en: {
    feature: en.feature,
  },
}

// 2. Create i18n instance with options
const i18n = createI18n({
  locale: "zh-tw", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

// 可以用單個變數或陣列
// 變數 EX: Message format syntax
// hello: "{msg} world",
// <p>{{ $t("feature.itemexchange.hello", { msg: "test" }) }}</p>
export default i18n
