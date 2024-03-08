import { useEffect } from "react";

interface UseOutsideClickProps {
  targetRefs: React.RefObject<HTMLElement>[];
  callback: () => void;
}

const useOutsideClick = ({ targetRefs, callback }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const anyTrueRefs = targetRefs.some((tr) => tr.current);
      if (
        anyTrueRefs &&
        !targetRefs.some((tr) => tr.current?.contains(e.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, targetRefs]);
};

export default useOutsideClick;
