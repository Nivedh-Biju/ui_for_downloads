// CloseIcon.js
import React from 'react';

function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.height}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 10.586L8.707 7.293a1 1 0 00-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 001.414 1.414L12 13.414l3.293 3.293a1 1 0 001.414-1.414L13.414 12l3.293-3.293a1 1 0 00-1.414-1.414L12 10.586z"
      />
    </svg>
  );
}

export default CloseIcon;
