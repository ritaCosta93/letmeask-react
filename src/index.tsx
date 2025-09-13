import ReactDOM from 'react-dom/client';

import './services/firebase';
import './styles/global.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
