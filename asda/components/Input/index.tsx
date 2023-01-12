import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { Container, Error } from "./styles";
import { useField } from "@unform/core";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  autocomplete?: "on" | "off";
}

const Input: React.FC<InputProps> = ({
  name,
  autoComplete,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSize, setSize] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, //ref - document.querySelector('input')
      path: "value", //ref - document.querySelector('input').value - ou seja, pega o valor dele
    });
  }, [fieldName, registerField]);

  return (
    <Container isErroed={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        autoComplete={autoComplete}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        //@ts-ignore
        <Error title={error}>
          {" "}
          <FiAlertCircle color="#c53030" size={20} />{" "}
        </Error>
      )}
    </Container>
  );
};

export default Input;
