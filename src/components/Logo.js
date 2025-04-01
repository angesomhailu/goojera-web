import React from "react";
const Logo = ({ style }) => {
  return (
    <img 
      src="\gologo.svg" 
      alt="Your Brand Logo" 
      className={style}
    />
  );
};

export default Logo;