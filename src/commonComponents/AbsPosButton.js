export const AbsPosButton = ({ children, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed bottom-0 w-full max-w-[500px]
    flex justify-center items-center bg-blue-800 text-white text-lg py-3 cursor-pointer ${style}`}
    >
      {children}
    </div>
  );
};
