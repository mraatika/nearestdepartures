import { render } from 'inferno';
import App from './components/app/app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('app'));

registerServiceWorker();
