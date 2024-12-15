import { ButtonProps } from "../interfaces/ButtonProps"
import { ButtonVariants, defaultStyles } from "../styles/ButtonVariants";
import { sizeVariants } from "../styles/SizeVariants";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${ButtonVariants[props.variant]} ${defaultStyles} ${
        sizeVariants[props.size]
      } ${props.fullWidth ? " w-full flex justify-center items-center hover:bg-slate-500" : " "}`}
    >
      {props.startIcon ? <div className="mr-1">{props.startIcon}</div> : null}
      {props.text}
    </button>
  );
};
