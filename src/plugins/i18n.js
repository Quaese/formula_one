import Vue from "vue";
import VueI18n from "vue-i18n";
import dictionary from "@/dictionary/index";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "de", // default locale
  fallbackLocale: "en", // fallback
  messages: dictionary // dictionary
});
