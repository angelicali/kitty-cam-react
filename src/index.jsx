import ReactDOM from 'react-dom/client';
import App from './App';

console.log(process.env.NODE_ENV);
console.log(process.env.BACKEND_URL);
console.log(process.env.REACT_APP_BACKEND_URL);
console.log(JSON.stringify(process.env));
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);