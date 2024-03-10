import { RefObject, useEffect } from "react";

interface UseAutoSizeTextarea {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  value: string;
}

export const useAutoSizeTextarea = ({
  textAreaRef,
  value,
}: UseAutoSizeTextarea) => {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
