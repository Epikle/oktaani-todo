import type { Languages } from '../types';
import useSettingsStore from '../context/useSettingsStore';
import languages from '../utils/languages';

const useLanguage = () => {
  const { darkMode, languageName, setSettings } = useSettingsStore();
  let text = languages[languageName];

  const nextLang = () => {
    const languagesList = Object.keys(languages) as Languages[];
    const currentLanguageIndex = languagesList.indexOf(languageName);
    const nextIndex = (currentLanguageIndex + 1) % languagesList.length;
    const nextLanguage = languagesList[nextIndex];
    text = languages[languagesList[nextIndex]];

    setSettings({ languageName: nextLanguage, darkMode });
  };

  return { text, nextLang };
};

export default useLanguage;
