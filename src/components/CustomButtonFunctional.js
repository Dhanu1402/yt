import { forwardRef, useImperativeHandle, useState } from 'react';

const CustomButtonFunctional = forwardRef(({ onClick, style }, ref) => {
  const [title, setTitle] = useState('Search');

  useImperativeHandle(ref, () => ({
    setTitle: (newTitle) => setTitle(newTitle),
  }));

  return (
    <button
      className={`py-2 px-4 bg-purple-200 hover:bg-purple-600 transition-colors rounded ${style}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
});

export default CustomButtonFunctional;
