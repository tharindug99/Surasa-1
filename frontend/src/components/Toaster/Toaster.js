import React, { useEffect } from "react";

function SuccessToaster({ message, onClose }) {
  return (
    <div className="bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded-md shadow-md transition-opacity duration-500 flex items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 bg-transparent text-white font-bold py-2 px-2 rounded">
        &times;
      </button>
    </div>
  );
}

function ErrorToaster({ message, onClose }) {
  return (
    <div className="bottom-0 right-0 mb-10 mr-4 bg-red-500 text-white p-4 rounded-md shadow-md transition-opacity duration-500 flex items-center">
      <span>{message}</span>
      <button onClick={onClose} className=" bg-transparent text-white font-bold pl-2 rounded">
        &times;
      </button>
    </div>
  );
}

function Toaster({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-0 right-0 rounded-md shadow-md transition-opacity duration-500 opacity-100 flex items-center z-100">
      {type === "error" ? (
        <ErrorToaster message={message} onClose={onClose} />
      ) : (
        <SuccessToaster message={message} onClose={onClose} />
      )}
    </div>
  );
}

export { SuccessToaster, ErrorToaster };
export default Toaster;