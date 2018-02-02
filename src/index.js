import { render } from 'inferno';
import App from './components/app/app';
import './fonts.css';
import './index.css';
import './layout.css';

render(<App />, document.getElementById('app'));

// do not register service worker for cordova builds
if (process.env.INFERNO_APP_RUN_ENV !== 'cordova') {
  const registerServiceWorker = require('./registerServiceWorker').default;
  registerServiceWorker();
}
