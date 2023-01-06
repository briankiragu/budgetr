// Import the SolidJS interfaces...
import type { Component } from 'solid-js';

// Import the SolidJS Router methods...
import { Routes, Route } from '@solidjs/router';

// Import the pages...
import Dashboard from './pages/dashboard';
import Income from './pages/income';
import Expenses from './pages/expenses';
import Transactions from './pages/transactions';

// Import the components...
import TheNavbar from './components/TheNavbar';

// Define the app component.
const App: Component = () => {
  return (
    <>
      {/* Navigation bar */}
      <header>
        <TheNavbar />
      </header>

      {/* Content */}
      <main class="px-3 py-2">
        <Routes>
          <Route path="/" component={Dashboard} />
          <Route path="/income" component={Income} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/transactions" component={Transactions} />
        </Routes>
      </main>
    </>
  );
};

// Export the app component.
export default App;
