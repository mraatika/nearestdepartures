import { render } from 'inferno';
import App from './components/app/app';
import './index.css';

// use offline-plugin when in production
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

render(<App />, document.getElementById('app'));
