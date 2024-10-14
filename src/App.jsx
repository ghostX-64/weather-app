import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <> <Home /> </>
  },
  {
    path: '/about',
    element: <> <About /> </>
  },
  {
    path: '/services',
    element: <> <Services /> </>
  },
  {
    path: '/contact',
    element: <> <Contact /> </>
  },
]);

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
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
