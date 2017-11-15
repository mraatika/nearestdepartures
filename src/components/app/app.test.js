import { renderToString } from 'inferno-server';
import App from './app';

jest.mock('../../services/departuresservice', () => () => new Promise(res => res()));
jest.mock('../../services/locationservice', () => () => new Promise(res => res()));

it('renders without crashing', () => {
    renderToString(<App />);
});
