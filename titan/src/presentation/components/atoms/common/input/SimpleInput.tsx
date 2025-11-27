interface InputProps {
  type: string;
  defaultValue: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SimpleInput: React.FC<InputProps> = ({
  type,
  defaultValue,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={defaultValue}
      className={`input input-bordered input-xs text-center ${className}`}
    />
  );
};
