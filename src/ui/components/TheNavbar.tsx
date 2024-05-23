import type { Component } from "solid-js";

const TheNavbar: Component = () => {
  return (
    <nav class="px-4 py-4 bg-emerald-600 flex justify-between items-center text-emerald-50 md:pl-12 md:pr-20">
      {/* Branding */}
      <h1 class="text-3xl font-black">
        <a href="/">Budgetr</a>
      </h1>

      {/* Links */}
      <div class="hidden text-sm md:flex md:justify-between md:items-center md:gap-10">
        <a
          href="/income"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Income
        </a>
        <a
          href="/expenses"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Expenses
        </a>
        <a
          href="/transactions"
          class="transition-colors rounded px-5 py-2 hover:bg-emerald-200 hover:text-emerald-900"
        >
          Transactions
        </a>
      </div>

      {/* Account */}
      <button class="flex items-center justify-center size-9 rounded-full hover:bg-green-700/40 transition-colors">
        <span class="material-symbols-outlined">account_circle</span>
      </button>
    </nav>
  );
};

export default TheNavbar;
