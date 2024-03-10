import { useEffect } from "react";

/*
 * This component takes in a list of refs, exception refs, and a callback
 * if a user clicks any where outside the ref, not including the exceptions..
 * trigger the callback
 * */

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
  // manage user events
  useEffect(() => {
    // handle the outside click function
    const handleOutsideClick = (e: MouseEvent) => {
      // checks if refs in the targetRefs are valid
      const anyTrueRefs = targetRefs.some((tr) => tr.current);
      // if target refs are valid, check if they contain a node
      if (
        anyTrueRefs &&
        !targetRefs.some((tr) => tr.current?.contains(e.target as Node))
      ) {
        // check for exceptions
        const isException = exceptions.some(
          (exRef) =>
            exRef.current && exRef.current.contains(event?.target as Node)
        );
        // target refs contains a node, and no exceptions, trigger callback
        if (!isException) {
          callback();
        }
      }
    };

    // add the event listener for mousedown
    document.addEventListener("mousedown", handleOutsideClick);

    // clean up and remove event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, targetRefs, exceptions]);
};

export default useOutsideClick;
