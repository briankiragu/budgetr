// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Import SolidJS modules...
import { createSignal } from 'solid-js';

// Import the components...
import ReportCard from '@components/ReportCard';

// Define the dashboard component.
const Dashboard: Component = () => {
  // Create a signal to hold the dashboard's data.
  const [income] = createSignal([]);
  const [expenses] = createSignal([]);
  const [transactions] = createSignal([]);

  // Define the dashboard component's template.
  return (
    <div>
      <h1 class="p-2 text-5xl font-semibold">At a glance</h1>

      <section></section>
    </div>
  );
};

// Export the dashboard component.
export default Dashboard;
