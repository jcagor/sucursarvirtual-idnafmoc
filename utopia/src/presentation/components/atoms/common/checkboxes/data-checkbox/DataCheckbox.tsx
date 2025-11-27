import React from 'react';

interface DataCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const DataCheckbox: React.FC<DataCheckboxProps> = ({
  checked,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id="data"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-principal-500 border-principal-180 rounded focus:ring-principal-500"
      />
      <label htmlFor="data" className="text-sm text-principal-450">
        Autorizo el{" "}
        <a 
          href="/privacy/ATDP_Fomento Empresarial_V3 2025 politica tto datos personales.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-principal-500 underline"
        >
          tratamiento de mis datos
        </a>
      </label>
    </div>
  );
}; 