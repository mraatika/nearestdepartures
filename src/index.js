import { render } from 'inferno';
import App from './app';
import 'whatwg-fetch';
import './index.css';

render(<App />, document.getElementById('app'));
