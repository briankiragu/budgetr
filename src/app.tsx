// Import the SolidJS interfaces...
import type { Component } from 'solid-js';

// Import the SolidJS Router methods...
import { Routes, Route } from '@solidjs/router';

// Import the pages...
import Dashboard from './pages/dashboard';

// Define the app component.
const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Dashboard} />
      </Routes>
    </>
  );
};

// Export the app component.
export default App;
