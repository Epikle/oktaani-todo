import { typedLanguages, allowedLanguages } from '../utils/languages';

import useSettingsStore from '../context/useSettingsStore';

const useLanguage = () => {
  const darkMode = useSettingsStore((state) => state.darkMode);
  const languageName = useSettingsStore((state) => state.languageName);
  const { setSettings } = useSettingsStore((state) => state.actions);
  let text = typedLanguages[languageName];

  const nextLang = () => {
    const currentLanguageIndex = allowedLanguages.indexOf(languageName);
    const nextIndex = (currentLanguageIndex + 1) % allowedLanguages.length;
    const nextLanguage = allowedLanguages[nextIndex];
    text = typedLanguages[allowedLanguages[nextIndex]];

    setSettings({ languageName: nextLanguage, darkMode });
  };

  return { text, nextLang };
};

export default useLanguage;
