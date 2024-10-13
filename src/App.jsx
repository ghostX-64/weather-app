import React, { useState } from 'react';
import NavBar from './components/NavBar';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleNavToggle = (isCollapsed) => {
    setIsNavCollapsed(isCollapsed);
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      <NavBar onToggle={handleNavToggle} />
      <main
        className="main-content"
        style={{
          marginLeft: isNavCollapsed ? '50px' : '150px',
          padding: '20px',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
      </main>
    </div>
  );
}

export default App;
