import {useEffect, useState, useCallback} from 'react';

type WindowSize = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const getWindowSize = (): WindowSize => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const onResize = useCallback(() => {
    setWindowSize(getWindowSize());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return windowSize;
};

export default useWindowSize;
