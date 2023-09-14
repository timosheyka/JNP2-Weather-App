import React, { useContext } from "react";
import { ThemeContext } from "../../theme";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header-container">
      <h1 className="header-logo">Weather Application</h1>
      <div className="header-toggle-buttons">
        <button onClick={() => { 
          toggleTheme();
          document.body.style.backgroundColor = 
            `${theme.split('-')[0] === "light" 
              ? 'black' 
              : 'white'}`
          }}>
            {theme}
        </button>
      </div>
    </div>
  );
};

export default Header;
