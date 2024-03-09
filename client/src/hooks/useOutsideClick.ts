import { useEffect } from "react";

interface UseOutsideClickProps {
  targetRefs: React.RefObject<HTMLElement>[];
  exceptions?: React.RefObject<HTMLElement>[];
  callback: () => void;
}

const useOutsideClick = ({
  targetRefs,
  exceptions = [],
  callback,
}: UseOutsideClickProps) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const anyTrueRefs = targetRefs.some((tr) => tr.current);
      if (
        anyTrueRefs &&
        !targetRefs.some((tr) => tr.current?.contains(e.target as Node))
      ) {
        const isException = exceptions.some(
          (exRef) =>
            exRef.current && exRef.current.contains(event?.target as Node)
        );
        if (!isException) {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, targetRefs, exceptions]);
};

export default useOutsideClick;
