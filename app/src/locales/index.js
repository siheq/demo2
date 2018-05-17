import enUS from './en-US';
import jaJP from './ja-JP';
import zhCN from './zh-CN';

const messages = {
  en: enUS,
  ja: jaJP,
  zh: zhCN,
};

export default VueI18n => {
  return new VueI18n({
    locale: 'en',
    messages,
  });
};
