// отримати розміри вікна

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export default function useWindowSize(delay = 300): WindowSize {
  const [isFirstResize, setIsFirstResize] = useState(true);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      if (isFirstResize) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setIsFirstResize(false);
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          setIsFirstResize(true);
        }, delay);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay, isFirstResize]);

  return windowSize;
}