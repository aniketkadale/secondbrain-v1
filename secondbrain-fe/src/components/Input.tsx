import { InputProps } from "../interfaces/InputProps";

export const Input = (props: InputProps) => {
  return (
    <div>
      <input
        className="px-4 py-2 border rounded-md m-2"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        ref={props.reference}
      />
    </div>
  );
};
