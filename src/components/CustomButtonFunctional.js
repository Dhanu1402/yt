// src/components/CustomButtonFunctional.js
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const CustomButtonFunctional = forwardRef(({ onClick, style }, ref) => {
  const [title, setTitle] = useState('Button');

  useImperativeHandle(ref, () => ({
    setTitle: (newTitle) => setTitle(newTitle),
  }));

  return (
    <button
      className={`py-2 px-4 bg-blue-500 text-white rounded ${style}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
});

export default CustomButtonFunctional;
