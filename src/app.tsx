// Import the SolidJS interfaces...
import type { Component } from 'solid-js';

// Import the SolidJS Router methods...
import { Routes, Route } from '@solidjs/router';

// Import the pages...
import Dashboard from '@pages/dashboard';
import Income from '@pages/income';
import Expenses from '@pages/expenses';
import Transactions from '@pages/transactions';

// Import the components...
import TheNavbar from '@components/layout/TheNavbar';
import TheSidebar from '@components/layout/TheSidebar';

// Define the app component.
const App: Component = () => {
  return (
    <>
      {/* Navigation bar */}
      <header class="sticky top-0">
        <TheNavbar />
      </header>

      {/* Content */}
      <section class="h-screen grid grid-cols-6 gap-3">
        {/* Sidebar */}
        <aside class="h-full col-span-1">
          <TheSidebar />
        </aside>

        {/* Main content */}
        <main class="h-full p-6 pl-6 col-span-5">
          <Routes>
            <Route path="/" component={Dashboard} />
            <Route path="/income" component={Income} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/transactions" component={Transactions} />
          </Routes>
        </main>
      </section>
    </>
  );
};

// Export the app component.
export default App;
