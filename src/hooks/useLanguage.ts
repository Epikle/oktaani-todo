import { typedLanguages, allowedLanguages } from '../utils/languages';
import useBoundStore from '../context/useBoundStore';

const useLanguage = () => {
  const { darkMode, languageName, setSettings } = useBoundStore((state) => state);
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
