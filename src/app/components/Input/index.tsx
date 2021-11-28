import { memo } from "react";
import { FormEvent, FC, ReactElement } from "react";
import "./styles.scss";

type InputType = {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
};

const Input: FC<InputType> = memo(({ onChange }): ReactElement => {
  return <input className="input" onChange={onChange} />;
});

export default Input;
