import { setLanguage } from '../context/languageSlice';
import { setSettings } from '../context/settingsSlice';
import { Languages } from '../types';
import { languages } from '../utils/languages';
import { useAppDispatch, useAppSelector } from './useRedux';

const useLanguage = () => {
  const { language, darkMode } = useAppSelector((state) => state.settings);
  const text = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  const nextLang = () => {
    const languagesList = Object.keys(languages) as Languages[];
    const currentLanguageIndex = languagesList.indexOf(language);
    const nextIndex = (currentLanguageIndex + 1) % languagesList.length;
    const nextLanguage = languagesList[nextIndex];
    const nextLanguageTexts = languages[languagesList[nextIndex]];

    dispatch(setSettings({ language: nextLanguage, darkMode }));
    dispatch(setLanguage(nextLanguageTexts));
  };

  return { text, nextLang };
};

export default useLanguage;
