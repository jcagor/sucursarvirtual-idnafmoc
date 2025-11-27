interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  className?: string;
  children: React.ReactNode;
}

export const NeutralButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
    type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl  px-4 text-[15px] ${
        disabled ? "btn-disabled text-principal-150 bg-principal-320" : className 
      }`}
    >
      {children}
    </button>
  );
};
