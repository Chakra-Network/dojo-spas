import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";

interface ExpandingTextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "ref"> {
  value: string;
}

const ExpandingTextarea = forwardRef<
  HTMLTextAreaElement,
  ExpandingTextareaProps
>(function ExpandingTextarea(
  { value, onChange, onBlur, onKeyDown, placeholder, className, id, ...rest },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current!, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
});

export default ExpandingTextarea;
