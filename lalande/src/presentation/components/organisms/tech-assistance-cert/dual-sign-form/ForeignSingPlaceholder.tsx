interface SignPlaceholderProps {
    message:string
}

export const ForeignSingPlaceholder = (props: SignPlaceholderProps) => {
    const {
        message,
    } = props;
  return (
    <div className="w-full">
      <div className="block h-full items-center mb-4 p-4 bg-principal-150 rounded-md border-2 border-principal-400">
        <div
          className="h-full flex flex-col items-center w-full py-5 border-2 border-dashed rounded-md transition border-principal-320"
        >
          <p className="text-principal-320">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
