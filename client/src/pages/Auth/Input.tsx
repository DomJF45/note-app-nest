import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { ...rest } = props;
  return (
    <input className="rounded border-1 border-slate-300" ref={ref} {...rest} />
  );
});
