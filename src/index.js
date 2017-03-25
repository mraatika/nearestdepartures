import { render } from 'inferno';
import App from './App';
import 'whatwg-fetch';
import './index.css';

render(<App />, document.getElementById('app'));
