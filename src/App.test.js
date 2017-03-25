import { render } from 'inferno';
import App from './App';
import fetchDepartures from './services/departuresservice';

jest.mock('./services/departuresservice', () => () => new Promise(res => res()));

it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
});
