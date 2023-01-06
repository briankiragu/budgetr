// Import the Solid library.
import { render } from 'solid-js/web';

// Import the App component.
import App from './app';

// Import the CSS.
import './index.css';

// Render the App component into the DOM.
render(() => <App />, document.getElementById('root') as HTMLElement);
