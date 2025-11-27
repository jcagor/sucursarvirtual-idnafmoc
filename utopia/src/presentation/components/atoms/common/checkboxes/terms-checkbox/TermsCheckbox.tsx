import React from "react";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-principal-500 border-principal-180 rounded focus:ring-principal-500"
      />
      <label htmlFor="terms" className="text-sm text-principal-450">
        Acepto los{" "}
        <a
          href="https://d2igrwgwynhiqc.cloudfront.net/Terminos.pdf"
          target="_blank"
          className="text-principal-500 hover:underline"
        >
          términos y condiciones
        </a>
      </label>
    </div>
  );
};
