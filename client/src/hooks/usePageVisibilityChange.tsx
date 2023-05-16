// Користувач покинув вінко

import { useEffect } from "react";

function usePageVisibilityChange(callback: (isVisible: boolean) => void) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      callback(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [callback]);
}

export default usePageVisibilityChange;


// template use 

// usePageVisibilityChange((isVisible) => {
//   if (isVisible) {
//     // відновлення дії при поверненні на вкладку з компонентом
//     console.log(1);
//   } else {
//     // зупинка дії при перемиканні на іншу вкладку або програму
//     console.log(2);
//   }
// });