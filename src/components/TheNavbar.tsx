// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Import the SolidJS Router methods...
import { A } from '@solidjs/router';

// Define the component.
const TheNavbar: Component = () => {
  return (
    <nav class="px-4 py-4 bg-emerald-500 flex justify-between items-center text-emerald-50 md:pl-12 md:pr-20">
      {/* Branding */}
      <h1 class="text-2xl font-semibold">
        <A href="/">BudgetR</A>
      </h1>

      {/* Links */}
      <div class="hidden text-sm md:flex md:justify-between md:items-center md:gap-10">
        <A
          href="/income"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Income
        </A>
        <A
          href="/expenses"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Expenses
        </A>
        <A
          href="/transactions"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Transactions
        </A>
      </div>
    </nav>
  );
};

// Export the component.
export default TheNavbar;
