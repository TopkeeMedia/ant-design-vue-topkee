import { createI18n } from 'vue-i18n';
import zhCN from './locale/zh-CN';
import { isZhCN } from './utils/util';

const i18n = createI18n({
  legacy: true,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
  },
});

export default i18n;
