import type { Languages } from '../types';
import { setSettings, setLanguage } from '../context/settingsSlice';
import { languages } from '../utils/languages';
import { useAppDispatch, useAppSelector } from './useRedux';

const useLanguage = () => {
  const {
    darkMode,
    languageName,
    language: text,
  } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const nextLang = () => {
    const languagesList = Object.keys(languages) as Languages[];
    const currentLanguageIndex = languagesList.indexOf(languageName);
    const nextIndex = (currentLanguageIndex + 1) % languagesList.length;
    const nextLanguage = languagesList[nextIndex];
    const nextLanguageTexts = languages[languagesList[nextIndex]];

    dispatch(setSettings({ languageName: nextLanguage, darkMode }));
    dispatch(setLanguage(nextLanguageTexts));
  };

  return { text, nextLang };
};

export default useLanguage;
