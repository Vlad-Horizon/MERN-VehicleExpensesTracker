// користувач закриває вікно

import { useEffect } from "react";

function useWindowBeforeUnload(callback: () => void) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      callback();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback]);
}

export default useWindowBeforeUnload;