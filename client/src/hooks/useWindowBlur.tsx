// Користувач покидає вікно браузеру

import { useEffect } from "react";

function useWindowBlur(callback: () => void) {
  useEffect(() => {
    const handleWindowBlur = () => {
      callback();
    };

    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [callback]);
}

export default useWindowBlur;


// use template

// useWindowBlur(() => {hidnContextMenu();});