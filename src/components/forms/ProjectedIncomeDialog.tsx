// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Define the component.
const ProjectedIncomeDialog: Component = () => {
  return (
    <>
      {/* Trigger */}
      <button class="transition-all ease-in w-14 h-14 rounded-full bg-indigo-500 text-indigo-50 text-sm md:w-auto md:h-auto md:px-6 md:py-2 md:rounded-md md:text-base hover:shadow-lg">
        New
      </button>
    </>
  );
};

// Export the component.
export default ProjectedIncomeDialog;
