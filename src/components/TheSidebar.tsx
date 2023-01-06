// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Import the SolidJS Router methods...
import { A } from '@solidjs/router';

// Define the component.
const TheSidebar: Component = () => {
  return (
    <nav class="w-[65px] h-full fixed py-0 bg-emerald-600 flex flex-col justify-between text-emerald-100 md:w-[300px]">
      {/* Links */}
      <div class="p-2 flex flex-col gap-3 text-sm font-medium md:px-6 md:py-4">
        <A
          href="/income"
          class="transition-colors rounded-md px-6 py-3 flex justify-center items-center hover:bg-emerald-300 hover:text-emerald-900"
        >
          <span class="inline md:hidden">I</span>
          <span class="hidden md:inline">Income</span>
        </A>
        <A
          href="/expenses"
          class="transition-colors rounded-md px-6 py-3 flex justify-center items-center hover:bg-emerald-300 hover:text-emerald-900"
        >
          <span class="inline md:hidden">E</span>
          <span class="hidden md:inline">Expenses</span>
        </A>
        <A
          href="/transactions"
          class="transition-colors rounded-md px-6 py-3 flex justify-center items-center hover:bg-emerald-300 hover:text-emerald-900"
        >
          <span class="inline md:hidden">T</span>
          <span class="hidden md:inline">Transactions</span>
        </A>
      </div>
    </nav>
  );
};

// Export the component.
export default TheSidebar;
