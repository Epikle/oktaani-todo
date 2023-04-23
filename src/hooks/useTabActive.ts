import { useCallback, useEffect, useState } from 'react';

const useTabActive = () => {
  const [visibilityState, setVisibilityState] = useState(true);

  const visibilityChangeHandler = useCallback((event: FocusEvent) => {
    setVisibilityState(event.type === 'focus');
  }, []);

  useEffect(() => {
    window.addEventListener('focus', visibilityChangeHandler);
    window.addEventListener('blur', visibilityChangeHandler);
    return () => {
      window.removeEventListener('focus', visibilityChangeHandler);
      window.removeEventListener('blur', visibilityChangeHandler);
    };
  }, [visibilityChangeHandler]);

  return visibilityState;
};

export default useTabActive;
