import ReactDOM from 'react-dom/client';
import { MealContextProvider } from './store/MealItemContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MealContextProvider>
                    <App />
            </MealContextProvider>
            );
