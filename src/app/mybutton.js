// import React, { useState } from 'react';

// const MyButton = ({ children, onClick, disabled, title }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const baseStyle = {
//     backgroundColor: "white",
//     color: disabled ? '#A1A1A1' : 'black', // Color gris cuando está deshabilitado
//     borderRadius: '10em', // 10em es muy redondeado, ajusta si es necesario
//     fontSize: '14px',
//     fontWeight: '600',
//     padding: '1em 2em',
//     cursor: disabled ? 'not-allowed' : 'pointer', // Cursor 'not-allowed' cuando está deshabilitado
//     transition: 'all 0.3s ease-in-out',
//     border: '1px solid black',
//     boxShadow: '0 0 0 0 black',
//   };

//   const hoverStyle = {
//     transform: 'translateY(-4px) translateX(-2px)',
//     boxShadow: '2px 5px 0 0 black',
//   };


//   const activeStyle = {
//     transform: 'translateY(2px) translateX(1px)',
//     boxShadow: '0 0 0 0 black',
//   };
  

//   let style = { ...baseStyle };
//   if (isHovered) style = { ...style, ...hoverStyle };
//   if (isActive) style = { ...style, ...activeStyle };


//   return (
//     <button
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onMouseDown={() => setIsActive(true)}
//       onMouseUp={() => setIsActive(false)}
//       onClick={onClick} // Asegúrate de asignar la propiedad onClick aquí
//       disabled={disabled}
//       title={title}
//       style={style}
//     >
//       {children}
//     </button>
//   );
// };

// export default MyButton;

import React, { useState } from 'react';
import './MyButton.css'; // Asegúrate de importar el archivo CSS

const MyButton = ({ children, onClick, disabled, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  let buttonClasses = 'custom-button';
  if (disabled) buttonClasses += ' disabled';
  if (isHovered) buttonClasses += ' hovered';
  if (isActive) buttonClasses += ' active';

  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span>{children}</span>
    </button>
  );
};

export default MyButton;
