import { useField } from "formik";

interface YesNoQuestionProps {
  name: string;
  title: string;
  value?: boolean | null;
  onChange: (e: { target: { name: string; value: boolean | null } }) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  errors?: React.ReactNode;
}

export function YesNoQuestion({
  name,
  title,
  value = null,
  onChange,
  onBlur,
  errors,
}: YesNoQuestionProps) {
  const handleBlur = () => {
    const syntheticEvent = {
      target: { name },
    } as unknown as React.FocusEvent<HTMLInputElement>;
    onBlur(syntheticEvent);
  };

  return (
    <div className="flex flex-col py-4 border-b border-principal-600">
      <div className="flex items-center justify-between gap-4">
        <label className="text-lg font-medium text-principal-180">
          {title}
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ target: { name, value: true } })}
            onBlur={handleBlur}
            className={`px-4 py-2 rounded-md font-medium border transition ${
              value === true
                ? "bg-principal-700 text-principal-110 border-principal-700"
                : "bg-white text-principal-320 border-principal-320 hover:bg-principal-700"
            }`}
          >
            Sí
          </button>

          <button
            type="button"
            onClick={() => onChange({ target: { name, value: false } })}
            onBlur={handleBlur}
            className={`px-4 py-2 rounded-md font-medium border transition ${
              value === false
                ? "bg-principal-180 text-principal-110 border-principal-180"
                : "bg-white text-principal-320 border-principal-320 hover:bg-principal-180"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {errors && value === null && (
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      )}
    </div>
  );
}
