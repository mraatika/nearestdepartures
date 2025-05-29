import 'normalize.css';
import './layout.css';
import './colors.css';
import './fonts.css';
import './globals.css';
import App from '@/components/App';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
