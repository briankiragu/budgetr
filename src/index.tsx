// Import the SolidJS library.
import { render } from 'solid-js/web';

// Import the SolidJS Router.
import { Router } from '@solidjs/router';

// Import the App component.
import App from './app';

// Import the CSS.
import './index.css';

// Render the App component into the DOM.
render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
